import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageriePageRoutingModule } from './messagerie-routing.module';

import { MessageriePage } from './messagerie.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MessageriePageRoutingModule
  ],
  declarations: [MessageriePage]
})
export class MessageriePageModule {}
