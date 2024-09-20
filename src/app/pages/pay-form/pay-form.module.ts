import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayFormPageRoutingModule } from './pay-form-routing.module';

import { PayFormPage } from './pay-form.page';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayFormPageRoutingModule,
    MaskitoModule
  ],
  declarations: [PayFormPage]
})
export class PayFormPageModule {}
