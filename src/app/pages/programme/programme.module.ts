import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgrammePageRoutingModule } from './programme-routing.module';

import { ProgrammePage } from './programme.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    //FormsModule,
    TranslateModule.forChild(),
    IonicModule,
    ProgrammePageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [ProgrammePage],
  providers: [DatePipe],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProgrammePageModule {}
