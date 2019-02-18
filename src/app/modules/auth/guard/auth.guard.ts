import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('debug');
    return this.authenticationService.checkTokenValidity().pipe(
      tap(isValid => {
        if (!isValid) {
          console.log(stateSnapshot);
          return this.router.navigate(['auth/login'], {
            queryParams: { returnUrl: stateSnapshot.url }
          });
        }
      }),
      take(1)
    );
  }
}
