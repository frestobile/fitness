import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySessionDetailPage } from './my-session-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MySessionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySessionDetailPageRoutingModule {}
