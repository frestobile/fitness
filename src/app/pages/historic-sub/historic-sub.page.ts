import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Constants } from 'src/models/contants.models';
import { EmptyMessage } from 'src/models/iuser';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { Souscription } from 'src/models/souscription';

@Component({
  selector: 'app-historic-sub',
  templateUrl: './historic-sub.page.html',
  styleUrls: ['./historic-sub.page.scss'],
})
export class HistoricSubPage implements OnInit {

  lang: string;
  current_user: User;
  is_pending: boolean = true;
  subs: Souscription[] = [];
  errorMessage: EmptyMessage;
  is_opened: boolean = false;
  isUploaded: boolean = false;
  current_date: string;
  obj_login: any;

  constructor(
    private training: TrainingService,
    private utils: UtilsService,
    private alertServ: AlertService,
    private dataServ: DataService
  ) { }

  ngOnInit() {

    this.errorMessage = {text: "Vous n'avez pas d'abonnement ou une erreur est survenu. Veuillez réessayer", txtButton: "Réessayez" };
    this.initializeView();

  }

  //This method is used to initialize view
  async initializeView(){

    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{
      
    }
    this.obj_login = await this.dataServ.getUserLogin();
    this.current_date = this.utils.getOnlyDateNow();
    
    this.getSubs();
  }

  //This method is used to get subs published by a coach
  async getSubs(){

    this.is_pending = true;
    try {
      const filter = {partner_id: ["=", this.current_user.id] };
      const rep = await this.training.getOnlineSubs(filter);
      console.log(rep);
      this.subs = rep;
      this.is_pending = false;
    } catch (error) {
      this.is_pending = false;
    }
  }

  //Handle reload data
  handleRetry(ev: any){
    this.getSubs();
  }

  //Set color on ion text
  getColor(payment_state: string){
    return payment_state=="paid" ? "vert":"danger";
  }

  //Days left subscription
  daysLeft(end_date: string){
    const current_date = this.utils.getOnlyDateNow();
    return this.utils.computeDaysBetweenTwoDates(end_date, current_date);
  }

  getState(state: string){
    if(state=="pending"){
      return {icon: "hourglass-outline", color_icon: "danger", btn: "grislight"};
    }else if(state=="progress"){
      return {icon: "checkmark-outline", color_icon: "vert", btn: "vert-soft"};
    }else{
      return {icon: "archive-outline", color_icon: "primary", btn: "grislight"};
    }
  }

}
