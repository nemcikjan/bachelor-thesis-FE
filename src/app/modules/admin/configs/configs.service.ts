import { Observable, zip } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, reduce, tap } from 'rxjs/operators';
import { transformResponse } from 'src/app/config/pipeables';
import { ToastrService } from 'ngx-toastr';
import { ConfigItem } from '../interfaces/configs.interface';

@Injectable()
export class ConfigsService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getConfigsByType(type: string): Observable<ConfigItem[]> {
    const params = new HttpParams().set('type', type);
    return this.httpClient
      .get<any>('config/collection', { params: params })
      .pipe(
        transformResponse(),
        take(1)
      );
  }

  getAllNodes(type: string) {
    const params = new HttpParams().set('type', type);
    return this.httpClient
      .get<any>('nodes/collection', { params: params })
      .pipe(
        transformResponse(),
        take(1)
      );
  }

  getConfigsListData(type: string) {
    return zip(this.getAllNodes(type), this.getConfigsByType(type)).pipe(
      map(([nodes, configs]) => ({ nodes, configs }))
    );
  }

  insertConfig(config) {
    return this.httpClient.post<any>('config/create', config).pipe(
      tap(res =>
        this.toastr.success('Config was successfully created', 'Config created')
      ),
      take(1)
    );
  }

  insertNode(node) {
    return this.httpClient.post<any>('nodes', node).pipe(
      tap(res =>
        this.toastr.success('Node was successfully created', 'Node created')
      ),
      take(1)
    );
  }

  getNodeConfigs(objectId: string) {
    return this.httpClient.get(`config/${objectId}`).pipe(
      transformResponse(),
      take(1)
    );
  }
}
