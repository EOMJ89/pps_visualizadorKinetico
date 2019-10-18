import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Firebase Auth
import { AngularFireAuthModule } from '@angular/fire/auth';

// Carga
import { CargaPageModule } from './pages/carga/carga.module';
import { FullscreenPageModule } from './pages/fullscreen/fullscreen.module';

// Popover
import { PopoverPageModule } from './pages/popover/popover.module';

// Camera
import { Camera } from '@ionic-native/camera/ngx';

// Device Motion
import { DeviceMotion } from '@ionic-native/device-motion/ngx';

// Screen
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    // Firebase Auth
    AngularFireAuthModule,
    // FireStorage
    AngularFireStorageModule,
    // Carga
    CargaPageModule,
    FullscreenPageModule,
    PopoverPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    DeviceMotion,
    ScreenOrientation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
