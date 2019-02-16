import { Injectable } from '@angular/core';
import { GatewayService } from './gateway.service';
import { SocketEvent } from '../interfaces/enum/socket.enum';
import { mergeMap, takeUntil, take, tap } from 'rxjs/operators';
import { of, BehaviorSubject, Subject, Observable } from 'rxjs';

/**
 * Provides operations over gateway socket stream
 */
@Injectable()
export class SocketProviderService {
  /**
   * @param gatewayService GatewayService
   */
  constructor(private gatewayService: GatewayService) {}

  /**
   * Initialize connection on websocket on resolves needed subscriptions
   */
  public initIoConnection(): void {
    this.gatewayService
      .onEvent(SocketEvent.CONNECT)
      .pipe(take(1))
      .subscribe(() => {
        console.log('connected');
        this.gatewayService
          .onMessage('update_data')
          // sending data to store
          .pipe(
            mergeMap(message => of(message)),
            takeUntil(this.isDisconnected())
          )
          .subscribe(console.log);
      });
  }

  public isDisconnected(): Observable<any> {
    return this.gatewayService.onEvent(SocketEvent.DISCONNECT).pipe(
      tap(() => {
        console.log('disconnected');
      }),
      take(1)
    );
  }
}
