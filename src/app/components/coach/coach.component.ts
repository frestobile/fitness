import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss'],
})
export class CoachComponent {

  imageDefaultCoach: string = "assets/imgs/default-avatar.jpg";
  defaultBg: string = "assets/imgs/bg_coach.png";
  @Input() coach: User;
  @Output() followCoach : EventEmitter<User> = new EventEmitter<User>();
  @Output() viewCoach : EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  
  onFollowCoach(selectedCoach: User){
    this.followCoach.emit(selectedCoach);
  }

  onViewCoach(selectedCoach: User){
    this.viewCoach.emit(selectedCoach);
  }

}
