import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { CountriesComponent } from 'src/app/components/countries/countries.component';
//import { MaskitoOptions } from '@maskito/core';
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

import { countries } from 'src/data_countries/data';

@Component({
  selector: 'app-infos-personnel',
  templateUrl: './infos-personnel.page.html',
  styleUrls: ['./infos-personnel.page.scss'],
})
export class InfosPersonnelPage implements OnInit {

  @ViewChild('modalCountry', {static: false}) modalCountry: IonModal;

  current_user: User;
  imgLogo: string = "assets/imgs/default-avatar.jpg";
  is_pending: boolean;
  txt_search: string;
  list_countries: Single[] = [];
  private dumpData: Single[] = [];
  user_phone: any;
  is_country: boolean = false;
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
    private modalCtrl: ModalController,
    private networkServ: NetworkService,
    private userServ: UserService,
    private alertServ: AlertService
  ) { }

  ngOnInit() {
    this.initializeView();
    this.handleCountries();
  }

  //This method is used to load all countries
  private async handleCountries(){
    this.dumpData = [];
    this.list_countries = [];
    for(let i = 0; i < countries.length; i++)
    {
      let country_data = {id: i, name: countries[i].name};
      const countryData = new Single(country_data);
      this.dumpData.push(countryData);
      this.list_countries.push(countryData);
    }
  }
  //Initialize view
  async initializeView(){
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{
      
    }
    console.log("current user: ", this.current_user);
    if(this.current_user.country_id==null || this.current_user.country_id == undefined)
    {
      this.current_user.country_id = new Single();
    }

    if(this.current_user.profile_image == undefined || this.current_user.profile_image == '')
    {

    }else{
      this.imgLogo = this.current_user.profile_image;
    }
    console.log("current user end: ");
  }
  //This method is used to take Photo
  async updatePhoto(){
    try {
      
      const rep : any = await this.pluginsServ.takePicture();
      this.imgLogo = Constants.PREFIX_BASE64+rep.base64String;
      this.current_user.profile_image = rep.base64String;
      const toUpdate : any = {profile_image: this.current_user.profile_image };
      this.userServ.uploadProfileImage(toUpdate);

    } catch (error) {
      this.alertServ.errorToast("Un problème est survenu, vérifier votre caméra");
    }
  }

  //This method is used to update user information
  onUpdate(){
    console.log("current user-108: ", this.current_user);
    const toUpdate: any = {
      email: this.current_user.email,
      phone_number: this.current_user.phone_number,
      first_name: this.current_user.first_name, 
      last_name: this.current_user.last_name,
      user_profile: {
        country_id: this.current_user.country_id.id,
        address: this.current_user.address,
      }
    }; 
    console.log("Updated data: ", toUpdate);
    //console.log(toUpdate.mobile);
    this.updateProfile(toUpdate);
  }

  /**
   * This method is used to update data user
   */

  private updateProfile(toUpdate: any){
    this.is_pending = true;
    this.userServ.updateUser(toUpdate).then((rep)=>{
      console.log("update user response: ", rep);
      this.is_pending = false;
      this.dataServ.setUserInfo(this.current_user);
      this.alertServ.presentToast("Vos informations ont été mis à jour");
    }).catch(err=>{
      this.is_pending = false;
      this.alertServ.errorToast("Impossible de mettre à jour veuillez réessayer ultérieurement");
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
  
    onClose(){
      this.modalCountry.dismiss();
    }
  
    //This method is used select country
    selectCountry(obj: Single){
      console.log("country object: ", obj);
      this.current_user.country_id.id = obj.id;
      this.current_user.country_id.name = obj.name;
      this.modalCountry.dismiss();
    }
  
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
        console.log("selected code: ", this.selectedCode);
      }

    }

    //This method is used to know handle phone
    handlePhoneChanged(ev: any){
      console.log(ev);
    }

    handleNumberPhone(ev : any){
      console.log(ev);
    }

}
