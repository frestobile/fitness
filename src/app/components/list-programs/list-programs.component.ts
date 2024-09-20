import { Program } from 'src/models/program';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants, DAK } from 'src/models/contants.models';

@Component({
  selector: 'app-list-programs',
  templateUrl: './list-programs.component.html',
  styleUrls: ['./list-programs.component.scss'],
})
export class ListProgramsComponent  implements OnInit {

  @Input() programs: Program[];
  @Input() lang: string = "fr";
  @Output() viewProgram: EventEmitter<Program> = new EventEmitter<Program>();

  defaultImg: string = "assets/imgs/bootcamp.png";
  levels: any = DAK.getUserLevels();

  constructor() { }

  ngOnInit() {}

  //This method is used
  showProgram(obj: Program){
    console.log("show program");
    this.viewProgram.emit(obj);
  }

  //This method is used to set Image
  getImage(obj: Program){
    const bg_image = obj.program_image ? obj.program_image : this.defaultImg;
    return bg_image;
  }

  //This method is used to get level name
  getNameOfLevel(level: string){
    return this.levels.find((elt: any) => elt.id == level);
  }

  getMinutes(sec: number) {
    return Math.floor(sec/60);
  }

  getDurations(schedules: any) {
    const exerciseSchedules = JSON.parse(schedules);
    let durationTime = "";
    let totalSeconds = 0;
    if(exerciseSchedules.length > 0) {
      exerciseSchedules.map((schedule:any) => {
        const exerciseSeconds = schedule.reps * schedule.time + (schedule.reps - 1) * schedule.rest;
        totalSeconds += exerciseSeconds;
      });
    }
    if(totalSeconds == 0) {
      durationTime = "0 minutes";
    }else{
      durationTime = this.getMinutes(totalSeconds) + " minutes";
    }
    return durationTime;
  }

  getExerciseCount(schedules: any) {
    const exerciseSchedules = JSON.parse(schedules);
    return exerciseSchedules.length;
  }
}
