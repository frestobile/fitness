import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogBookPageRoutingModule } from './log-book-routing.module';

import { LogBookPage } from './log-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogBookPageRoutingModule
  ],
  declarations: [LogBookPage]
})
export class LogBookPageModule {}
