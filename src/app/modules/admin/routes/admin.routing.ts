import { AuthGuard } from './../../auth/guard/auth.guard';
import { Routes } from '@angular/router';
import { AdminLandingPageComponent } from '../admin-landing-page/admin-landing-page.component';
import { provideConfigsModule } from '../configs/configs.module';
import { provideSettingsModule } from '../settings/settings.module';

export const AdminModuleRouting: Routes = [
  {
    path: 'configs',
    loadChildren: './configs/configs.module#ConfigsModule',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AdminLandingPageComponent
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
    canActivate: [AuthGuard]
  }
];
