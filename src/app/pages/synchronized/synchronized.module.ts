import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SynchronizedPageRoutingModule } from './synchronized-routing.module';

import { SynchronizedPage } from './synchronized.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SynchronizedPageRoutingModule
  ],
  declarations: [SynchronizedPage]
})
export class SynchronizedPageModule {}
