import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/providers/data.service';
import { TrainingService } from 'src/app/providers/training.service';
import { Constants, DAK } from 'src/models/contants.models';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { Single } from 'src/models/single';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-my-purchase',
  templateUrl: './my-purchase.page.html',
  styleUrls: ['./my-purchase.page.scss'],
})
export class MyPurchasePage implements OnInit {

  menus = DAK.getSportType();
  sport_types: Single[] = [];
  lang: any;
  current_user: User;
  is_pending: boolean = true;
  tab_colors: string[] = [];
  sessionsCount : number = 0;
  programsCount : number = 0;

  constructor(
    private router : Router,
    private dataServ: DataService,
    private userServ: UserService
  ) { }

  ngOnInit() {

    this.tab_colors = DAK.listOfColors();
    this.initializeView();
  }

  async getNotificationList() {
    const notification_data = await this.userServ.getNotificationList(this.current_user.id);
    this.sessionsCount = notification_data.sessions;
    this.programsCount = notification_data.programs;
  }

  //This method is initiate
  async initializeView(){
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }
    this.getNotificationList();
  }

  //Go to details of notifications
  goToDetails(notificationType: string){
      this.router.navigate(['app/tabs/notifications'], { state: {notification_type: notificationType}});
  }

  //Randomize color
  getRandomColor(){

    let i: number = 0;
    var r = Math.floor(Math.random() * this.tab_colors.length);
    console.log(r);

    return this.tab_colors[r];
    /* while(i < tabs.length){
      if(arr.indexOf(r) === -1) arr.push(r);
      i++;
    } */
  }

}
