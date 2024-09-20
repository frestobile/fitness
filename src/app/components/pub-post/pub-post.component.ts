import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
//import { TrainingPub } from 'src/models/pub';

@Component({
  selector: 'app-pub-post',
  templateUrl: './pub-post.component.html',
  styleUrls: ['./pub-post.component.scss'],
})
export class PubPostComponent  {

  imageDefaultCoach: string = "assets/imgs/default-avatar.jpg";
  defaultBg: string = "assets/imgs/banner_coach.png";
  @Input() coach: User;
  @Input() partner: User;
  @Output() followCoach : EventEmitter<User> = new EventEmitter<User>();
  @Output() viewCoach : EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  
  onFollowCoach(selectedCoach: User){
    this.followCoach.emit(selectedCoach);
  }

  onViewCoach(selectedCoach: User){
    this.viewCoach.emit(selectedCoach);
  }

  //This method is used to check if partner subscribed
  isSubscription(coach_id: number){
    // return this.coach.message_partner_ids.indexOf(this.partner.id)>-1;
    return 1;
  }

}
