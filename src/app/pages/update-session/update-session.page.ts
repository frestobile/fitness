import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { PluginsService } from 'src/app/providers/plugins.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { ApiService } from 'src/app/providers/api.service';
import { Session } from 'src/models/session';
import { Constants, DAK } from 'src/models/contants.models';
import { EmptyMessage } from 'src/models/iuser';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { Exercise } from 'src/models/exercise';
import { ExerciseSchedule } from 'src/models/exercise-schedule';
import { ActivatedRoute } from '@angular/router';
import { SessionSchedule } from 'src/models/session-schedule';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './update-session.page.html',
  styleUrls: ['./update-session.page.scss'],
})
export class UpdateSessionPage implements OnInit {

  @ViewChild('modal') modal: IonModal;

  lang: string;
  current_user: User;
  is_pending: boolean = true;
  errorMessage: EmptyMessage;
  is_opened: boolean = false;
  is_shedule: boolean = false; // open user session schedule modal
  isUploaded: boolean = false;
  session: Session = new Session();
  current_date: string;
  default_image: string = "assets/imgs/bootcamp.png";
  levels: { id: string; name: string; checked: boolean; color: string; decalage: number; }[] = [];
  imgLogo: string;
  isLoading: boolean;
  exercises: Exercise[] = [];
  schedules: ExerciseSchedule[] = [];
  new_schedule: ExerciseSchedule;
  customSportingLevelOptions = {};
  customExerciseOptions = {};
  params: string | null;

  selected_exercise: Exercise;
  reps: number;
  times: number;
  weights: number;
  rests: number;

  clients: User[] = [];

  session_schedules: SessionSchedule[] = [];
  selected_session_schedule: SessionSchedule = new SessionSchedule();

  constructor(
    private training: TrainingService,
    private utils: UtilsService,
    private alertServ: AlertService,
    private nav: NavController,
    private alertCtrl: AlertController,
    private agentServ: AgentService,
    private pluginServ: PluginsService,
    private dataServ: DataService,
    private activatedRoute: ActivatedRoute,
    private userServ: UserService
  ) { }

  ngOnInit() {
    this.errorMessage = {text: "Vous n'avez pas de programme. Touchez le bouton + pour enregistrer un programme", txtButton: "Réessayez" };
    this.params = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("params: ", this.params);
    this.initializeView();
    this.levels = DAK.getUserLevels();
  }

  async initializeView(){
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{

    }
    this.current_date = this.utils.getOnlyDateNow();
    await this.getExercises();
    await this.getSessionDetail();
    await this.getClientList();

  }

  //This method is used to handle price related to sessions
  handlePrice(){
    // this.session.price = this.current_user.cost_session * this.session.num_sessions;
    this.session.price = 200;
  }

  getNameOfLevel(level: string){
    return this.levels.find(elt => elt.id == level);
  }

  async getClientList() {
    this.is_pending = true;
    try {
      const result = await this.userServ.getClientList();
      if(result.length > 0)
      {
        this.clients = [];
        for(let i = 0; i < result.length; i++)
        {
          const new_client = new User(result[i]);
          this.clients.push(new_client);
        }
      }
      console.log("result: ", this.clients);
    } catch (error) {

    }
  }

  async getExercises() {
    this.is_pending = true;
    try {
      const result = await this.training.getExercises();
      this.exercises = result;
    } catch (error) {

    }
    this.is_pending = false;
  }

  async getSessionDetail() {
    const session_data = await this.training.getSessionDetail(this.params);
    console.log("session data: ", session_data);
    const schedule_data: string = session_data.schedules;
    this.schedules = await this.getSchedules(schedule_data);
    const client_schedules = session_data.session_schedules;
    this.session_schedules = this.getSessionSchedules(client_schedules);
    console.log("session schedules: ", this.session_schedules);
    const sessionData = {
      id: session_data.id,
      name: session_data.name,
      coach_id: session_data.coach_id,
      price: session_data.price,
      sporting_level: session_data.sporting_level,
      objective: session_data.objective,
      currency: {id: 1, name: "AUD"},
      description: session_data.description,
      session_image: session_data.session_image,
      start_date: session_data.start_date,
      end_date: session_data.end_date,
      schedules: this.schedules,
      is_active: session_data.is_active,
      is_private: session_data.is_private,
      created_at: session_data.created_at,
      updated_at: session_data.updated_at
    }
    this.session = new Session(sessionData);
    if(this.session.session_image && this.session.session_image != '')
    {
      this.imgLogo = this.session.session_image;
      this.isUploaded = true;
    }
  }

  async getSchedules(data: string): Promise<ExerciseSchedule[]>{
    let schedules: ExerciseSchedule[] | PromiseLike<ExerciseSchedule[]> = [];
    const schedules_data = JSON.parse(data);
    for(let i = 0; i < schedules_data.length; i++)
    {
      const one_data = schedules_data[i];
      const selected_exercise = new Exercise(one_data.exercise);
      const scheduleData = {
        exercise: selected_exercise,
        reps: one_data.reps,
        rest: one_data.rest,
        time: one_data.time
      }
      const new_schedule = new ExerciseSchedule(scheduleData);
      schedules.push(new_schedule);
    }
    return schedules;
  }

  getSessionSchedules(scheduleList: any): SessionSchedule[] {
    let sessionSchedules : SessionSchedule[] = [];
    scheduleList.map((schedule: any)=>{
      const newSessionSchedule = new SessionSchedule(schedule);
      sessionSchedules.push(newSessionSchedule);
    })
    return sessionSchedules;
  }

  //This method is used to display form to submit advert
  openModal(){
    this.is_opened = true;
  }

  openScheduleModal() {
    this.is_shedule = true;
  }

  closeScheduleModal(ev:any)
  {
    this.is_shedule = false;
  }


  //This method is used to handle button when list is empty
  handleRetry(ev: any){

  }

  //This method is handle closing form advertising
  closeModal(ev: any){
    this.is_opened = false;
  }

  //Close modal
  onClose(){
    this.modal.dismiss();
  }

  //This method is used to handle payment
  async handlePayment(){

  }

  //This method is used to create pub
  async updateSession(){
    if(this.session.name=="" || this.session.description==""){
      this.alertServ.errorToast("Veuillez renseigner le nom et la description du programme");
      return;
    }

    if(this.session.price==0){
      this.alertServ.errorToast("Veuillez renseigner le prix du programme");
      return;
    }

    if(this.schedules.length==0){
      this.alertServ.errorToast("Please select exercises");
      return;
    }

    if(this.session.sporting_level==""){
      this.alertServ.errorToast("Veuillez le niveau du programme");
      return;
    }

    if(this.session.price <= 0){
      this.alertServ.errorToast("Please select valid price");
      return;
    }

    this.isLoading = true;
    try {
      // const rep = await this.agentServ.createData("session", this.session);
      // console.log(rep);
      console.log("new session: ", this.session);

      const sessionData = {
        coach_id: this.current_user.id,
        currency: this.session.currency.id,
        description: this.session.description,
        is_active: this.session.is_active,
        is_private: this.session.is_private,
        name: this.session.name,
        objective: this.session.objective,
        price: this.session.price,
        schedules: JSON.stringify(this.schedules),
        session_image: this.session.session_image == this.imgLogo ? null : this.imgLogo,
        sporting_level: this.session.sporting_level,
        session_schedules: JSON.stringify(this.session_schedules)
      }
      console.log("session data: ", sessionData);
      const res = await this.training.updateSession(sessionData, this.session.id);
      this.alertServ.presentToast("Votre programme a été ajouté avec succès");
      this.isLoading = false;
      this.nav.navigateRoot(['/app/tabs/account/my-sessions']);
    } catch (error) {
      console.log(error);
      this.isLoading = false;
      this.alertServ.errorToast("Une erreur est survenue, veuillez réessayer ultérieurement");
    }

  }

  getImage(obj: Session){
    const bg_image = obj.session_image ? Constants.PREFIX_BASE64+obj.session_image : this.default_image;
    return bg_image;
  }

  //This method is used to take Photo
  async updatePhoto(){
    try {
      const rep : any = await this.pluginServ.takePicture();
      this.imgLogo = Constants.PREFIX_BASE64+rep.base64String;
      this.session["session_image"] = rep.base64String;
      this.isUploaded = true;
      //const toUpdate : any = {image_1920: this.current_partner.image_128 };
      //this.updateProfile(toUpdate);
    } catch (error) {
      this.alertServ.errorToast("Un problème est survenu, vérifier votre caméra");
    }
  }

  selectExercise(event: any){
    const selected_id = event.detail.value;
    const selected_ex = this.exercises.find(ex=>ex.id === selected_id);
    const ex_data = {
      bodyparts: selected_ex?.bodyparts,
      equipment: selected_ex?.equipment,
      id: selected_ex?.id,
      image: selected_ex?.image,
      instruction: selected_ex?.instruction,
      sport: selected_ex?.sport,
      tips: selected_ex?.tips,
      title: selected_ex?.title,
      video_type: selected_ex?.video_type,
      video_url: selected_ex?.video_url
    };
    this.selected_exercise = new Exercise(ex_data);
  }

  async chooseExercises() {
    if(this.selected_exercise == undefined || this.selected_exercise == null) {
      this.alertServ.errorToast("Please choose exercise");
      return;
    }

    if(this.reps == undefined || this.reps <= 0)
    {
      this.alertServ.errorToast("Please insert correct reps");
      return;
    }

    if(this.times == undefined || this.times <= 0)
    {
      this.alertServ.errorToast("Please insert correct time");
      return;
    }

    if(this.weights == undefined || this.weights <= 0)
    {
      this.alertServ.errorToast("Please insert correct weight");
      return;
    }

    if(this.rests == undefined || this.rests <= 0)
    {
      this.alertServ.errorToast("Please insert correct rest time");
      return;
    }
    const schedule_data = {
      exercise: this.selected_exercise,
      reps: this.reps,
      time: this.times,
      weight: this.weights,
      rest: this.rests
    }
    let schedule = new ExerciseSchedule(schedule_data);
    this.schedules.push(schedule);
    this.reps = 0;
    this.times = 0;
    this.weights = 0;
    this.rests = 0;
    this.selected_exercise = new Exercise();
  }

  async chooseClient() {
    if(this.selected_session_schedule.client_id == undefined || this.selected_session_schedule.client_id == 0) {
      this.alertServ.errorToast("Please choose client");
      return;
    }

    if(this.selected_session_schedule.play_date == undefined || this.selected_session_schedule.play_date == '')
    {
      this.alertServ.errorToast("Please insert correct date");
      return;
    }

    if(this.selected_session_schedule.start_time == undefined || this.selected_session_schedule.start_time == '')
    {
      this.alertServ.errorToast("Please insert correct time");
      return;
    }

    if(this.selected_session_schedule.end_time == undefined || this.selected_session_schedule.end_time == '')
    {
      this.alertServ.errorToast("Please insert correct time");
      return;
    }

    let schedule = new SessionSchedule(this.selected_session_schedule);
    this.session_schedules.push(schedule);
    this.selected_session_schedule = new SessionSchedule();
  }

  selectClient(event: any) {
    const selected_client_id = event.detail.value;
    this.selected_session_schedule.client_id = selected_client_id;
  }

  getSelectedClientName(client_id: number) {
    let client = null;
    if(this.clients.length > 0) {
      client = this.clients.find(cli=>cli.id == client_id);
    } else {
      client = new User();
    }
    return client?.username;
  }

  //This method is used to toogle
  handleActiveToogle(ev: any){
    console.log(ev);
    this.session.is_active = ev.detail.checked ? 1 : 0;
  }

  handlePrivateToogle(ev: any){
    console.log(ev);
    this.session.is_private = ev.detail.checked ? 1 : 0;
  }

  selectSportingLevel(ev:any) {
    console.log(ev);
    this.session.sporting_level = ev.detail.value;
  }

  gotoForward(){
    this.nav.navigateBack("/app/tabs/account/my-sessions");
  }

  async deleteExerciseSchedule(idx: number){
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
            this.schedules.splice(idx, 1);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteClientSchedule(idx: number){
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
            this.session_schedules.splice(idx, 1);
          }
        }
      ]
    });

    await alert.present();
  }

}
