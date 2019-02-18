import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, LoadChildrenCallback } from '@angular/router';
import { AdminModuleRouting as ADMIN_ROUTES } from './routes/admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [AdminLandingPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AdminModule {}

export function provideAdminModule(): LoadChildrenCallback {
  return async function() {
    return await AdminModule;
  };
}
