import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
  constructor(
    // tslint:disable-next-line: variable-name
    private _authServ: AuthService, private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._authServ.authState.pipe(map((auth) => {
      if (auth === null || auth === undefined) {
        return true;
      } else {
        this._router.navigate(['tabs/home']);
        return false;
      }
    }));
  }
}
