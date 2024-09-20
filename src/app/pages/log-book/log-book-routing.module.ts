import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogBookPage } from './log-book.page';

const routes: Routes = [
  {
    path: '',
    component: LogBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogBookPageRoutingModule {}
