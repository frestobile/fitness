import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
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
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.page.html',
  styleUrls: ['./create-session.page.scss'],
})
export class CreateSessionPage implements OnInit {

  @ViewChild('modal') modal: IonModal;

  lang: string;
  current_user: User;
  is_pending: boolean = true;
  errorMessage: EmptyMessage;
  is_opened: boolean = false;
  isUploaded: boolean = false;
  new_session: Session = new Session();
  current_date: string;
  default_image: string = "assets/imgs/default.png";
  levels: { id: string; name: string; checked: boolean; color: string; decalage: number; }[] = [];
  imgLogo: string;
  isLoading: boolean;
  exercises: Exercise[] = [];
  num_sessions: number;
  schedules: ExerciseSchedule[] = [];
  new_schedule: ExerciseSchedule;
  customSportingLevelOptions = {};
  customExerciseOptions = {};
  sessoin: Session = new Session();
  selected_exercise: Exercise;
  reps: number;
  times: number;
  weights: number;
  rests: number;
  
  constructor(
    private training: TrainingService,
    private utils: UtilsService,
    private alertServ: AlertService,
    private nav: NavController,
    private agentServ: AgentService,
    private pluginServ: PluginsService,
    private dataServ: DataService,
    private userServ: UserService
  ) { }

  ngOnInit() {
    this.errorMessage = {text: "Vous n'avez pas de programme. Touchez le bouton + pour enregistrer un programme", txtButton: "Réessayez" };
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
  }
  
  //This method is used to handle price related to sessions
  handlePrice(){
    // this.new_session.price = this.current_user.cost_session * this.new_session.num_sessions;
    this.new_session.price = 200;
  }

  getNameOfLevel(level: string){
    return this.levels.find(elt => elt.id == level);
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

  //This method is used to display form to submit advert
  openModal(){
    this.is_opened = true;
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
  async onPub(){
    if(this.new_session.name=="" || this.new_session.description==""){
      this.alertServ.errorToast("Veuillez renseigner le nom et la description du programme");
      return;
    }  

    if(this.new_session.price==0){
      this.alertServ.errorToast("Veuillez renseigner le prix du programme");
      return;
    }

    if(this.schedules.length==0){
      this.alertServ.errorToast("Please select exercises");
      return;
    }

    if(this.new_session.sporting_level==""){
      this.alertServ.errorToast("Veuillez le niveau du programme");
      return;
    }

    if(this.new_session.price <= 0){
      this.alertServ.errorToast("Please select valid price");
      return;
    }

    this.isLoading = true; 
    try {
      // const rep = await this.agentServ.createData("session", this.new_session);
      // console.log(rep);
      console.log("new session: ", this.new_session);

      const sessionData = {
        coach_id: this.current_user.id,
        currency: this.new_session.currency.id,
        description: this.new_session.description,
        is_active: this.new_session.is_active,
        is_private: this.new_session.is_private,
        name: this.new_session.name,
        objective: this.new_session.objective,
        price: this.new_session.price,
        schedules: JSON.stringify(this.schedules),
        session_image: this.new_session.session_image,
        sporting_level: this.new_session.sporting_level,
      }
      const res = await this.training.createSession(sessionData);
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
      this.new_session.session_image = rep.base64String;
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

  //This method is used to toogle
  handleActiveToogle(ev: any){
    console.log(ev);
    this.new_session.is_active = ev.detail.checked ? 1 : 0;
  }

  handlePrivateToogle(ev: any){
    console.log(ev);
    this.new_session.is_private = ev.detail.checked ? 1 : 0;
  }

  selectSportingLevel(ev:any) {
    console.log(ev);
    this.new_session.sporting_level = ev.detail.value;
  }

  gotoForward(){
    this.nav.navigateBack("/app/tabs/account/my-sessions");
  }

}
