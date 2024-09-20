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
import { Session } from 'src/models/session';
import { Constants, DAK } from 'src/models/contants.models';
import { EmptyMessage } from 'src/models/iuser';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { Souscription } from 'src/models/souscription';
import { Exercise } from 'src/models/exercise';
import { ExerciseSchedule } from 'src/models/exercise-schedule';

@Component({
  selector: 'app-my-sessions',
  templateUrl: './my-sessions.page.html',
  styleUrls: ['./my-sessions.page.scss'],
})
export class MySessionsPage implements OnInit {

  @ViewChild('modal') modal: IonModal;

  lang: string;
  current_user: User;
  is_pending: boolean = true;
  mySessions: Session[] = [];
  errorMessage: EmptyMessage;
  is_opened: boolean = false;
  isUploaded: boolean = false;
  obj_pub: Session = new Session();
  current_date: string;
  subscriber: Souscription;
  default_image: string = "assets/imgs/bootcamp.png";
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
    }
    this.current_date = this.utils.getOnlyDateNow();
    // this.obj_pub.state = "pending";
    await this.getSessions();
  }

  //This method is used to handle price related to sessions
  handlePrice(){
    // this.obj_pub.price = this.current_user.cost_session * this.obj_pub.num_sessions;
    this.obj_pub.price = 200;
  }

  getNameOfLevel(level: string){
    return this.levels.find(elt => elt.id == level);
  }

  async getSessionSchedules(data: string): Promise<ExerciseSchedule[]>{
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

  //This method is used to get sessions published by a coach
  async getSessions(){

    this.is_pending = true;
    try {
      let rep = [];
      if(this.user_role === 'coach') {
        rep = await this.training.getCoachSessions(this.current_user.id);
      } else if(this.user_role === 'client'){
        rep = await this.training.getClientSessions(this.current_user.id);
      }
      console.log(rep);
      this.mySessions = [];
      for(let idx = 0; idx < rep.length; idx++)
      {
        const session_data = rep[idx];
        const schedule_data: string = session_data.schedules;
        const schedules = await this.getSessionSchedules(schedule_data);
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
          schedules: schedules,
          is_active: session_data.is_active,
          is_private: session_data.is_private,
          created_at: session_data.created_at,
          updated_at: session_data.updated_at
        }
        const new_session = new Session(sessionData);
        this.mySessions.push(new_session);
      }

      console.log("my sessions: ", this.mySessions);
      this.is_pending = false;
    } catch (error) {
      this.is_pending = false;
    }
  }

  goToCreateSession(){
    this.router.navigate(['app/tabs/account/create-session']);
  }

  goToDetail(session_id: number){
    if(this.user_role === 'coach') {
      this.router.navigate(['app/tabs/account/update-session/'+session_id]);
    }else if(this.user_role === 'client') {
      this.router.navigate(['app/tabs/account/my-session-detail/'+session_id]);
    }
  }


  getImage(obj: Session){
    const bg_image = obj.session_image ? obj.session_image : this.default_image;
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
  handleState(ev: any, obj: Session){
    //this.handleToogle(ev);
    // const str_action = obj.state == "pending" || obj.state=="inactive" ? "button_active" : "button_inactive";
    const str_action = "button_active"
    const toSend = {id: obj.id, action: str_action};
    this.alertServ.loadingPresent();
    this.agentServ.remoteCallData("session", toSend).then((rep)=>{
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
