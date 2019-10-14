import { Component, OnInit } from '@angular/core';
import { Foto } from 'src/app/services/foto/foto.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.page.html',
  styleUrls: ['./fullscreen.page.scss'],
})
export class FullscreenPage {
  private foto: Foto;
  private mostrarUsuario: boolean;

  // tslint:disable: variable-name
  constructor(private _modalCtrl: ModalController) { }

  public dismiss() {
    this._modalCtrl.dismiss();
  }
}
