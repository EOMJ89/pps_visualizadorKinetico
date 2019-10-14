import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { FotoService } from 'src/app/services/foto/foto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formGroup: FormGroup;
  public userList = ['admin', 'invitado', 'usuario', 'anonimo', 'tester'];
  // tslint:disable: variable-name
  private _errorMessage = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _authServ: AuthService,
    private _router: Router,
    private _spinnerServ: SpinnerService,
    private _fotoServ: FotoService,
  ) { }

  //#region Inicializador
  ngOnInit() {
    this.inicializarForm();
  }

  ionViewDidEnter() {
    // console.log('No more sub');
    this._fotoServ.destroySub();
  }

  public inicializarForm() {
    this.formGroup = this._formBuilder.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    /* this.formGroup.valueChanges.subscribe(() => {
      console.log(this.formGroup);
    }); */
  }
  //#endregion

  //#region Log In
  public async iniciarSesion() {
    this._spinnerServ.showSpinner();
    this._errorMessage = this.manejarError({ code: 'auth/reset' });
    // console.log('Todo el form', this.formGroup, 'Value', this.formGroup.value);

    this._authServ.iniciarSesion(this.formGroup.value)
      .then(() => {
        this._router.navigate(['tabs/home']);
        this._spinnerServ.hideSpinner();
        this.formGroup.reset();
      })
      .catch((error: any) => {
        // console.log('Logueo erroneo', error);
        this._errorMessage = this.manejarError(error);
        this.formGroup.reset();
        this._spinnerServ.hideSpinner();
      });
  }

  public limpiarForm() {
    this._errorMessage = this.manejarError({ code: 'auth/reset' });
  }

  private manejarError(error: any) {
    let auxRetorno = '';

    switch (error.code) {
      case 'auth/invalid-email': {
        auxRetorno = 'El email no es valido.';
        break;
      }
      case 'auth/user-disabled': {
        auxRetorno = 'El usuario fue desactivado.';
        break;
      }
      case 'auth/user-not-found': {
        auxRetorno = 'No se encuentra el usuario.';
        break;
      }
      case 'auth/wrong-password': {
        auxRetorno = 'La clave es invalida.';
        break;
      }
      case 'auth/reset': {
        auxRetorno = '';
        break;
      }
      default: {
        auxRetorno = 'Error indeterminado.';
        break;
      }
    }

    return auxRetorno;
  }

  public rellenarCampos(user: string) {
    // console.log(user);
    let clave: string;

    switch (user) {
      case 'admin': {
        clave = '111111';
        break;
      }
      case 'invitado': {
        clave = '222222';
        break;
      }
      case 'usuario': {
        clave = '333333';
        break;
      }
      case 'anonimo': {
        clave = '444444';
        break;
      }
      case 'tester': {
        clave = '555555';
        break;
      }
      default: {
        clave = '';
        break;
      }
    }

    if (clave !== '') {
      this.formGroup.patchValue({ correo: user + '@gmail.com', clave });
      this.formGroup.markAsDirty();
    }
  }
  //#endregion
}
