import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './config/error.interceptor';
import { JwtInterceptor, AuthModule } from './modules/auth';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AppState } from './store/app.state';
import { ResponseTransformInterceptor } from './config/response-transform.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { ToastrModule, ToastrService, Overlay } from 'ngx-toastr';
import { SocketProviderService } from './modules/main/service/socket-provider.service';
import { CustomToastService } from './modules/main/service/toast.service';

const config: SocketIoConfig = {
  url:
    (environment.production && environment.baseUrl) || 'http://localhost:4000',
  options: {}
};

const ngxsModules: ModuleWithProviders[] = [
  NgxsModule.forRoot([AppState], { developmentMode: !environment.production }),
  NgxsFormPluginModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsStoragePluginModule.forRoot({
    key: ['auth.token', 'auth.user']
  })
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot(),

    ...ngxsModules
  ],
  providers: [
    SocketProviderService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseTransformInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: (sp: SocketProviderService) => () => sp.initIoConnection(),
      deps: [SocketProviderService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
