import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfosPersonnelPageRoutingModule } from './infos-personnel-routing.module';

import { InfosPersonnelPage } from './infos-personnel.page';
import { MaskitoModule } from '@maskito/angular';
//import { ComponentsModule } from 'src/app/components/components.module';
import { IonIntlTelInputModule } from 'ion-intl-tel-v2';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonIntlTelInputModule,
    IonicModule,
    InfosPersonnelPageRoutingModule
  ],
  declarations: [InfosPersonnelPage]
})
export class InfosPersonnelPageModule {}
