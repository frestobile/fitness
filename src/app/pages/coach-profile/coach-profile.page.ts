import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { ChatService } from 'src/app/providers/chat.service';
import { DataService } from 'src/app/providers/data.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UserService } from 'src/app/providers/user.service';
import { Session } from 'src/models/session';
import { Channel } from 'src/models/channel';
import { Constants } from 'src/models/contants.models';
import { Abonne } from 'src/models/followers';
import { MailWizard } from 'src/models/mail-wizard';
// import { Client } from 'src/models/client';
import { TrainingPub } from 'src/models/pub';
import { Single } from 'src/models/single';
import { User } from 'src/models/user';
import { Program } from 'src/models/program';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.page.html',
  styleUrls: ['./coach-profile.page.scss'],
})
export class CoachProfilePage implements OnInit {

  @ViewChild('popover') popover: any;
  bg_image: string = "assets/imgs/banner_coach.png";
  isPop: boolean = false;
  adverts: TrainingPub[] = [];
  sessions: Session[] = [];
  programs: Program[] = [];
  images: any[] = [1,2,3,4];
  videos: any[] = [1,2,3];
  domaines: any[] = ["Bodybuilding","Fitness","Gymnastique","Bodybuilding","Fitness","Gymnastique"];
  current_pub: TrainingPub | any;

  current_user: User;
  coach: User | any;
  is_created: boolean = false;
  current_channel: Channel;
  sport_types: Single[] = [];
  is_pending: boolean = false;
  is_follower: boolean = false;
  followings: number = 0;
  mail_wizard: MailWizard;
  pending_delete: boolean = false;
  params: string | null;
  is_advert: boolean = true;
  is_session: boolean = false;
  is_program: boolean = false;

  constructor(
    private nav: NavController,
    private dataServ: DataService,
    private chatServ: ChatService,
    private agentServ: AgentService,
    private activatedRoute: ActivatedRoute,
    private alertServ: AlertService,
    private alertCtrl: AlertController,
    private userServ: UserService,
    private trainingServ: TrainingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.coach = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.coach);
    this.params = this.activatedRoute.snapshot.paramMap.get("id");

    this.initializeView();
  }

  //This method is used to initialize view
  async initializeView(){
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }

    this.getCoach();
    this.getListOfSports();

    this.getAdverts();
  }

  //This method is used to load adverts
  async getAdverts(){

    this.is_advert = true;
    try {
      const filter = {partner_id: ["=", this.coach.id] };
      const rep = await this.trainingServ.getOnlineLListOfPub(filter);
      console.log(rep);
      this.adverts = rep;
      this.is_advert = false;
    } catch (error) {
      this.is_advert = false;
    }
  }

  //This method is used to get Coach
  async getCoach(){
    try {
      if(this.params==null){

      }else{
        const coach_response = await this.userServ.getCoachDetail(this.params);

        console.log("coach response: ", coach_response);

        this.sessions = [];
        this.coach = new User(coach_response.coach);
        const sessions_data = coach_response.coach_sessions;
        for(let i = 0; i < sessions_data.length; i++)
        {
          const s_data = sessions_data[i];
          const new_session = new Session(s_data);
          this.sessions.push(new_session);
        }
        this.programs = [];
        const programs_data = coach_response.coach_programs;
        for(let j = 0; j < programs_data.length; j++)
        {
          const p_data = programs_data[j];
          const new_program = new Program(p_data);
          this.programs.push(new_program);
        }
      }

      //console.log(this.coach);
      if(this.coach.message_partner_ids.indexOf(this.current_user.id) >-1){
        this.is_follower = true;
      }
      const filter_ = {partner_id: ["=", this.coach.id], res_model: ["=", "res.partner"] };
      this.followings = await this.userServ.countOnlineAbonne(filter_);
      console.log(this.followings);

      const filter = {partner_id: ["=", this.coach.id] };
      const rep = await this.trainingServ.getOnlineSessions(filter);
      console.log(rep);

    } catch (error) {

    }
  }

  //This method is used to get list of sport type
  async getListOfSports(){
    try {
      this.sport_types = await this.trainingServ.getSportslist();
    } catch (error) {

    }
  }

  onShowPop(e: any){
    this.popover.event = e;
    this.isPop = true;
  }

  //This method is used to follow coach
  async followCoach(){
    if(this.is_follower){
      return;
    }

    let objWizard = new MailWizard();
    objWizard.partner_ids.push(this.current_user.id);
    objWizard.res_id = this.coach.id;
    objWizard.res_model = "res.partner";
    objWizard.message = "";

    this.is_pending = true;
    try {
      const rep = await this.agentServ.createData("mail-wizard", objWizard)
      objWizard = new MailWizard(rep);
      //console.log(objWizard);
      const res = await this.agentServ.remoteCallData("mail-wizard", {action: "add_followers", id: objWizard.id});
      //console.log(res);
      this.is_follower = true;
      this.coach.message_partner_ids.push(this.current_user.id);
      this.is_pending = false;
    } catch (error) {
      this.alertServ.errorToast("Veuillez réessayer ultérieurement");
      this.is_pending = false;
    }
  }

  //Go to previous page
  goToPrevious(){
    this.nav.navigateBack("/app/tabs/home");
  }

  //Used to rate coach
  rateCoach(){

  }

  //Open chat according to coach
  async sendMessageRequest(){

    //coach.name = this.coach.name;
    //this.router.navigate(['chat'], {state: coach});
    this.is_created = true;
    const filter_data = {
      coach_id: this.coach.id,
      user_ids: JSON.stringify([this.current_user.id, this.coach.id]),
      is_private: 1,
      channel_type: 'message',
      name: "Private Chat"
    }
    let channel_data = await this.chatServ.getMessageChannel(filter_data);
    console.log("chennel data: ", channel_data);
    if(channel_data && channel_data.user_ids)
    {
      channel_data.user_ids = channel_data.user_ids.split(",");
      const channel_object = new Channel(channel_data);
      this.current_channel = channel_object;
    }
    this.is_created = false;
    this.popover.dismiss();
    console.log("current channel", this.current_channel);
    this.router.navigate(['app/tabs/chat/1'], {state: this.current_channel});
  }

  //This method is handle to remove relationship with the coach
  async removeRelation(){

    const alert = await this.alertCtrl.create({
      header: 'Communifit',
      message: 'Voulez-vous vous désabonner de cet utilisateur ? Vous ne recevrez plus ses actualités',
      buttons: [
        {
          text: 'NON',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'OUI',
          handler: () => {
            this.handleRemovingCoach();
          }
        }
      ]
    });

    await alert.present();
  }

  //This method is used to handle removing coach
  async handleRemovingCoach(){

    this.pending_delete = true;
    try {
      const filter_ = { res_id: ["=", this.coach.id], partner_id: ["=", this.current_user.id], res_model: ["=", "res.partner"] };
      const ids = await this.userServ.searchOnlineData("followers", filter_);
      if(ids.length){
        const ids_to_del = [ids[0].me];
        const rep = await this.agentServ.deleteData("followers", ids_to_del);
        console.log(rep);
        //const toUpdate = { id: ids[0].me, action: "false" };
        //const update = await this.agentServ.remoteCallData("followers", toUpdate);
        this.is_follower = false;
        this.coach.message_partner_ids = this.coach.message_partner_ids.filter((elt: any) => elt!= this.current_user.id);

      }
      this.pending_delete = false;
    } catch (error) {
      this.pending_delete = false;
    }
  }

  //This method is used to go to advert
  goToAdvert(ev: any){

  }

  //This method is used to go to details bootcamp
  showDetailsSession(ev: any){
    const session_id = ev.id;
    this.router.navigate(['app/tabs/details-session/'+session_id]);
  }

  showDatailsProgram(ev: any) {
    // const program = ev;
    const program_id = ev.id;
    this.router.navigate(['app/tabs/details-program/'+program_id]);
  }

  //This method is used to go show photo
  showDetailsImage(ev: any){

  }

  //This method is used to show video
  showDetailsVideo(ev: any){

  }

  //Show More BootCamps
  showBootCamps(){
    this.router.navigate(['my-bootcamps']);
  }

  //This method is used to display more adverts
  moreAdverts(){
    this.router.navigate(['adverts']);
  }

}
