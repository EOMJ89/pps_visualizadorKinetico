import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { map } from 'rxjs/operators';
import { ModalController, PopoverController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { SpinnerService } from '../spinner/spinner.service';
import { FullscreenPage } from 'src/app/pages/fullscreen/fullscreen.page';
import { Subscription } from 'rxjs';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { PopoverPage } from 'src/app/pages/popover/popover.page';

export class Foto {
  id: string;
  usuario: string;
  tipo: string;
  link: string;
  fecha: number;
  votos: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  // tslint:disable: variable-name
  private _sub: Subscription;

  constructor(
    private _fireServ: FirebaseService,
    private _auth: AuthService,
    private _modalCtrl: ModalController,
    private _spinnerServ: SpinnerService,
    private _popCtrl: PopoverController
  ) { }

  private _esperando = true;
  public get esperando(): boolean {
    return this._esperando;
  }

  private _lindas: Array<Foto> = new Array<Foto>();
  public get lindas(): Array<Foto> {
    this.revisar();
    return this._lindas;
  }

  private _feas: Array<Foto> = new Array<Foto>();
  public get feas(): Array<Foto> {
    this.revisar();
    return this._feas;
  }

  private _propias: Array<Foto> = new Array<Foto>();
  public get propias(): Array<Foto> {
    this.revisar();
    return this._propias;
  }

  private revisar() {
    if (this._sub === undefined) {
      this.inicializarFotos();
    }
  }

  public destroySub() {
    if (this._sub) {
      this._propias = new Array<Foto>();
      this._sub.unsubscribe();
      this._sub = undefined;
      this._esperando = true;
    }
  }

  public inicializarFotos() {
    this._esperando = true;
    this._sub = this.traerFotos().subscribe((data: Array<Foto>) => {
      this._lindas = data.filter((f: Foto) => {
        return f.tipo === 'lindas';
      });
      this._feas = data.filter((f: Foto) => {
        return f.tipo === 'feas';
      });
      this._propias = data.filter((f: Foto) => {
        // console.log(f.usuario, this._auth.username);
        return f.usuario === this._auth.username;
      });
      this._esperando = false;

      /* console.log('Fotos en servicio Foto');
      console.log('Lindas', this._lindas);
      console.log('Feas', this._feas);
      console.log('Propias', this._propias); */
    });
  }

  public traerFotos() {
    return this._fireServ.traertodos('relVisual').snapshotChanges().pipe(map((f) => {
      const auxChat = f.map((a) => {
        const data = a.payload.doc.data() as Foto;
        data.id = a.payload.doc.id;
        return data;
      });
      return auxChat.sort(this.ordenarFechas);
    }));
  }

  public ordenarFechas(a: Foto, b: Foto) {
    let auxReturn: number;
    if (a.fecha < b.fecha) {
      auxReturn = 1;
    } else if (a.fecha > b.fecha) {
      auxReturn = -1;
    } else {
      auxReturn = 0;
    }

    return auxReturn;
  }

  private verificarVoto(votos: Array<string>) {
    let auxReturn = false;
    for (const correo of votos) {
      if (correo === this._auth.username) {
        auxReturn = true;
        break;
      }
    }

    return auxReturn;
  }

  private toData(foto): any {
    return {
      usuario: foto.usuario,
      link: foto.link,
      tipo: foto.tipo,
      fecha: foto.fecha,
      votos: foto.votos,
    };
  }

  public votar(foto: Foto) {
    // console.log('Voto en la foto', foto.id);

    if (!this.verificarVoto(foto.votos)) {
      // console.log('Modifico el registro');
      foto.votos.push(this._auth.username);

      this._fireServ.actualizar('relVisual', foto.id, this.toData(foto))
        .then(() => {
          this._spinnerServ.mostrarToast('Voto añadido.', 3, 'success', 'bottom');
          // console.log('Documento Actualizado');
        }).catch((err) => {
          console.log('Error en firebase', err);
          this._spinnerServ.mostrarToast('Error de Red: Intente más tarde.', 3, 'danger', 'bottom');
        });
    } else {
      // console.log('Ya ha votado');
      this._spinnerServ.mostrarToast('Ya ha votado.', 3, 'warning', 'bottom');
    }
  }

  public async ver(foto: Foto, mostrarUsuario: boolean) {
    // console.log('Veo la foto', foto.id);

    await this._modalCtrl.create({
      component: FullscreenPage,
      componentProps: { foto, mostrarUsuario }
    })
      .then((modal: HTMLIonModalElement) => {
        modal.present();
      });

  }

  private dividirAll(picture: string): string {
    return picture.split(',', 2)[1];
  }

  private crearData(link: string, fecha: number, tipo: string) {
    return {
      fecha,
      link,
      tipo,
      usuario: this._auth.username,
      votos: new Array<string>(),
    };
  }

  public subirFoto(pictureAll: string, index: number, categoria: string, date: number) {
    const pictureAux = this.dividirAll(pictureAll);
    const picName = `relVisual/${((this._auth.username).split('@')[0])}_${date}_${index}.jpeg`;
    // console.log('Imagen', picName);

    return this._fireServ.subirArchivo(picName, pictureAux)
      .then(async (data: UploadTaskSnapshot) => {
        // console.log('Data en subirFoto, servicio Foto', data);
        const link = await data.ref.getDownloadURL();
        const registro: any = this.crearData(link, date, categoria);
        return this._fireServ.agregar('relVisual', registro)
          .catch(err => {
            console.log('error al subir a firebase', err);
          });
      });
  }

  public mostrarPop(foto: Foto) {
    // console.log('Muestro el popover', foto);

    this._popCtrl.create({
      component: PopoverPage,
      componentProps: { foto }
    })
      .then((pop: HTMLIonPopoverElement) => {
        pop.onDidDismiss()
          .then((r: any) => {
            // console.log('Retorno', r);
            if (r.data !== undefined) {
              if (r.data.accion) {
                this.votar(foto);
              }
            }
          });
        pop.present();
      });
  }
}
