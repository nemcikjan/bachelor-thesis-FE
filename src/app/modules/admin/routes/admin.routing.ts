import { AuthGuard } from './../../auth/guard/auth.guard';
import { Routes } from '@angular/router';
import { AdminLandingPageComponent } from '../admin-landing-page/admin-landing-page.component';
import { provideConfigsModule } from '../configs/configs.module';
import { provideSettingsModule } from '../settings/settings.module';

export const AdminModuleRouting: Routes = [
  {
    path: 'configs',
    loadChildren: provideConfigsModule(),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AdminLandingPageComponent
  },
  {
    path: 'settings',
    loadChildren: provideSettingsModule(),
    canActivate: [AuthGuard]
  }
];
