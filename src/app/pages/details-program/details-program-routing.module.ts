import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsProgramPage } from './details-program.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsProgramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsProgramPageRoutingModule {}
