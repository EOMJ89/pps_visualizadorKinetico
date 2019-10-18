import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FotoService } from 'src/app/services/foto/foto.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MotionService } from 'src/app/services/motion/motion.service';
import { DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { IonSlides } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-propias',
  templateUrl: './propias.page.html',
  styleUrls: ['./propias.page.scss'],
})
export class PropiasPage implements OnInit, OnDestroy {
  @ViewChild('slideAux', null) slideAux: IonSlides;
  // tslint:disable: variable-name
  private _analizarMovimiento: Subscription = null;
  private _puedeMover: boolean;

  constructor(
    private _auth: AuthService,
    private _fotoServ: FotoService,
    private _motionServ: MotionService,
  ) { }

  ngOnInit() {
    this._puedeMover = true;

    this._analizarMovimiento = this._motionServ.inizializar().subscribe((acceleration: DeviceMotionAccelerationData) => {
      if (this._puedeMover) {
        if (acceleration.x > 8.0) {
          this._puedeMover = false;
          this.slideAux.slidePrev();
          setTimeout(() => {
            this._puedeMover = true;
          }, 1000);
        } else if (acceleration.x < -8.0) {
          this._puedeMover = false;
          this.slideAux.slideNext();
          setTimeout(() => {
            this._puedeMover = true;
          }, 1000);
        } else if (acceleration.x > -3.0 && acceleration.x < 3.0 && acceleration.y > 8.5) {
          this._motionServ.irHome();
        }
      }
    });
  }

  ngOnDestroy() {
    this._analizarMovimiento.unsubscribe();
  }
}
