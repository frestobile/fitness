import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoricSubPage } from './historic-sub.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricSubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricSubPageRoutingModule {}
