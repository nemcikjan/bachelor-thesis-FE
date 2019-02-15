import { LoadChildrenCallback } from '@angular/router';
import { AuthModule } from '../auth';
import { MainModule } from '../main';
import { AdminModule } from '../admin/admin.module';

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

export { getAdminModule, getMainModule };
