import { LoadChildrenCallback } from '@angular/router';
import { MainModule } from '../../main';
import { AdminModule } from '../../admin/admin.module';
import { ConfigsModule } from '../../admin/configs/configs.module';
import { SettingsModule } from '../../admin/settings/settings.module';

function getAdminModule(): LoadChildrenCallback {
  return async function() {
    return await AdminModule;
  };
}

function getMainModule(): LoadChildrenCallback {
  return async function() {
    return await MainModule;
  };
}

function getConfigsModule() {
  return async function() {
    return await ConfigsModule;
  };
}

function getSettingsModule() {
  return async function() {
    return await SettingsModule;
  };
}

const lazyLoad: { [key: string]: LoadChildrenCallback } = {
  ADMIN_MODULE: getAdminModule(),
  MAIN_MODULE: getMainModule(),
  CONFIGS_MODULE: getConfigsModule(),
  SETTINGS_MODULE: getSettingsModule()
};

/**
 * Returns instane of lazy loaded module
 * @param module LazyLoadedModuleType string
 */
export function provideLazyLoadedModule(module: LazyLoadedModuleType) {
  return lazyLoad[module];
}

export type LazyLoadedModuleType =
  | 'ADMIN_MODULE'
  | 'MAIN_MODULE'
  | 'SETTINGS_MODULE'
  | 'CONFIGS_MODULE';

export enum ModuleEnum {
  ADMIN_MODULE = 'ADMIN_MODULE',
  MAIN_MODULE = 'MAIN_MODULE',
  SETTINGS_MODULE = 'SETTINGS_MODULE',
  CONFIGS_MODULE = 'CONFIGS_MODULE'
}
