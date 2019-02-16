import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, LoadChildrenCallback } from '@angular/router';
import { MainModuleRouting as MAIN_ROUTES } from './routes/main.routing';
import { provideServices } from './service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(MAIN_ROUTES)],
  providers: [...provideServices()]
})
export class MainModule {}

export function provideMainModule(): LoadChildrenCallback {
  return async function() {
    return await MainModule;
  };
}
