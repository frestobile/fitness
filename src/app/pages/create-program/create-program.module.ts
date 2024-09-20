import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateProgramPageRoutingModule } from './create-program-routing.module';

import { CreateProgramPage } from './create-program.page';
//import { NgCalendarModule  } from 'ionic7-calendar';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //NgCalendarModule,
    ComponentsModule,
    CreateProgramPageRoutingModule
  ],
  declarations: [CreateProgramPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateSessionPageModule {}
