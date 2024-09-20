import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/providers/data.service';
import { TrainingService } from 'src/app/providers/training.service';
import { Constants, DAK } from 'src/models/contants.models';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { Single } from 'src/models/single';

@Component({
  selector: 'app-log-book',
  templateUrl: './log-book.page.html',
  styleUrls: ['./log-book.page.scss'],
})
export class LogBookPage implements OnInit {

  menus = DAK.getSportType();
  sport_types: Single[] = [];
  lang: any;
  current_user: User;
  is_pending: boolean = true;
  tab_colors: string[] = [];

  constructor(
    private router : Router,
    private dataServ: DataService,
    private trainingServ: TrainingService
  ) { }

  ngOnInit() {

    this.tab_colors = DAK.listOfColors();
    this.initializeView();
  }

  //This method is initiate
  async initializeView(){
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{

    }
    await this.getUserLogs();
  }

  //This method is used to get list of sport type
  async getUserLogs(){

    this.is_pending = true;
    try {
      const rep = await this.trainingServ.getOnlineTrainingData("sport-type");

      this.is_pending = false;

    } catch (error) {
      this.is_pending = false;
    }
  }

  //Go to details log book
  goToDetails(sportType: Single){
    this.router.navigate(['details-logbook'], { state: sportType});
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
