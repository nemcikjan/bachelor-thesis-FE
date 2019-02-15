import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io';
import { Observable } from 'rxjs';
import { SocketEvent } from '../interfaces/enum/socket.enum';

/**
 * Communicates directly with websocket
 */
@Injectable()
export class GatewayService {
  private socket: socketIo.Server;

  public initSocket(): void {
    this.socket = socketIo('http://localhost:4000');
  }

  /**
   * Send message vie websocket
   * @param message message to be send
   */
  public send(message: any): void {
    this.socket.emit('client_message', message);
  }

  /**
   * Receives messages from websocket
   */
  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('update_data', (data: any) => observer.next(data));
    });
  }

  /**
   * Subscribes to websocket events
   * @param event SocketEvent
   */
  public onEvent(event: SocketEvent): Observable<any> {
    return new Observable<SocketEvent>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
