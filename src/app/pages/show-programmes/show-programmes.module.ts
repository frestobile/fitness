import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowProgrammesPageRoutingModule } from './show-programmes-routing.module';

import { ShowProgrammesPage } from './show-programmes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ShowProgrammesPageRoutingModule
  ],
  declarations: [ShowProgrammesPage]
})
export class ShowProgrammesPageModule {}
