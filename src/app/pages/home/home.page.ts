import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { ModalController } from '@ionic/angular';
import { CargaPage } from '../carga/carga.page';
import { Foto, FotoService } from 'src/app/services/foto/foto.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  // tslint:disable: variable-name
  constructor(
    private _router: Router,
    private _spinnerServ: SpinnerService,
    private _modalCtrl: ModalController,
    private _fotoService: FotoService,
    private _auth: AuthService) { }

  /* ionViewDidEnter() {
    console.log('Entré a home, deberia desactivar el spinner');
    this._spinnerServ.hideSpinner();
  } */

  public async irACosas(categoria) {
    // console.log('Tendría que ir a', categoria);
    this._modalCtrl.create({ component: CargaPage }).then((modal: HTMLIonModalElement) => {
      modal.present();

      modal.onDidDismiss().then(async (r) => {
        // console.log('Retorno', r);
        if (r.data.paraCargar === true) {
          this._spinnerServ.showSpinner();
          console.log('Voy a cargar');
          let totalSubidas = 0;
          let i = 0;
          const aDate = new Date().getTime();

          for (const f of r.data.fotos) {
            await this._fotoService.subirFoto(f, i, categoria, aDate).then((d: any) => {
              console.log('d en home', d);
              totalSubidas++;
            })
              .catch((err) => {
                console.log('Error en subirFoto de servicioFoto', err);
              });

            i++;
          }
          // console.log('Cargué', totalSubidas);
          // console.log('Deberia cargar', i);
          this._spinnerServ.mostrarToast(`${totalSubidas} imagen/es cargada/s.`, 5, 'success', 'bottom');
          this._spinnerServ.hideSpinner();
          this._router.navigate([`/tabs/${categoria}`]);
        }
      });
    });
  }
}
