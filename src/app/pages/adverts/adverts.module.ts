import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertsPageRoutingModule } from './adverts-routing.module';

import { AdvertsPage } from './adverts.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    AdvertsPageRoutingModule
  ],
  declarations: [AdvertsPage]
})
export class AdvertsPageModule {}
