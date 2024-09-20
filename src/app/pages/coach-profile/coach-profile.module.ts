import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoachProfilePageRoutingModule } from './coach-profile-routing.module';

import { CoachProfilePage } from './coach-profile.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CoachProfilePageRoutingModule
  ],
  declarations: [CoachProfilePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoachProfilePageModule {}
