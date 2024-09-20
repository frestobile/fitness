import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/providers/data.service';
import { Constants } from 'src/models/contants.models';
import { Browser } from '@capacitor/browser';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { App } from '@capacitor/app';
import { AuthService } from 'src/app/providers/auth/auth.service';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user'; 
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @ViewChild('modal') modal: IonModal;
  lang: string;
  terms: string = environment.terms_url;
  policies: string = environment.policies_url;
  is_opened: boolean = false;
  tabs: number[] = [0.5, 0.75];
  init_breakpoint: number = 0.5;
  cost_session: number;
  current_user: User;
  is_pending: boolean;

  constructor(
    private dataServ: DataService,
    private authServ: AuthService,
    private agentServ: AgentService,
    private alertCtrl: AlertController,
    private alertServ: AlertService,
    private route: Router
  ) { }

  ngOnInit() { 
    this.initializeView();
  }

  //Initialize Setting view
  async initializeView(){
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{
      
    }
  }

  //This method open In App Browser to display page
  async openInBrowser(url: string){
    await Browser.open({ url: url, toolbarColor:environment.browser_color });
  }

  goToPage(route: string){
    this.route.navigate([route], {state: {profile: true}});
  }

  //This method is used to log out
  async logOut(){
    const alert = await this.alertCtrl.create({
      header: 'Communifit',
      message: 'Voulez-vous vous déconnecter ?',
      buttons: [
        {
          text: 'NON', 
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'OUI',
          handler: () => {
            this.authServ.logOut();
          }
        }
      ]
    });
  
    await alert.present();
  }
  //This method is used to exit app
  async leaveApp(){

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

  //
  openModal(){
    this.is_opened = true;
  }

  //This method is used to handle modal dismissed
  handleModal(ev: any){
    this.is_opened = false;
  }

  //This method is used to update cost session
  onUpdate(){
    // if(this.current_user.cost_session<=0){
    //   this.alertServ.errorToast("Veuillez fournir un coût de session positif");
    //   return;
    // }

    // this.is_pending = true;
    // const toUpdate = { id: this.current_user.id, cost_session: this.current_user.cost_session };
    // this.agentServ.updateData("partner", this.current_user.id, toUpdate).then((rep)=>{
    //   this.is_pending = false;
    //   this.modal.dismiss();
    //   this.dataServ.setUserInfo(this.current_user);
    //   this.alertServ.presentToast("Vos informations de coût mis à jour");
    // }).catch(err=>{
    //   this.is_pending = false;
    //   this.alertServ.errorToast("Une erreur est survenue, veuillez réessayer ultérieurement");
    // });
  }

}
