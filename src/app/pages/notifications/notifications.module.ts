import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
//import { IonStarRatingsComponent } from 'ion-star-ratings';
import { BarRatingModule } from 'ngx-bar-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    BarRatingModule
  ],
  declarations: [NotificationsPage],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotoficationsPageModule {}
