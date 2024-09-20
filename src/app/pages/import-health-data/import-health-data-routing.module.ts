import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportHealthDataPage } from './import-health-data.page';

const routes: Routes = [
  {
    path: '',
    component: ImportHealthDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportHealthDataPageRoutingModule {}
