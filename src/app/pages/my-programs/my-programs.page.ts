import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, NavController } from '@ionic/angular';
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
import { Souscription } from 'src/models/souscription';
import { Exercise } from 'src/models/exercise';
import { ExerciseSchedule } from 'src/models/exercise-schedule';

@Component({
  selector: 'app-my-programs',
  templateUrl: './my-programs.page.html',
  styleUrls: ['./my-programs.page.scss'],
})
export class MyProgramsPage implements OnInit {

  @ViewChild('modal') modal: IonModal;

  lang: string;
  current_user: User;
  is_pending: boolean = true;
  myPrograms: Program[] = [];
  errorMessage: EmptyMessage;
  is_opened: boolean = false;
  isUploaded: boolean = false;
  obj_pub: Program = new Program();
  current_date: string;
  subscriber: Souscription;
  default_image: string = "assets/imgs/default.png";
  levels: { id: string; name: string; checked: boolean; color: string; decalage: number; }[] = [];
  imgLogo: string;
  isLoading: boolean;
  user_role: string;

  constructor(
    private training: TrainingService,
    private utils: UtilsService,
    private alertServ: AlertService,
    private nav: NavController,
    private router: Router,
    private agentServ: AgentService,
    private pluginServ: PluginsService,
    private dataServ: DataService,
  ) { }

  ngOnInit() {

    this.errorMessage = {text: "Vous n'avez pas de programme. Touchez le bouton + pour enregistrer un programme", txtButton: "Réessayez" };
    this.initializeView();
    this.levels = DAK.getUserLevels();
  }

  //This method is used to initialize view
  async initializeView(){

    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
      this.user_role = this.current_user.role;
      this.current_date = this.utils.getOnlyDateNow();
      // this.obj_pub.state = "pending";
      await this.getPrograms();
    }
  }

  //This method is used to handle price related to sessions
  handlePrice(){
    // this.obj_pub.price = this.current_user.cost_session * this.obj_pub.num_sessions;
    this.obj_pub.price = 200;
  }

  getNameOfLevel(level: string){
    return this.levels.find(elt => elt.id == level);
  }

  async getProgramSchedules(data: string): Promise<ExerciseSchedule[]>{
    let schedules: ExerciseSchedule[] | PromiseLike<ExerciseSchedule[]> = [];
    const schedules_data = JSON.parse(data);

    console.log("schedule_data: ", schedules_data);
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

  //This method is used to get sessions published by a coach
  async getPrograms(){

    this.is_pending = true;
    try {
      let rep = [];
      if(this.user_role === 'coach') {
        rep = await this.training.getCoachPrograms(this.current_user.id);
      } else if(this.user_role === 'client'){
        rep = await this.training.getClientPrograms(this.current_user.id);
      }

      this.myPrograms = [];
      for(let idx = 0; idx < rep.length; idx++)
      {
        const program_data = rep[idx];
        console.log("program data: ", program_data);
        const schedule_data: string = program_data.schedules;
        const schedules = await this.getProgramSchedules(schedule_data);
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
          schedules: schedules,
          is_active: program_data.is_active,
          is_private: program_data.is_private,
          created_at: program_data.created_at,
          updated_at: program_data.updated_at
        }
        const new_program = new Program(programData);
        console.log("new program: ", new_program);
        this.myPrograms.push(new_program);
      }
      this.is_pending = false;
    } catch (error) {
      console.log(error);
      this.is_pending = false;
    }
  }

  goToCreateProgram(){
    this.router.navigate(['app/tabs/account/create-program']);
  }

  goToDetail(program_id: number){
    if(this.user_role === 'coach') {
      this.router.navigate(['app/tabs/account/update-program/'+program_id]);
    }else if(this.user_role === 'client') {
      this.router.navigate(['app/tabs/account/my-program-detail/'+program_id]);
    }
  }

  getImage(obj: Program){
    const bg_image = obj.program_image ? obj.program_image : this.default_image;
    return bg_image;
  }

  //This method is used to handle button when list is empty
  handleRetry(ev: any){

  }

  //This method is used to toogle
  handleToogle(ev: any){
    console.log(ev);
    // this.obj_pub.state = ev.detail.checked ? "active" : "pending";
  }

  //This method is used to check state
  checkStatus(state: string){
    if(state=="pending" || state=="inactive"){
      return false;
    }

    return true;
  }

  //This method is used to handle state
  handleState(ev: any, obj: Program){
    //this.handleToogle(ev);
    // const str_action = obj.state == "pending" || obj.state=="inactive" ? "button_active" : "button_inactive";
    const str_action = "button_active"
    const toSend = {id: obj.id, action: str_action};
    this.alertServ.loadingPresent();
    this.agentServ.remoteCallData("program", toSend).then((rep)=>{
      // obj.state = ev.detail.checked ? "active" : "inactive";
      this.alertServ.loadingDismiss();
      // const message: string = obj.state == "active" ? "Programme activé" : "Programme désactivé";
      // this.alertServ.presentToast(message);
    }).catch(err =>{
      this.alertServ.loadingDismiss();
      this.alertServ.errorToast("Une erreur est survenue, veuillez réessayer ultérieurement");
    });
  }
}
