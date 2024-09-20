import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { ChatService } from 'src/app/providers/chat.service';
import { DataService } from 'src/app/providers/data.service';
//import { TrainingService } from 'src/app/providers/training.service';
import { UserService } from 'src/app/providers/user.service';
import { Channel } from 'src/models/channel';
import { Constants, DAK } from 'src/models/contants.models';
// import { Employe } from 'src/models/employe';
// import { Client } from 'src/models/client';
import { TrainingPub } from 'src/models/pub';
import { User } from 'src/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  @ViewChild("bleu") modalBleu: IonModal;
  @ViewChild('modalChannel', {static: true}) modalChannel: IonModal;

  slideOptions: any = {   
		// spaceBetween: 8,
		slidesPerView: 3.25,
	};
  current_user: User = new User();
  // menus: { title: string; alias: string; link: string; banner: string; img: string; }[] = [];
  list_types: { id: string; name: string; checked: boolean; }[] = [];
  current_niveau: { id: string; name: string; checked: boolean; } | undefined;
  bg_calorie: string = "assets/imgs/bg_calorie.png";
  coachs: any[] = [1,2,3,4];
  coachs_to_follow: any[] = [1,2,3,4,5];
  challenges: any[] = [1,2,3,4,5,6];
  defaultIconSpeciality: string ="assets/imgs/default-avatar.jpg";
  temp: User;
  home_selected: string = "news";
  is_pending: boolean;
  channels_public: Channel[] = [];
  mychannels: Channel[] = [];
  lang: string;
  obj_message: { text: string; };
  is_blue: boolean = false;
  list_adverts: TrainingPub[] = [];
  is_channel: boolean;
  channel_type: string;
  objChannel: any = {};
  is_created: boolean;
  pub_coachs: User[] = [];
  abonnes: User[] = [];

  constructor(  
    private dataServ: DataService,
    private userServ: UserService,
    private agentServ: AgentService,
    private alertServ: AlertService,
    private chatServ: ChatService,
    //private training: TrainingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.list_types = DAK.getUserLevels();
    this.handleCountries();
    this.obj_message = {text: "Une erreur est survenu vérifier votre connexion Internet puis réesseyer" };
    localStorage.setItem("first_fitness_login", '1');
  }

  ionViewDidEnter(){
    this.initializeView();
  }

  //This method is used to initialize View
  async initializeView(){
    
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }
    this.channels_public = [];
    this.current_niveau = this.list_types.find(elt=> elt.id == this.current_user.sporting_level);
    this.getChannels();
    this.getListOfCoachs();
  }

  //This method is uset to go to the next page
  goToPage(item: any){
    // this.router.navigate(['/app/tabs/home/contraventions']);
    if(item.alias=="contravention")
      this.router.navigate(['/app/tabs/home/categories'], {state: item});
    else if(item.alias=="sinistre")
      this.router.navigate(['/app/tabs/home/sinistres'], {state: item});
    else if(item.alias=="pointages")
      this.router.navigate(['/app/tabs/home/pointages']);
  }

  //This method is used to load all countries
  private async handleCountries(){
    try {
      const rep = await this.userServ.getOnlineCounties();
      console.log("handle coutries: ", rep);
      this.userServ.storeCountriesList(rep);
      
    } catch (error) {
      console.log("handle countries: ", error);
    }
  }

  //This method is used to display coach profile view
  goToCoachProfile(obj: any){
    //this.router.navigate(['/app/tabs/home/coach'], {state: obj});
    this.router.navigate(['app/tabs/coach-profile/'+obj.id], {state: obj});
  }

  //This method is used to handle to follow a coach
  handleCoach(ev: any){
    console.log(ev);
  }

  //This method is used to handle to view coach profile
  showProfileCoach(ev: any){
    //console.log(ev);
    this.router.navigate(['coach-profile'], {state: ev});
  }

  showProfileUser(ev: any){

  }

  handleProfile(ev : any){
    console.log(ev);
  }

  //This method is used to add coach
  addCoach(){

  }

  //This method is used to get coachs
  async getListOfCoachs(){
    try {
      const coaches = await this.userServ.getFollowingCoaches(this.current_user.id);
      this.abonnes = [];
      for(let i = 0; i < coaches.length ; i++) {
        const new_coach = new User(coaches[i]);
        this.abonnes.push(new_coach);
      }
      this.pub_coachs = this.abonnes;
      //this.list_adverts = rep.filter(elt => elt.partner_id.id != this.current_user.id);
    } catch (error) {
      
    }
  }

  //This method is used to channels
  async getChannels(){

    this.is_pending = true;
    try {
      const filter = { user_id: this.current_user.id };
      const channels = await this.chatServ.getMessageChannelList(filter);
      console.log("Channels: ", channels);
      this.channels_public = channels.filter((elt: any) => elt.is_private==0 || (elt.is_private==1 && elt.user_ids.length>3));
      this.mychannels = this.channels_public.sort((a, b)=> new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0,5);
      this.is_pending = false; 
    } catch (error) {
      this.is_pending = false;
    }   
  }

  //This method is used to add a group
  onAddGroup(type: string){
    this.is_channel = true; 
    this.channel_type=type;
  }

  //This method is called when modal channel is closed
  handleChannel(ev: any){
    this.is_channel = false;
  }

  //This method is used to create channel
  registerChannel(){
    if(this.objChannel.name === undefined || this.objChannel.name==""){
      this.alertServ.errorToast("Définissez le nom du groupe que vous souhaitez créer");
      return;
    }

    let obj_channel: Channel = new Channel();
    obj_channel.name = this.objChannel.name;    
    obj_channel.description = this.objChannel.description ? this.objChannel.description: "";
    obj_channel.user_ids.push(this.current_user.id);
    // obj_channel.channel_partner_ids.push(this.loginPartner.partner_id.id);
    obj_channel.is_private = this.channel_type=="private" ? 1 : 0;
    
    this.is_created = true;
    this.agentServ.createData("channel", obj_channel).then(rep=>{
      this.is_created = false;
      // console.log(rep);

      if(this.channel_type=="private")
        this.channels_public.push(new Channel(rep));
      
      this.alertServ.presentToast("Votre groupe a été créé");
      this.modalChannel.dismiss();
      
    }).catch(err=>{
      this.is_created = false;
      this.alertServ.errorToast("Impossible de créer le groupe. Peut être il existe déjà ou réessayer ultérieurement");
    });

  }

  //User can join a group
  joinGroup(item: Channel){
    let tabs = item.user_ids;
    tabs.push(this.current_user.id);

    const toSend = { channel_partner_ids: tabs, id: item.id };

    // console.log(toSend);  
    this.agentServ.updateData("channel", item.id, toSend).then(rep=>{
      this.alertServ.presentToast("Vous avez intégrer le groupe");
    }).catch(err=>{

    });
  }

  //This method is used to go to the next
  goToChat(item: Channel){
    if(item.user_ids.indexOf(this.current_user.id)<=-1){
      return;
    }

    this.router.navigate(['chat'], {state: item});
  }

  //This method is used to close modal
  onClose(){
    this.is_blue = false,
    this.modalBleu.dismiss();
  }

}
