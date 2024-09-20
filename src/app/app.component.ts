import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { DataService } from './providers/data.service';
import { ConnectionStatus, NetworkService } from './providers/network.service';
import { Constants } from 'src/models/contants.models';
import { LanguageService } from './providers/events/language.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';

import { register } from 'swiper/element/bundle';
import { OfflineManagerService } from './providers/offline-manager.service';
import { takeWhile } from 'rxjs/operators';
import { concat } from 'rxjs';
import { User } from 'src/models/user';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  rtlSide = "left";
  private alive = true;
  user: User;

  constructor(
    private networkService: NetworkService,
    private languageServ: LanguageService,
    private dataService: DataService,
    private platform: Platform,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private offlineManager: OfflineManagerService,
    private nav: NavController
  ) {
    this.languageServ.getLanguage().subscribe((value: any) => {
      console.log(value);
      if(value!==undefined){
        this.globalize(value);
      }
      
     });

     this.networkService.onNetworkChange().subscribe(async (status: ConnectionStatus) => {
      if (status === ConnectionStatus.Online) {
        // const relogin = this.offlineManager.relogin().pipe(takeWhile(() => this.alive))
        const checkEvents = this.offlineManager.checkForEvents()
        .pipe(takeWhile(() => this.alive));
        //relogin.flatMap( () => checkEvents).subscribe();
        concat(checkEvents).subscribe();
        // concat(relogin,checkEvents).subscribe();
      }
    });
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.dataService.createDatabase();

    this.networkService.onNetworkChange().subscribe(async (status: ConnectionStatus) => {
      if (status === ConnectionStatus.Online) {}
    });
    
    this.initializeApp();
  }

    //This method is used to initialize App
    initializeApp() {

      this.languageServ.getLanguage().subscribe(value => {
        // console.log(value);
        if(value!==undefined){
          this.globalize(value);
        }

       });
  
      this.platform.ready().then(async () => {
        if(this.platform.is('capacitor')) {
          await StatusBar.show();
        }
  
        await SplashScreen.hide();
  
        let defaultLang = await this.dataService.getItem(Constants.KEY_DEFAULT_LANGUAGE);
        if(defaultLang==null){
          defaultLang = await Device.getLanguageCode();
          defaultLang = defaultLang.value.slice(0,2);
          this.dataService.setItem(Constants.KEY_DEFAULT_LANGUAGE, defaultLang);
        }
        // console.log(defaultLang);
        this.globalize(defaultLang);
  
        //Retrieve User
        const userInfo = await this.dataService.getUserInfo();
        if(userInfo) {
          this.user = userInfo;
        }  
        this.platform.backButton.subscribeWithPriority(10, () => {
          // this.quitApp();
          // processNextHandler();
        });
  
      });
    }

    //This method is used to exit App
  async quitApp(){
    const alert = await this.alertCtrl.create({
      header: 'Communifit',
      message: 'Voulez-vous quitter l\'application ?',
      buttons: [
        {
          text: 'NON',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'OUI',
          handler: () => {
            App.exitApp();
          }
        }
      ]
    });
  
    await alert.present();
}



//This method is used set lang of the app
globalize(languagePriority: string) {
  // console.log(languagePriority);
  this.translate.setDefaultLang(languagePriority);
  this.translate.use(languagePriority);
  this.setDirectionAccordingly(languagePriority);

  // let defaultLangCode = this.config.availableLanguages[0].code;
  // this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
  // this.translate.setDefaultLang(languagePriority);
  // this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
}

setDirectionAccordingly(lang: string) {
  switch (lang) {
    case 'ar': {
      this.rtlSide = "rtl";
      break;
    }
    default: {
      this.rtlSide = "ltr";
      break;
    }
  }
}
}
