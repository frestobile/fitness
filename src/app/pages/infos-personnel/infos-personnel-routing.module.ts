import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfosPersonnelPage } from './infos-personnel.page';

const routes: Routes = [
  {
    path: '',
    component: InfosPersonnelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfosPersonnelPageRoutingModule {}
