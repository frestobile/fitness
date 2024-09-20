import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Session } from 'src/models/session';
import { Constants, DAK } from 'src/models/contants.models';
import { EmptyMessage } from 'src/models/iuser';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';

@Component({
  selector: 'app-show-programmes',
  templateUrl: './show-programmes.page.html',
  styleUrls: ['./show-programmes.page.scss'],
})
export class ShowProgrammesPage implements OnInit {

  is_pending: boolean;
  pubs: Session[] = [];
  errorMessage: EmptyMessage;
  levels: { id: string; name: string; checked: boolean; color: string; decalage: number; }[] = [];
  lang: any;
  current_user: User;
  current_date: string;
  default_image: string = "assets/imgs/bootcamp.png";

  constructor(
    private training: TrainingService,
    private utils: UtilsService,
    private alertServ: AlertService,
    private nav: NavController,
    private router: Router,
    private dataServ: DataService
  ) { }

  ngOnInit() {

    this.errorMessage = {text: "Impossible d'afficher les programmes à votre taille, une erreur est survenue", txtButton: "Réessayez" };
    this.initializeView();
    this.levels = DAK.getUserLevels();
  }

  //This method is used to initialize view
  async initializeView(){

    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{
      
    }
    //this.obj_login = await this.dataServ.getUserLogin();
    this.current_date = this.utils.getOnlyDateNow();
        
    this.getBootcamps();
  }

  getNameOfLevel(level: string){
    return this.levels.find(elt => elt.id == level);
  }

  //This method is used to get bootcamps published by a coach
  async getBootcamps(){

    this.is_pending = true; 
    try {
      const filter = { sporting_level: ["=", this.current_user.sporting_level], state: ["=", "active"] };
      const rep = await this.training.getOnlineSessions(filter);
      console.log(rep);
      this.pubs = rep;
      this.is_pending = false;
    } catch (error) {
      this.is_pending = false;
    }
  }

  //This method is used to go to advert
  goToBootcamp(ev: Session){
    console.log(ev);
    this.router.navigate(['details-bootcamp'], {state: ev});
  }

  //This method is used to handle button when list is empty 
  handleRetry(ev: any){
    this.getBootcamps();
  }

  getImage(obj: Session){
    const bg_image = obj.session_image ? Constants.PREFIX_BASE64+obj.session_image : this.default_image;
    return bg_image;  
  }

}
