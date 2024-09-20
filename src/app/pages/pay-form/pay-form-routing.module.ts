import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayFormPage } from './pay-form.page';

const routes: Routes = [
  {
    path: '',
    component: PayFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayFormPageRoutingModule {}
