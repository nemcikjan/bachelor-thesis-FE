import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SocketEvent } from '../interfaces/enum/socket.enum';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

/**
 * Communicates directly with websocket
 */
@Injectable()
export class GatewayService {
  constructor(private socket: Socket) {}

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
  public onMessage(messageIdentity: string): Observable<any> {
    return this.socket.fromEvent(messageIdentity).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

  /**
   * Subscribes to websocket events
   * @param event SocketEvent
   */
  public onEvent(event: SocketEvent): Observable<any> {
    return this.socket.fromEvent(event);
  }

  public closeConnection() {
    this.socket.disconnect();
  }
}
