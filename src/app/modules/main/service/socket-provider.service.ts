import { Injectable } from '@angular/core';
import { GatewayService } from './gateway.service';
import { SocketEvent } from '../interfaces/enum/socket.enum';
import { mergeMap, takeUntil, take, tap } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Logout } from '../../auth/store/auth.actions';

/**
 * Provides operations over gateway socket stream
 */
@Injectable()
export class SocketProviderService {
  connectSubscription$: Subscription;
  /**
   * @param gatewayService GatewayService
   */
  constructor(
    private gatewayService: GatewayService,
    private actions: Actions
  ) {
    // waiting for logout to unsubsribe connectSubscription$ and closeConnection
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.connectSubscription$.unsubscribe();
      this.gatewayService.closeConnection();
    });
  }

  /**
   * Initialize connection on websocket on resolves needed subscriptions
   */
  public initIoConnection(): void {
    this.connectSubscription$ = this.gatewayService
      .onEvent(SocketEvent.CONNECT)
      .subscribe(() => {
        console.log('ws connected');
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

  private isDisconnected(): Observable<any> {
    return this.gatewayService.onEvent(SocketEvent.DISCONNECT).pipe(
      tap(() => {
        console.log('ws disconnected');
      }),
      take(1)
    );
  }
}
