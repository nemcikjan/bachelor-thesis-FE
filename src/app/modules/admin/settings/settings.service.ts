import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Log } from '../interfaces/logs.interface';
import { transformResponse } from '../../../config/pipeables';
import { Response } from '../../../interfaces';

@Injectable()
export class SettingsService {
  constructor(private httpClient: HttpClient) {}

  getLogs(): Observable<Log[]> {
    return this.httpClient.get<Response<Log>>('logs').pipe(
      transformResponse(),
      take(1)
    );
  }
}
