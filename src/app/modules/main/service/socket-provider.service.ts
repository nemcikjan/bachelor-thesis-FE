import { Injectable, Inject, Optional, Injector } from '@angular/core';
import { GatewayService } from './gateway.service';
import { SocketEvent } from '../interfaces/enum/socket.enum';
import { mergeMap, takeUntil, take, tap, share } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Logout } from '../../auth/store/auth.actions';
import { ToastrService, ToastInjector } from 'ngx-toastr';

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
    private actions: Actions,
    private injector: Injector
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
    const disconnected = this.isDisconnected().pipe(share());
    this.connectSubscription$ = this.gatewayService
      .onEvent(SocketEvent.CONNECT)
      .subscribe(() => {
        console.log('ws connected');
        this.gatewayService
          .onMessage('update_data')
          // sending data to store
          .pipe(
            mergeMap(message => of(message)),
            takeUntil(disconnected)
          )
          .subscribe(console.log);
        this.gatewayService
          .onMessage('server_error')
          .pipe(
            tap(error =>
              this.injector.get(ToastrService).error(error.message, error.title)
            ),
            takeUntil(disconnected)
          )
          .subscribe();
      });
  }

  private isDisconnected(): Observable<any> {
    return this.gatewayService.onEvent(SocketEvent.DISCONNECT).pipe(
      tap(() => {
        console.log('ws disconnected');
        this.connectSubscription$.unsubscribe();
        this.initIoConnection();
      }),
      take(1)
    );
  }
}
