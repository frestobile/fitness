import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessSessionPageRoutingModule } from './success-session-routing.module';

import { SuccessSessionPage } from './success-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessSessionPageRoutingModule
  ],
  declarations: [SuccessSessionPage]
})
export class SuccessSessionPageModule {}
