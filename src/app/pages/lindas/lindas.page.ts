import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FotoService } from 'src/app/services/foto/foto.service';

@Component({
  selector: 'app-lindas',
  templateUrl: './lindas.page.html',
  styleUrls: ['./lindas.page.scss'],
})
export class LindasPage implements OnInit {

  // tslint:disable: variable-name
  constructor(
    private _auth: AuthService,
    private _fotoServ: FotoService
  ) { }

  ngOnInit() {
  }

}
