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

@Injectable()
export class ResponseTransformInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const matches = request.url.match(/.(svg|png|jpg|jpeg)$/gm);
    if (!(matches && matches.length)) {
      request = request.clone({
        url: 'api/' + request.url
      });
    }
    return next.handle(request);
  }
}
