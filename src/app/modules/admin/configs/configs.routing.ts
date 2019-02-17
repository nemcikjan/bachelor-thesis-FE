import { Routes } from '@angular/router';
import { ConfigsListComponent } from './configs-list/configs-list.component';
import { ConfigDetailComponent } from './config-detail/config-detail.component';

export const ConfigsModuleRouting: Routes = [
  {
    path: '',
    component: ConfigsListComponent,
    children: [
      {
        path: 'detail/:id',
        component: ConfigDetailComponent,
        outlet: 'config-detail'
      }
    ]
  }
];
