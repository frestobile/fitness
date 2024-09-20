import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowProgrammesPage } from './show-programmes.page';

const routes: Routes = [
  {
    path: '',
    component: ShowProgrammesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowProgrammesPageRoutingModule {}
