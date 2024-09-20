import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { DataService } from 'src/app/providers/data.service';
import { TrainingService } from 'src/app/providers/training.service';
import { Constants } from 'src/models/contants.models';
import { Exercise } from 'src/models/exercise';
import { ExerciseSchedule } from 'src/models/exercise-schedule';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-minuterie-details',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  @ViewChild('video') myVideo: ElementRef;
  is_start: boolean = false;
  lang: string = "fr";
  current_user: User;
  is_exos: boolean = true;
  exercise_id: number = 0;
  exercise: Exercise | null;
  packageType: any;
  packageId : any;
  schedule: ExerciseSchedule | any;
  reps: number;
  rest: number;
  time: number;
  weight: number;
  secondCount: number = 0;
  minuteCount: string = '00:00';
  totalCount: number = 0;
  timeCountInterval: any;
  timeLine : any;
  selectedIndex : number = 0;
  is_play: boolean = false;

  constructor(
    private dataServ: DataService,
    private trainingServ: TrainingService,
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

      this.timeLine = [];
      const prepareLine = {title: "Préparation", period: 10, is_exercise: false};
      this.timeLine.push(prepareLine);
      for(let i = 0; i < this.reps; i++) {
        const exerciseLine = {title: this.exercise?.title, period: this.time, is_exercise: true};
        this.timeLine.push(exerciseLine);
        if(i != this.reps - 1) {
          const restLine = {title: "Pause", period: this.rest, is_exercise: false};
          this.timeLine.push(restLine);
        }
      }
    }
  }

  formatTime() {
    const minutes: number = Math.floor(this.totalCount / 60);
    const seconds: number = this.totalCount % 60;

    // Format minutes and seconds to always be two digits
    const formattedMinutes: string = String(minutes).padStart(2, '0');
    const formattedSeconds: string = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  countTime() {
    this.timeCountInterval = setInterval(()=>{
      this.totalCount++;
      this.secondCount = this.totalCount % 60;
      this.minuteCount = this.formatTime();

      const currentPeriod = this.timeLine[this.selectedIndex].period;
      if(this.totalCount >= currentPeriod) {
        this.selectedIndex += 1;
        this.totalCount = 0;
        if(this.selectedIndex == this.timeLine.length) {
          clearInterval(this.timeCountInterval);
          this.stopVideo();
          // this.totalCount = 0;
        }else{
          const checkExercise = this.timeLine[this.selectedIndex].is_exercise;
          if(checkExercise) {
            this.playVideo();
          } else {
            this.stopVideo();
          }
        }
      }
    }, 1000);
  }

  playExercise() {
    this.is_start = !this.is_start;
    if(!this.is_start) {
      clearInterval(this.timeCountInterval);
    }else{
      this.countTime();
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

}
