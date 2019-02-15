import { Injectable } from '@angular/core';
import { GatewayService } from './gateway.service';
import { SocketEvent } from '../interfaces/enum/socket.enum';
import { mergeMap, takeUntil, take } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

/**
 * Provides operations over gateway socket stream
 */
@Injectable()
export class SocketProviderService {
  private isConnected$: BehaviorSubject<any>;
  /**
   * @param gatewayService GatewayService
   */
  constructor(private gatewayService: GatewayService) {}

  /**
   * Initialize connection on websocket on resolves needed subscriptions
   */
  public initIoConnection(): void {
    this.gatewayService.initSocket();

    this.gatewayService
      .onEvent(SocketEvent.CONNECT)
      .pipe(take(1))
      .subscribe(() => {
        console.log('connected');
        this.isConnected$ = new BehaviorSubject<any>({});
      });

    this.gatewayService
      .onEvent(SocketEvent.DISCONNECT)
      .pipe(take(1))
      .subscribe(() => {
        console.log('disconnected');
        this.isConnected$.next({});
        this.isConnected$.complete();
      });

    this.gatewayService
      .onMessage()
      // sending data to store
      .pipe(
        mergeMap(message => of(message)),
        takeUntil(this.isConnected$)
      )
      .subscribe();
  }
}
