import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ResponseTransformInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const matches = request.url.match(/.(svg|png|jpg|jpeg)$/gm);
    if (!(matches && matches.length)) {
      request = request.clone({
        url: environment.baseUrl + 'api/' + request.url
      });
    }
    return next.handle(request);
  }
}
