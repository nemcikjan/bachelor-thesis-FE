import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth.state';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthModuleRouting as AUTH_ROUTES } from './routes/auth.routing';
import { MaterialModule } from '../modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    CommonModule,

    RouterModule.forChild(AUTH_ROUTES),
    NgxsModule.forFeature([AuthState])
  ],
  declarations: [LoginComponent],
  providers: []
})
export class AuthModule {}
