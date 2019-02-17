import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard, AuthModuleRouting } from './auth';
import { provideMainModule } from './main/main.module';
import { provideAdminModule } from './admin/admin.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [...AuthModuleRouting]
  },
  {
    path: 'dashboard',
    loadChildren: provideMainModule(),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: provideAdminModule(),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      // debug purposes
      // enableTracing: true,
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
