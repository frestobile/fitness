import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateSessionPage } from './update-session.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateSessionPageRoutingModule {}
