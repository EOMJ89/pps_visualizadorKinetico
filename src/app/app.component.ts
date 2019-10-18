import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public showSplash = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
  ) { this.initializeApp(); }

  public initializeApp() {
    // console.log('Inicialize App');
    this.platform.ready().then(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      // console.log('Desactivo la Status Bar');
      this.statusBar.styleBlackOpaque();

      setTimeout(() => {
        // console.log('Desactivo la Splash Screen estÃ¡tica');
        this.splashScreen.hide();
      }, 3000);

      setTimeout(() => {
        // console.log('Desactivo la Splash Screen animada');
        this.showSplash = false;
      }, 8000);
    });
  }
}
