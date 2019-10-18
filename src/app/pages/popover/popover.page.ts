import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Foto } from 'src/app/services/foto/foto.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  public foto: Foto;

  // tslint:disable: variable-name
  constructor(private _popCtrl: PopoverController) { }

  ngOnInit() {
  }

  public devolverAccion(accion: boolean) {
    this._popCtrl.dismiss({ accion });
  }
}
