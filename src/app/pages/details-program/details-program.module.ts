import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsProgramPageRoutingModule } from './details-program-routing.module';

import { DetailsProgramPage } from './details-program.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsProgramPageRoutingModule
  ],
  declarations: [DetailsProgramPage]
})
export class DetailsProgramPageModule {}
