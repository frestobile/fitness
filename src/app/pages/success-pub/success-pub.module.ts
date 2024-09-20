import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessPubPageRoutingModule } from './success-pub-routing.module';

import { SuccessPubPage } from './success-pub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessPubPageRoutingModule
  ],
  declarations: [SuccessPubPage]
})
export class SuccessPubPageModule {}
