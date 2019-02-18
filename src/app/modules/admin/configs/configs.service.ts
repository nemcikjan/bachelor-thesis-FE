import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { transformResponse } from 'src/app/config/pipeables';

@Injectable()
export class ConfigsService {
  constructor(private httpClient: HttpClient) {}

  getConfigsByType(type: string): Observable<any> {
    const params = new HttpParams().set('type', type);
    return this.httpClient
      .get<any>('config/collection', { params: params })
      .pipe(transformResponse());
  }
}
