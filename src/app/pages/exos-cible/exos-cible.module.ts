import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExosCiblePageRoutingModule } from './exos-cible-routing.module';

import { ExosCiblePage } from './exos-cible.page';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoGalleryModule,
    ExosCiblePageRoutingModule
  ],
  declarations: [ExosCiblePage]
})
export class ExosCiblePageModule {}
