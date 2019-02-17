import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsOverviewComponent } from './settings-overview/settings-overview.component';
import { RouterModule } from '@angular/router';
import { SettingsModuleRouting as SETTINGS_ROUTES } from './settings.routing';

@NgModule({
  declarations: [SettingsOverviewComponent],
  imports: [CommonModule, RouterModule.forChild(SETTINGS_ROUTES)]
})
export class SettingsModule {}

export function provideSettingsModule() {
  return async function() {
    return await SettingsModule;
  };
}
