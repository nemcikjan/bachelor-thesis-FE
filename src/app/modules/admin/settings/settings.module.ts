import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsOverviewComponent } from './settings-overview/settings-overview.component';
import { RouterModule, LoadChildrenCallback } from '@angular/router';
import { SettingsModuleRouting as SETTINGS_ROUTES } from './settings.routing';
import { MaterialModule } from '../../material.module';
import { SettingsService } from './settings.service';

@NgModule({
  declarations: [SettingsOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SETTINGS_ROUTES),
    MaterialModule
  ],
  providers: [SettingsService]
})
export class SettingsModule {}

export function provideSettingsModule(): LoadChildrenCallback {
  return async function() {
    return await SettingsModule;
  };
}
