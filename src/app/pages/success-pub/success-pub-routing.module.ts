import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessPubPage } from './success-pub.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessPubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessPubPageRoutingModule {}
