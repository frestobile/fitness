import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/providers/data.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Constants } from 'src/models/contants.models';
import { User } from 'src/models/user';
import { ExerciseSchedule } from 'src/models/exercise-schedule';
import { Exercise } from 'src/models/exercise';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  @ViewChild('video') myVideo: ElementRef;
  is_history: boolean = false;
  packageType: any;
  packageId : any;
  schedule: ExerciseSchedule | any;
  lang: string = "fr";
  current_user: User;
  is_exos: boolean = true;
  is_play: boolean = false;
  exercise_id: number = 0;
  exercise: Exercise | null;
  reps: number;
  rest: number;
  time: number;
  weight: number;
  constructor(
    private dataServ: DataService,
    private trainingServ: TrainingService,
    private utils: UtilsService,
    private nav: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    const stateData = this.router.getCurrentNavigation()?.extras.state;
    console.log("state data: ", stateData);
    if(stateData) {
      this.packageId = stateData['id'];
      this.packageType = stateData['type'];
      this.schedule = stateData['schedule'];
    }
    if(this.schedule) {
      console.log("schedule: ", this.schedule);
      this.reps = this.schedule.reps;
      this.rest = this.schedule.rest;
      this.time = this.schedule.time;
      this.weight = this.schedule.weight;
      this.exercise_id = this.schedule.exercise.id;
    }
    this.initializeView();
  }

  //This method is used to initialize view
  async initializeView(){
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }
    if(this.exercise_id != 0) {
      this.exercise = await this.trainingServ.getExerciseDetail(this.exercise_id);
      console.log("exer: ", this.exercise);
    }
  }

  //Format decimal to time
  formatDecToTime(minutes: number){
    return this.utils.decToTime(minutes);
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

  playVideo() {
    this.myVideo.nativeElement.play();
    this.is_play = true;
  }

  stopVideo () {
    this.myVideo.nativeElement.pause();
    this.is_play = false;
  }

  onBack() {
    this.nav.back();
  }

  gotoTraining() {
    const stateData = {type: this.packageType, id: this.packageId, schedule: this.schedule};
    this.router.navigate(['app/tabs/training'], {state: stateData});
  }

}
