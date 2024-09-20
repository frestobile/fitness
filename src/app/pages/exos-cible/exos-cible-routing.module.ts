import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExosCiblePage } from './exos-cible.page';

const routes: Routes = [
  {
    path: '',
    component: ExosCiblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExosCiblePageRoutingModule {}
