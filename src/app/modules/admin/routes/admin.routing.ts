import { Routes } from '@angular/router';
import { AdminLandingPageComponent } from '../admin-landing-page/admin-landing-page.component';
import { provideConfigsModule } from '../configs/configs.module';
import { provideSettingsModule } from '../settings/settings.module';

export const AdminModuleRouting: Routes = [
  {
    path: 'configs',
    loadChildren: provideConfigsModule()
  },
  {
    path: '',
    component: AdminLandingPageComponent
  },
  {
    path: 'settings',
    loadChildren: provideSettingsModule()
  }
];
