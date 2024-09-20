import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AgentService } from 'src/app/providers/agent.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { DataService } from 'src/app/providers/data.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UserService } from 'src/app/providers/user.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { environment } from 'src/environments/environment';
import { Constants, DAK, Serveur } from 'src/models/contants.models';
import { User } from 'src/models/user';
import { Souscription } from 'src/models/souscription';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
// @ViewChild(IonModal) modal: IonModal;
  // no_authenticated: boolean = true;
  current_user: User = new User();
  defaultImg: string = "assets/imgs/default-avatar.jpg";
  // menus: any[] = [];
  // isModalOpen: boolean;
  lang: any;
  terms: string = "";
  policies: string = "";
  is_pending: boolean;
  last_update: string;
  progress: number = 0;
  total: number = environment.tab_models.length;
  bg_image: string;
  levels: { id: string; name: string; checked: boolean; color: string; decalage: number;}[] = [];
  current_level: any;
  followings: number = 0;
  followers: number = 0;
  subscriber: Souscription;
  days_left: number;
  is_coach: boolean;

  constructor(
    private authServ: AuthService,
    private router: Router,
    private translate: TranslateService,
    public alertCtrl: AlertController,
    private userServ: UserService,
    private training: TrainingService,
    private utils: UtilsService,
    private dataServ: DataService,
    // private odooServ: OdooService
  ) { }

  ngOnInit() {
    //Retrieve message lang
    this.levels = DAK.getUserLevels();
  }

  ionViewDidEnter(){
    this.initializeView();
  }

  //This method is used to authenticate user
  async initializeView(){
    // this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const logged_user = await this.dataServ.getUserInfo();
    if(logged_user) {
      this.current_user = logged_user;
      this.current_level = this.levels.find(elt => elt.id == this.current_user.sporting_level);
      let default_image = "";
      if(this.current_user.role == "coach") {
        default_image = 'assets/imgs/bg_coach.png';
        this.is_coach = true;
      }else if(this.current_user.role = "client") {
        default_image = 'assets/imgs/bg_customer.jpg';
        this.is_coach = false;
      }
      this.bg_image = this.current_user.background_image ? this.current_user.background_image : default_image;

      if(this.current_user.role == "coach")
      {
        this.is_coach = true;
      } else if(this.current_user.role == "client")
      {
        this.is_coach = false;
      }
      this.dataServ.setUserInfo(logged_user);
      this.followings = 6;
    }
    // this.last_update = await this.dataServ.getItem(Constants.LAST_UPDATED_DATE);
  }

  //Go to contact page
  async goToHelp(){
    this.router.navigate(['/help']);
    // await Browser.open({ url: environment.contact_url, toolbarColor:environment.browser_color });
  }


  //This method is used to synchronize data with Server
  handleSynchronization(){
    // this.odooServ.syncListObjets();
  }

  //This method is used to logout User
  async logOut(){
    const alert = await this.alertCtrl.create({
      header: 'Communift',
      message: "Voulez-vous vous déconnecter ?",
      buttons: [
        {
          text:"NON",
          role: 'cancel'
        },
        {
          text: "OUI",
          handler: (elt) =>{
            this.authServ.logOut();
          }
        },
      ]
    });
    await alert.present();
  }

  //This method is used to go historic view
  gotoHistory(){
    this.router.navigate(['app/tabs/account/settings']);
  }

  //This method is used to navigate trough page
  goToPage(route: string){
    this.router.navigate(['app/tabs/account/'+route]);
  }

  //This method is used to subscription
  onSubscription(){
    this.router.navigate(['subscribe']);
  }
}
