import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/providers/data.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Constants } from 'src/models/contants.models';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';

@Component({
  selector: 'app-exos-cible',
  templateUrl: './exos-cible.page.html',
  styleUrls: ['./exos-cible.page.scss'],
})
export class ExosCiblePage implements OnInit {
  
  current_partner: User;
  lang: string;
  objExo: any = {};
  current_date: string;
  locale_lang: string;
  private imgMan: string = "assets/imgs/man_body";
  private imgWoman: string = "assets/imgs/woman_body";
  defaultImg: string;

  public photoSwipe: any;
  public isLightboxOpen: boolean;
  public backButtonListener: any;

  constructor(
    private router: Router,
    private dataServ: DataService,
    private utilsServ: UtilsService
  ) { }

  ngOnInit() {
    this.initializeData();
  }

  //Initialize view
  async initializeData(){
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_partner = userInfo;
    }else{
      
    }
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    this.locale_lang = this.lang+"-"+this.lang.toUpperCase();
    console.log(this.locale_lang);
    this.current_date = this.utilsServ.getOnlyDateNow();
    this.defaultImg = this.current_partner.gender=='male' ? this.imgMan: this.imgWoman;

  }

  onGalleryInit(photoSwipeInstance: any) {
    this.photoSwipe = photoSwipeInstance;
    this.isLightboxOpen = true;
  }

  onGalleryDestroy() {
    this.isLightboxOpen = false;
  }

  //Select exos
  selectExos(){
    this.router.navigate(['list-exercices']);
  }

}
