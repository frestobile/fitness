import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsSessionPage } from './details-session.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsSessionPageRoutingModule {}
