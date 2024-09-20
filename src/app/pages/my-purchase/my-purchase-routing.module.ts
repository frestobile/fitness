import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPurchasePage } from './my-purchase.page';

const routes: Routes = [
  {
    path: '',
    component: MyPurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPurchasePageRoutingModule {}
