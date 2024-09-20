import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsLogbookPage } from './details-logbook.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsLogbookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsLogbookPageRoutingModule {}
