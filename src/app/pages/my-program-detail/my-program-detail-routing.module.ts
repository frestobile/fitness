import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProgramDetailPage } from './my-program-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MyProgramDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProgramDetailPageRoutingModule {}
