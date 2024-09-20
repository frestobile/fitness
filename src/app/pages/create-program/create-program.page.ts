import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { PluginsService } from 'src/app/providers/plugins.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Constants, DAK } from 'src/models/contants.models';
import { EmptyMessage } from 'src/models/iuser';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { Exercise } from 'src/models/exercise'; 
import { ExerciseSchedule } from 'src/models/exercise-schedule'; 
import { Program } from 'src/models/program';
import { ProgramSchedule } from 'src/models/program-schedule';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.page.html',
  styleUrls: ['./create-program.page.scss'],
})
export class CreateProgramPage implements OnInit {

  @ViewChild('modal') modal: IonModal;

  lang: string;
  current_user: User;
  is_pending: boolean = true;
  errorMessage: EmptyMessage;
  is_opened: boolean = false; // open exercise selection modal
  is_shedule: boolean = false; // open user program schedule modal
  isUploaded: boolean = false;
  new_program: Program = new Program();
  current_date: string;
  default_image: string = "assets/imgs/default.png";
  levels: { id: string; name: string; checked: boolean; color: string; decalage: number; }[] = [];
  imgLogo: string;
  isLoading: boolean;
  exercises: Exercise[] = [];
  num_programs: number;
  schedules: ExerciseSchedule[] = [];
  new_schedule: ExerciseSchedule;
  customSportingLevelOptions = {};
  customExerciseOptions = {};
  clients: User[] = [];
  program_schedules: ProgramSchedule[] = [];
  selected_program_schedule: ProgramSchedule = new ProgramSchedule();
  program: Program = new Program();
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
    await this.getClientList();
    await this.getExercises();
  }
  
  //This method is used to handle price related to sessions
  handlePrice(){
    // this.new_program.price = this.current_user.cost_session * this.new_program.num_sessions;
    this.new_program.price = 200;
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

  //This method is used to display form to submit advert
  openModal(){
    this.is_opened = true;
  }

  openScheduleModal() {
    this.is_shedule = true;
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

  closeScheduleModal(ev:any)
  {
    this.is_shedule = false;
  }


  //This method is used to handle payment
  async handlePayment(){

  }

  //This method is used to create pub
  async onPub(){
    if(this.new_program.name=="" || this.new_program.description==""){
      this.alertServ.errorToast("Veuillez renseigner le nom et la description du programme");
      return;
    }  

    if(this.new_program.price==0){
      this.alertServ.errorToast("Veuillez renseigner le prix du programme");
      return;
    }

    if(this.schedules.length==0){
      this.alertServ.errorToast("Please select exercises");
      return;
    }

    if(this.new_program.sporting_level==""){
      this.alertServ.errorToast("Veuillez le niveau du programme");
      return;
    }

    if(this.new_program.price <= 0){
      this.alertServ.errorToast("Please select valid price");
      return;
    }

    this.isLoading = true; 
    try {
      // const rep = await this.agentServ.createData("session", this.new_program);
      // console.log(rep);

      const programData = {
        coach_id: this.current_user.id,
        currency: this.new_program.currency.id,
        description: this.new_program.description,
        is_active: this.new_program.is_active,
        is_private: this.new_program.is_private,
        name: this.new_program.name,
        objective: this.new_program.objective,
        price: this.new_program.price,
        schedules: JSON.stringify(this.schedules),
        program_image: this.new_program.program_image,
        sporting_level: this.new_program.sporting_level,
        program_schedules: JSON.stringify(this.program_schedules)
      }
      const res = await this.training.createProgram(programData);
      this.alertServ.presentToast("Votre programme a été ajouté avec succès");
      this.isLoading = false;
      this.nav.navigateRoot(['/app/tabs/account/my-programs']);
    } catch (error) {
      console.log(error);
      this.isLoading = false;
      this.alertServ.errorToast("Une erreur est survenue, veuillez réessayer ultérieurement");
    }

  }

  getImage(obj: Program){
    const bg_image = obj.program_image ? Constants.PREFIX_BASE64+obj.program_image : this.default_image;
    return bg_image;  
  }

  //This method is used to take Photo
  async updatePhoto(){
    try {
      const rep : any = await this.pluginServ.takePicture();
      this.imgLogo = Constants.PREFIX_BASE64+rep.base64String;
      this.new_program["program_image"] = rep.base64String;
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

  selectClient(event: any) {
    const selected_client_id = event.detail.value;
    this.selected_program_schedule.client_id = selected_client_id;
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
    if(this.selected_program_schedule.client_id == undefined || this.selected_program_schedule.client_id == 0) {
      this.alertServ.errorToast("Please choose client");
      return;
    }
    
    if(this.selected_program_schedule.play_date == undefined || this.selected_program_schedule.play_date == '')
    {
      this.alertServ.errorToast("Please insert correct date");
      return;
    }

    if(this.selected_program_schedule.start_time == undefined || this.selected_program_schedule.start_time == '')
    {
      this.alertServ.errorToast("Please insert correct time");
      return;
    }

    if(this.selected_program_schedule.end_time == undefined || this.selected_program_schedule.end_time == '')
    {
      this.alertServ.errorToast("Please insert correct time");
      return;
    }
    this.selected_program_schedule.program_id = this.program.id;

    let schedule = new ProgramSchedule(this.selected_program_schedule);
    this.program_schedules.push(schedule);
    this.selected_program_schedule = new ProgramSchedule();
  }

  //This method is used to toogle
  handleActiveToogle(ev: any){
    console.log(ev);
    this.new_program.is_active = ev.detail.checked ? 1 : 0;
  }

  handlePrivateToogle(ev: any){
    console.log(ev);
    this.new_program.is_private = ev.detail.checked ? 1 : 0;
  }

  selectSportingLevel(ev:any) {
    console.log(ev);
    this.new_program.sporting_level = ev.detail.value;
  }

  gotoForward(){
    this.nav.navigateBack("/app/tabs/account/my-programs");
  }

}
