import { Routes } from '@angular/router';
import {
  provideLazyLoadedModule,
  ModuleEnum
} from 'src/app/shared/config/lazy.functions';
import { AdminLandingPageComponent } from '../admin-landing-page/admin-landing-page.component';

export const AdminModuleRouting: Routes = [
  {
    path: 'configs',
    loadChildren: provideLazyLoadedModule(ModuleEnum.CONFIGS_MODULE)
  },
  {
    path: '',
    component: AdminLandingPageComponent
  },
  {
    path: 'settings',
    loadChildren: provideLazyLoadedModule(ModuleEnum.SETTINGS_MODULE)
  }
];
