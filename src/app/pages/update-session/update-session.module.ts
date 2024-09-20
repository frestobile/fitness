import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSessionPageRoutingModule } from './update-session-routing.module';

import { UpdateSessionPage } from './update-session.page';
//import { NgCalendarModule  } from 'ionic7-calendar';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //NgCalendarModule,
    ComponentsModule,
    UpdateSessionPageRoutingModule
  ],
  declarations: [UpdateSessionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UpdateSessionPageModule {}
