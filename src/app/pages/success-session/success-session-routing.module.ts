import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessSessionPage } from './success-session.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessSessionPageRoutingModule {}
