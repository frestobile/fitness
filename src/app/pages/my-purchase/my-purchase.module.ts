import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPurchasePageRoutingModule } from './my-purchase-routing.module';

import { MyPurchasePage } from './my-purchase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPurchasePageRoutingModule
  ],
  declarations: [MyPurchasePage]
})
export class MyPurchasePageModule {}
