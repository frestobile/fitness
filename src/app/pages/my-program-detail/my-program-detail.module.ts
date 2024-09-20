import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProgramDetailPageRoutingModule } from './my-program-detail-routing.module';

import { MyProgramDetailPage } from './my-program-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProgramDetailPageRoutingModule
  ],
  declarations: [MyProgramDetailPage]
})
export class MyProgramDetailPageModule {}
