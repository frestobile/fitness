import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { PluginsService } from 'src/app/providers/plugins.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { ApiService } from 'src/app/providers/api.service';
import { Program } from 'src/models/program';
import { Constants, DAK } from 'src/models/contants.models';
import { EmptyMessage } from 'src/models/iuser';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { Exercise } from 'src/models/exercise';
import { ExerciseSchedule } from 'src/models/exercise-schedule';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/providers/user.service';
import { ProgramSchedule } from 'src/models/program-schedule';

@Component({
  selector: 'app-update-program',
  templateUrl: './update-program.page.html',
  styleUrls: ['./update-program.page.scss'],
})
export class UpdateProgramPage implements OnInit {

  @ViewChild('modal') modal: IonModal;

  lang: string;
  current_user: User;
  is_pending: boolean = true;
  errorMessage: EmptyMessage;
  is_opened: boolean = false; // open exercise selection modal
  is_shedule: boolean = false; // open user program schedule modal
  isUploaded: boolean = false;
  program: Program = new Program();
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
  clients: User[];
  program_schedules: ProgramSchedule[] = [];
  selected_program_schedule: ProgramSchedule = new ProgramSchedule();

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
    await this.getClientList();
    await this.getProgramDetail();
    await this.getProgramSchedules();
  }

  //This method is used to handle price related to sessions
  handlePrice(){
    // this.session.price = this.current_user.cost_session * this.session.num_sessions;
    this.program.price = 200;
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
    } catch (error) {

    }
  }

  async getProgramDetail() {
    const program_data = await this.training.getProgramDetail(this.params);
    console.log("session data: ", program_data);
    const schedule_data: string = program_data.schedules;
    this.schedules = await this.getExerciseSchedules(schedule_data);
    const programData = {
      id: program_data.id,
      name: program_data.name,
      coach_id: program_data.coach_id,
      price: program_data.price,
      sporting_level: program_data.sporting_level,
      objective: program_data.objective,
      currency: {id: 1, name: "AUD"},
      description: program_data.description,
      program_image: program_data.program_image,
      start_date: program_data.start_date,
      end_date: program_data.end_date,
      schedules: this.schedules,
      is_active: program_data.is_active,
      is_private: program_data.is_private,
      created_at: program_data.created_at,
      updated_at: program_data.updated_at
    }
    this.program = new Program(programData);
    if(this.program.program_image && this.program.program_image != '')
    {
      this.imgLogo = this.program.program_image;
      this.isUploaded = true;
    }
  }

  async getExerciseSchedules(data: string): Promise<ExerciseSchedule[]>{
    let schedules: ExerciseSchedule[] | PromiseLike<ExerciseSchedule[]> = [];
    const schedules_data = JSON.parse(data);
    if(schedules_data) {
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
    }
    return schedules;
  }

  async getProgramSchedules() {
    const result = await this.training.getProgramSchedules(this.params);
    this.program_schedules = [];
    for(let i = 0; i < result.length; i++)
    {
      const program_schedule_data = result[i];
      const new_ps = new ProgramSchedule(program_schedule_data);
      this.program_schedules.push(new_ps);
    }
    console.log("program schedules: ", this.program_schedules);
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

  closeScheduleModal(ev:any)
  {
    this.is_shedule = false;
  }

  //Close modal
  onClose(){
    this.modal.dismiss();
  }

  //This method is used to handle payment
  async handlePayment(){

  }

  //This method is used to create pub
  async updateProgram(){
    if(this.program.name=="" || this.program.description==""){
      this.alertServ.errorToast("Veuillez renseigner le nom et la description du programme");
      return;
    }

    if(this.program.price==0){
      this.alertServ.errorToast("Veuillez renseigner le prix du programme");
      return;
    }

    if(this.schedules.length==0){
      this.alertServ.errorToast("Please select exercises");
      return;
    }

    if(this.program.sporting_level==""){
      this.alertServ.errorToast("Veuillez le niveau du programme");
      return;
    }

    if(this.program.price <= 0){
      this.alertServ.errorToast("Please select valid price");
      return;
    }

    this.isLoading = true;
    try {
      const programData = {
        coach_id: this.current_user.id,
        currency: this.program.currency.id,
        description: this.program.description,
        is_active: this.program.is_active,
        is_private: this.program.is_private,
        name: this.program.name,
        objective: this.program.objective,
        price: this.program.price,
        schedules: JSON.stringify(this.schedules),
        program_image: this.program.program_image == this.imgLogo ? null : this.imgLogo,
        sporting_level: this.program.sporting_level,
        program_schedules: JSON.stringify(this.program_schedules)
      }
      const res = await this.training.updateProgram(programData, this.program.id);
      this.alertServ.presentToast("Votre programme a été ajouté avec succès");
      this.isLoading = false;
      setTimeout(() => {
        this.nav.navigateRoot(['/app/tabs/account/my-programs']);
      }, 2000);
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
      this.program["program_image"] = rep.base64String;
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
    this.program.is_active = ev.detail.checked ? 1 : 0;
  }

  handlePrivateToogle(ev: any){
    console.log(ev);
    this.program.is_private = ev.detail.checked ? 1 : 0;
  }

  selectSportingLevel(ev:any) {
    console.log(ev);
    this.program.sporting_level = ev.detail.value;
  }

  gotoForward(){
    this.nav.navigateBack("/app/tabs/account/my-programs");
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
            this.program_schedules.splice(idx, 1);
          }
        }
      ]
    });

    await alert.present();
  }

}
