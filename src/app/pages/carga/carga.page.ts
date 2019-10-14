import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera/camera.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.page.html',
  styleUrls: ['./carga.page.scss'],
})
export class CargaPage {
  // tslint:disable: variable-name
  private _fotos = new Array<any>();
  private _esperando = false;

  constructor(
    private _modalCtrl: ModalController,
    private _dom: DomSanitizer,
    private _cameraServ: CameraService
  ) {
  }

  public dismiss(paraCargar: boolean) {
    this._modalCtrl.dismiss({
      paraCargar,
      fotos: this._fotos
    });
  }

  public eliminarFoto(index) {
    this._fotos.splice(index, 1);
  }

  public cargar(gallery: number) {
    this._esperando = true;
    console.log('Cargo de 0(libreria) o 1(camara)', gallery);
    this._cameraServ.takePic(gallery).then(async (value: string | null) => {
      if (value !== null) {
        await this._fotos.unshift(value);
      }
      this._esperando = false;
    });
  }
}
