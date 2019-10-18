import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { timer, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MotionService {
  // tslint:disable: variable-name
  constructor(
    private _deviceMotion: DeviceMotion,
    private _router: Router) { }

  public inizializar() {
    return this._deviceMotion.watchAcceleration({ frequency: 100 } as DeviceMotionAccelerometerOptions);
  }

  public irHome() {
    this._router.navigate(['tabs/home']);
  }
}
