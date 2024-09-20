import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AgentService } from 'src/app/providers/agent.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { DataService } from 'src/app/providers/data.service';
import { UserService } from 'src/app/providers/user.service';
import { environment } from 'src/environments/environment';
import { Constants, DAK } from 'src/models/contants.models';
import { User } from 'src/models/user'; 

@Component({
  selector: 'app-item-profile',
  templateUrl: './item-profile.component.html',
  styleUrls: ['./item-profile.component.scss'],
})
export class ItemProfileComponent  implements OnInit {

  imgLogo: string = "assets/imgs/default-avatar.jpg";

  // @ViewChild(IonModal) modal: IonModal;
  // no_authenticated: boolean = true;
  current_user: User;
  defaultImg: string = "assets/imgs/default-avatar.jpg";
  private txtLang: any;
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

  constructor(
    private authServ: AuthService,
    private router: Router,
    private translate: TranslateService,
    public alertCtrl: AlertController,
    private userServ: UserService,
    private agentServ: AgentService,
    private dataServ: DataService,
    // private odooServ: OdooService
  ) { }

  ngOnInit() {
    
    //Retrieve message lang

    this.levels = DAK.getUserLevels();
    this.translate.get("account_p").subscribe(rep => {
      this.txtLang = rep;
      // this.menus = DAK.getMenuRequestInfos(rep);
    }); 

    // this.odooServ.getSynchroStatus().subscribe(rep=>{
    //   this.is_pending = rep;
    // });

    // this.odooServ.getProgressStatus().subscribe((progress: number)=>{
    //   console.log(progress);
    //   this.progress =  ((this.total - progress)/this.total);
    // });
  }
 
  ionViewDidEnter(){

    this.initializeView();
  }

  //This method is used to authenticate user
  async initializeView(){
    const current_user = await this.dataServ.getUserInfo();
    console.log("user 001");
    console.log(this.current_user);
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    // this.last_update = await this.dataServ.getItem(Constants.LAST_UPDATED_DATE);

    if(current_user){
      this.current_user = current_user;
      console.log("user");
      console.log(this.current_user);
      this.current_level = this.levels.find(elt => elt.id == this.current_user.sporting_level);
      const default_image: string = this.current_user.role == "coach" ? 'assets/imgs/bg_coach.jpg': 'assets/imgs/bg_customer.jpg';
      this.bg_image = current_user.background_image ? Constants.PREFIX_BASE64+current_user.background_image : default_image;
      this.getDataOnline();
      // console.log(this.current_user);
    }

  }

  //This method is used to get data online
  async getDataOnline(){

    try {      
      const rep =  await this.userServ.getUserById(this.current_user.id);
      this.current_user = rep;
      this.dataServ.setUserInfo(rep);

    } catch (error) {
      
    }

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
        header: 'DOMSE',
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
    this.router.navigate([route]);
  }

}
