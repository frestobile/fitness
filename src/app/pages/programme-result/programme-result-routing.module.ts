import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgrammeResultPage } from './programme-result.page';

const routes: Routes = [
  {
    path: '',
    component: ProgrammeResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgrammeResultPageRoutingModule {}
