import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportHealthDataPageRoutingModule } from './import-health-data-routing.module';

import { ImportHealthDataPage } from './import-health-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportHealthDataPageRoutingModule
  ],
  declarations: [ImportHealthDataPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImportHealthDataPageModule {}
