import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { NodeData } from '../../../store/app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  getData() {
    return this.httpClient.get<NodeData[]>('data').pipe(take(1));
  }
}
