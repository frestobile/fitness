import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SynchronizedPage } from './synchronized.page';

const routes: Routes = [
  {
    path: '',
    component: SynchronizedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SynchronizedPageRoutingModule {}
