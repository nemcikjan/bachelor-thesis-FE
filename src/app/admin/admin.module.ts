import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { RouterModule } from '@angular/router';
import { AdminModuleRouting as ADMIN_ROUTES } from './routes/admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTES),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {}
