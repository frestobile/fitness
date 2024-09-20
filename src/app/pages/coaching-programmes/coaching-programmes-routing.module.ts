import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoachingProgrammesPage } from './coaching-programmes.page';

const routes: Routes = [
  {
    path: '',
    component: CoachingProgrammesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachingProgrammesPageRoutingModule {}
