import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    // tslint:disable: variable-name
    private _auth: AngularFireAuth,
    private _spinner: SpinnerService,
    private _router: Router,
  ) { }

  public get authState(): Observable<firebase.User> {
    return this._auth.authState;
  }

  public get username(): string {
    return this._auth.auth.currentUser !== null ? this._auth.auth.currentUser.email : null;
  }

  public iniciarSesion(credenciales: { correo: string, clave: string }) {
    return this._auth.auth.signInWithEmailAndPassword(credenciales.correo, credenciales.clave)
      .then((user: firebase.auth.UserCredential) => {
        console.log('Logueo exitoso');
      });
  }

  public cerrarSesion() {
    return this._auth.auth.signOut();
  }

  public desloguear() {
    this._spinner.showSpinner();
    this.cerrarSesion()
      .then(() => {
        this._router.navigate(['login']);
        this._spinner.hideSpinner();
      })
      .catch((error: any) => {
        this._spinner.hideSpinner();
        console.log(error);
      });
  }
}
