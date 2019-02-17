import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigsService } from './configs.service';
import { ConfigDetailComponent } from './config-detail/config-detail.component';
import { ConfigsListComponent } from './configs-list/configs-list.component';
import { RouterModule } from '@angular/router';
import { ConfigsModuleRouting as CONFIGS_ROUTES } from './configs.routing';
@NgModule({
  declarations: [ConfigDetailComponent, ConfigsListComponent],
  imports: [CommonModule, RouterModule.forChild(CONFIGS_ROUTES)],
  providers: [ConfigsService]
})
export class ConfigsModule {}

export function provideConfigsModule() {
  return async function() {
    return await ConfigsModule;
  };
}
