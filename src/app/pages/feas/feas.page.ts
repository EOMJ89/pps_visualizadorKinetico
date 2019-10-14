import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FotoService } from 'src/app/services/foto/foto.service';

@Component({
  selector: 'app-feas',
  templateUrl: './feas.page.html',
  styleUrls: ['./feas.page.scss'],
})
export class FeasPage implements OnInit {

  // tslint:disable: variable-name
  constructor(
    private _auth: AuthService,
    private _fotoServ: FotoService
  ) { }

  ngOnInit() {
  }

}
