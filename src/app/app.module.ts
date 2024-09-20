import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
// import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Drivers } from '@ionic/storage/dist/esm';
import { environment } from 'src/environments/environment';
import { ShortNumberPipe } from './pipes/short-number.pipe';

registerLocaleData(localeFr, 'fr');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, ShortNumberPipe],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    TranslateModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFirestoreModule,
    IonicStorageModule.forRoot({
      name:"fitness_",
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
