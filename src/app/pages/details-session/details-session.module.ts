import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsSessionPageRoutingModule } from './details-session-routing.module';

import { DetailsSessionPage } from './details-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsSessionPageRoutingModule
  ],
  declarations: [DetailsSessionPage]
})
export class DetailsSessionPageModule {}
