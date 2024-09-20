import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsLogbookPageRoutingModule } from './details-logbook-routing.module';

import { DetailsLogbookPage } from './details-logbook.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DetailsLogbookPageRoutingModule
  ],
  declarations: [DetailsLogbookPage]
})
export class DetailsLogbookPageModule {}
