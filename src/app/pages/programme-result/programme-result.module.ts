import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgrammeResultPageRoutingModule } from './programme-result-routing.module';

import { ProgrammeResultPage } from './programme-result.page';
//import { IonStarRatingsComponent } from 'ion-star-ratings';
import { BarRatingModule } from 'ngx-bar-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgrammeResultPageRoutingModule,
    BarRatingModule
  ],
  declarations: [ProgrammeResultPage],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProgrammeResultPageModule {}
