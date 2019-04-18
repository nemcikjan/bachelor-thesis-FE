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
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        const error = err.error.message || err.statusText;
        if (err.status === 401 || err.status === 502) {
          // auto logout if 401 response returned from api
          // this.authenticationService.logout();
          // location.reload(true);
          console.log('iferr', err);

          return throwError(err);
        } else {
          console.log('interceptor', err);

          this.toastr.error(err.message, error);
          return throwError(error);
        }
      })
    );
  }
}
