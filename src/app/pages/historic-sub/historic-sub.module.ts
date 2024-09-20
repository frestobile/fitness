import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoricSubPageRoutingModule } from './historic-sub-routing.module';

import { HistoricSubPage } from './historic-sub.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    HistoricSubPageRoutingModule
  ],
  declarations: [HistoricSubPage]
})
export class HistoricSubPageModule {}
