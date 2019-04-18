import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigsService } from './configs.service';
import { ConfigDetailComponent } from './config-detail/config-detail.component';
import { ConfigsListComponent } from './configs-list/configs-list.component';
import { RouterModule, LoadChildrenCallback } from '@angular/router';
import { ConfigsModuleRouting as CONFIGS_ROUTES } from './configs.routing';
import { ConfigsLandingComponent } from './configs-landing/configs-landing.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConfigDetailComponent,
    ConfigsListComponent,
    ConfigsLandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CONFIGS_ROUTES),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ConfigsService]
})
export class ConfigsModule {}

export function provideConfigsModule(): LoadChildrenCallback {
  return async function() {
    return await ConfigsModule;
  };
}
