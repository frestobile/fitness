import { ExerciseSchedule } from './../../../models/exercise-schedule';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { DataService } from 'src/app/providers/data.service';
import { TrainingService } from 'src/app/providers/training.service';
import { Constants } from 'src/models/contants.models';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { TrainingSession } from 'F:/Projects source/App/Communifit source code/digital-square-fitness/src/models/training';
import { EmptyMessage } from 'src/models/iuser';

import { trainings } from 'src/data/trainings';

@Component({
  selector: 'app-details-logbook',
  templateUrl: './details-logbook.page.html',
  styleUrls: ['./details-logbook.page.scss'],
})
export class DetailsLogbookPage implements OnInit {
  
  @ViewChild('modal') modal: IonModal;
  sportType: any | undefined;
  lang: string;
  is_history: boolean = false;
  current_user: User;
  is_pending: boolean = true;
  entrainements: TrainingSession[] = [];
  selectedSeance: TrainingSession;
  exercices: ExerciseSchedule[] = [];
  is_exos: boolean;
  errorMessage: EmptyMessage;
  showButton: boolean;


  constructor(
    private router: Router,
    private trainingServ: TrainingService,
    private dataServ: DataService
  ) { }

  ngOnInit() {
    this.sportType = this.router.getCurrentNavigation()?.extras.state;
    this.errorMessage = {text: "Aucune séance enregistré", txtButton: "Réessayez" };

    this.initializeView();
    console.log(this.sportType);
  }
  
  //This method is used to initialize view
  async initializeView(){
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{
      
    }

    this.getSessions();
  }

  //This method is used for sessions
  async getSessions(){
    this.is_pending = true;
    
    try {
      const filter = { partner_id: ["=", this.current_user.id], sport_id: ["=", this.sportType.id]};
      // const rep = await this.trainingServ.getOnlineTraining(filter);
      // this.entrainements = rep.sort((a,b) => new Date(a.create_date).getTime() - new Date(b.create_date).getTime());
      this.entrainements = [];
      for(let i = 0; i < trainings.length; i++)
      {
        const training_data = new TrainingSession(trainings[i]);
        this.entrainements.push(training_data);
      }
      console.log(this.entrainements);
      //await this.buildExercises(this.entrainements);
      this.is_pending = false;
    } catch (error) {
      this.is_pending = false;
      this.showButton = true;
    }
  }

  //Open Weekly
  onCalendar(){

  }

  //This method is used to show details on session
  showDetails(obj: TrainingSession){
    //this.is_history = true;
    this.selectedSeance = obj;
    this.router.navigate(['list-exercices'], {state: obj});
    //this.buildExercises(this.selectedSeance);
  }

  //This method is used to build exercise
  async buildExercises(training: TrainingSession){
    
    this.is_exos = true;
    try {
      const filter  = { session_id: ["=", training.id] };
      // const rep  = await this.trainingServ.getOnlineSessionExercises(filter);
      // console.log(rep);
      // this.exercices = rep;
      this.is_exos = false;
      
    } catch (error) {
      this.is_exos = false;
    }
  }

  //This method is used to handle button when list is empty 
  handleRetry(ev: any){
    this.getSessions;
  }

  addBloc(){
    this.is_history = true;
  }

  //This method is used to handle closing modal
  handleClose(ev: any){
    this.is_history = false;
  }

  onClose(){
    this.modal.dismiss();
  }

  //Display week
  onShowWeek(){

  }

  //This method is used to display state
  getState(state: string){
    if(state=="pending"){
      return "Non commencé";
    }else if(state=="progress"){
      return "En cours";
    }else if(state=="finished"){
      return "Terminé";
    }else{
      return "Annulé";
    }
  }

}
