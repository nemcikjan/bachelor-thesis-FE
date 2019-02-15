import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MainModuleRouting as MAIN_ROUTES } from './routes/main.routing';
import { GatewayService } from './service/gateway.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(MAIN_ROUTES)],
  providers: [GatewayService]
})
export class MainModule {}
