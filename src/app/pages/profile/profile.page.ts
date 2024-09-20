import { Component, OnInit, ViewChild } from '@angular/core';
import { IonPopover, ModalController, NavController } from '@ionic/angular';
import { CountriesComponent } from 'src/app/components/countries/countries.component';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { NetworkService } from 'src/app/providers/network.service';
import { PluginsService } from 'src/app/providers/plugins.service';
import { UserService } from 'src/app/providers/user.service';
import { Constants } from 'src/models/contants.models';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { Single } from 'src/models/single';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('popover') popover: IonPopover; 
  
  current_user: User;
  partner_mobile: any;
  imgLogo: string = "assets/imgs/default-avatar.jpg";
  is_pending: boolean;
  txt_search: string;
  list_countries: Single[] = [];
  private dumpData: Single[] = [];
  is_country: boolean = false;
  isPopoverOpen: boolean = false;
  selectedCode: any = {
    dialCode: "036",
    flagClass: "au",
    isoCode:"au",
    name:"Australia"
  };

  constructor(
    private dataServ: DataService,
    private pluginsServ: PluginsService,
    private agentServ: AgentService,
    private networkServ: NetworkService,
    private nav: NavController,
    private modalCtrl: ModalController,
    private userServ: UserService,
    private alertServ: AlertService
  ) { }

  ngOnInit() {
    this.initializeView();
    this.handleCountries();
  }

  //This method is used to load all countries
  private async handleCountries(){
    if(this.networkServ.isOnline()){
      try {
        const rep = await this.userServ.getOnlineCounties();
        this.userServ.storeCountriesList(rep);
        this.dumpData = rep;
        this.list_countries = rep;
      } catch (error) {
       this.loadFromLocal(); 
      }

    }else{
      this.loadFromLocal();
    }
  }

  //load from local
  private async loadFromLocal(){
    const rep = await this.userServ.getCountriesList();
    this.dumpData = rep;
    this.list_countries = rep;
  }

  //Initialize view
  async initializeView(){
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }
    console.log("current partner: ", this.current_user);
    this.imgLogo = this.current_user.background_image == "" ? this.imgLogo: Constants.PREFIX_BASE64+this.current_user.background_image;
  }

  //This method is used to take Photo
  async updatePhoto(){
    try {
      
      const rep : any = await this.pluginsServ.takePicture();
      this.imgLogo = Constants.PREFIX_BASE64+rep.base64String;
      this.current_user["background_image"] = rep.base64String;
      const toUpdate : any = {profile_image: this.current_user.background_image };
      this.userServ.uploadProfileImage(toUpdate);

    } catch (error) {
      this.alertServ.errorToast("Un problème est survenu, vérifier votre caméra");
    }
  }

  //This method is used to update user information
  onUpdate(){
    // this.current_user.mobile = this.partner_mobile.e164Number;
    let user_profile = {
      address: this.current_user.city,
    }
    let userData = {
      email: this.current_user.email,
      phone_number: this.current_user.phone_number,
      first_name: this.current_user.first_name,
      last_name: this.current_user.last_name,
      job: this.current_user.job,
      user_profile: user_profile
    }

    console.log("to update", userData);
    this.isPopoverOpen = true;
    this.updateProfile(userData); 
  }

  handleClosePop(ev : any){
    this.isPopoverOpen = false;
  }

  // This method is 
  goToHome(){
    this.popover.dismiss();
    this.nav.navigateRoot(["app"])
  }

  /**
   * This method is used to update data user
   */
  private updateProfile(toUpdate: any){
    this.is_pending = true;
    this.userServ.updateUser(toUpdate).then((rep)=>{
      this.is_pending = false;
      this.dataServ.setUserInfo(this.current_user);
    }).catch(err=>{
      this.is_pending = false;
    });
  }

  //This method is used to show countries list
  showPays(){
    this.is_country = true;
  }

    //This method is used to switch another country guide
    onSwitchCountry(){
      this.is_country = true;
    }
  
    /* onClose(){
      this.modalCountry.dismiss();
    }
  
    //This method is used select country
    selectCountry(obj: Single){
      
      this.current_user.country_id.id = obj.id;
      this.current_user.country_id.name = obj.name;
      this.modalCountry.dismiss();
    } */
  
    //This method is used to handle country
    handleCloseCountry(ev: any){
      this.is_country = false;
    }
  
    /**
     * This method is used to search element on the list
     * @param ev any
     * @returns 
     */
    getItems(ev: any) {
  
      let val: string = ev.target.value;
      
      if (val == '' || val == undefined) {
        this.list_countries = this.dumpData;
        return;
      }
  
      if (val != '' && val !== undefined && val.length > 1) {
        
        this.list_countries = this.dumpData.filter((item: any) => {
          let txtNom: string = '';
          txtNom = item.name;
          return txtNom.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
          
      } else if (val == '' || val == undefined) {
        this.list_countries = this.dumpData;
      }
    }

    //This method is used to open countries
    async openCountries(){

      const modal = await this.modalCtrl.create({
        component: CountriesComponent,
      });
      modal.present();
  
      const { data, role } = await modal.onWillDismiss();
      console.log(data);

      if (data !== undefined) {
        this.selectedCode = data;
      }

    }

}
