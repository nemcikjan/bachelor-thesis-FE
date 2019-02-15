import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getMainModule, getAdminModule } from '../config/lazy.functions';
import { AuthGuard } from '../auth';
import { AuthModuleRouting } from '../auth/routes/auth.routing';

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
    loadChildren: getMainModule(),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: getAdminModule(),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      // debug purposes
      enableTracing: true,
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
