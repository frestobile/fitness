import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProgramPageRoutingModule } from './update-program-routing.module';

import { UpdateProgramPage } from './update-program.page';
//import { NgCalendarModule  } from 'ionic7-calendar';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //NgCalendarModule,
    ComponentsModule,
    UpdateProgramPageRoutingModule
  ],
  declarations: [UpdateProgramPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UpdateProgramPageModule {}
