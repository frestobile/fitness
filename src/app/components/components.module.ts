
import { PackComponent } from './pack/pack.component';
import { EmptyListComponent } from './empty-list/empty-list.component';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyViewComponent } from './empty-view/empty-view.component';
import { CoachComponent } from './coach/coach.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { ChatgroupComponent } from './chatgroup/chatgroup.component';
import { ItemProfileComponent } from './item-profile/item-profile.component';
import { ListImagesComponent } from './list-images/list-images.component';
import { ListVideosComponent } from './list-videos/list-videos.component';
import { ListSessionsComponent } from './list-sessions/list-sessions.component';
import { ListProgramsComponent } from './list-programs/list-programs.component'; 
import { ListAdvertComponent } from './list-advert/list-advert.component';
import { PubPostComponent } from './pub-post/pub-post.component';
import { CountriesComponent } from './countries/countries.component';
import { ListScrollComponent } from './list-scroll/list-scroll.component';
import { PubComponent } from './pub/pub.component';
import { OrderComponent } from './order/order.component';


@NgModule({
  declarations: [
    EmptyListComponent, PackComponent, EmptyViewComponent, CoachComponent, ChatgroupComponent, OrderComponent,
    ItemProfileComponent, ListImagesComponent, ListVideosComponent, ListSessionsComponent, ListProgramsComponent,
    ListAdvertComponent, PubPostComponent, CountriesComponent, ListScrollComponent, PubComponent
  ],

  imports: [CommonModule, FormsModule, IonicModule, TranslateModule, BarRatingModule ],
  exports: [
    EmptyListComponent, PackComponent, EmptyViewComponent, CoachComponent, ChatgroupComponent, OrderComponent,
    ItemProfileComponent, ListImagesComponent, ListVideosComponent, ListSessionsComponent, ListProgramsComponent,
    ListAdvertComponent, PubPostComponent, CountriesComponent, ListScrollComponent, PubComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
