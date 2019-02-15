import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io';
import { Observable } from 'rxjs';
import { SocketEvent } from '../interfaces/enum/socket.enum';

@Injectable()
export class GatewayService {
  private socket: socketIo.Server;

  constructor() {}

  public initSocket(): void {
    this.socket = socketIo('http://localhost:4000');
  }

  public send(message: any): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('update_data', (data: any) => observer.next(data));
    });
  }

  public onEvent(event: SocketEvent): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
