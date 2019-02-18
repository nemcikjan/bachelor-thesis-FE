import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, empty, of } from 'rxjs';
import { map, mergeMap, catchError, tap, take } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Login, Logout } from '../store/auth.actions';
import { AuthState } from '../store/auth.state';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public login({ name, password }): Observable<any> {
    return this.httpClient.post<any>(`auth/login`, { name, password }).pipe(
      map(response => response && response.data),
      mergeMap(user =>
        this.store.dispatch(new Login({ user: name, token: user.token }))
      ),
      mergeMap(() => this.route.queryParams),
      map(params => params['returnUrl'] || '/'),
      tap(url => {
        this.router.navigateByUrl(url);
      }),
      take(1)
    );
  }

  public logout() {
    return this.store.dispatch(new Logout()).pipe(
      tap(() => {
        this.router.navigate(['auth/login']);
      })
    );
  }

  /**
   * Checks token validity for Auth Guard
   */
  public checkTokenValidity(): Observable<boolean> {
    return this.store.select(AuthState.token$).pipe(
      mergeMap(token => {
        return this.httpClient.post('auth/check-token', {
          token: token || 'TOKEN'
        });
      }),
      map(response => !!_.keys(response).length),
      catchError((err: any) => (err ? of(false) : of(true)))
    );
  }
}
