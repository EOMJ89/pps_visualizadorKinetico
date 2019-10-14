import { Component, OnInit } from '@angular/core';
import { FotoService, Foto } from 'src/app/services/foto/foto.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-propias',
  templateUrl: './propias.page.html',
  styleUrls: ['./propias.page.scss'],
})
export class PropiasPage implements OnInit {

  // tslint:disable: variable-name
  constructor(
    private _auth: AuthService,
    private _fotoServ: FotoService
  ) { }

  ngOnInit() {
  }

}
