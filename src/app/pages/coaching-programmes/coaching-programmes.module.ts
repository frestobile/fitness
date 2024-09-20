import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoachingProgrammesPageRoutingModule } from './coaching-programmes-routing.module';

import { CoachingProgrammesPage } from './coaching-programmes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CoachingProgrammesPageRoutingModule
  ],
  declarations: [CoachingProgrammesPage]
})
export class CoachingProgrammesPageModule {}
