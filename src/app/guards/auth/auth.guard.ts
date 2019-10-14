import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    // tslint:disable-next-line: variable-name
    private _authServ: AuthService, private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._authServ.authState.pipe(map((auth) => {
      if (auth === null || auth === undefined) {
        this._router.navigate(['login']);
        return false;
      } else {
        return true;
      }
    }));
  }
}
