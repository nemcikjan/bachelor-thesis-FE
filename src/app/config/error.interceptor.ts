import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../modules/auth';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 || 502) {
          // auto logout if 401 response returned from api
          // this.authenticationService.logout();
          // location.reload(true);
          console.log('iferr', err);
          return throwError(err);
        } else {
          const error = err.error.message || err.statusText;
          console.log('interceptor', err);
          return throwError(error);
        }
      })
    );
  }
}
