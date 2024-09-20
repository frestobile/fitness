import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AfService } from 'src/app/providers/af.service';
import { DataService } from 'src/app/providers/data.service';
// import { OdooService } from 'src/app/providers/odoo.service';
import { Constants, Serveur } from 'src/models/contants.models';
import Swiper from 'swiper';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})
export class WalkthroughPage implements OnInit {

  @ViewChild('wizardSlider', {static: true}) slider: ElementRef;
  swiper?: Swiper;

  slides: any[] = [];
  is_end: boolean = false;
  is_beginning: boolean = true;
  current_lang: any;
  clientNumber: string;  
  abonneNumber: string;
  objSpinner: boolean = false;
  // objSetting: any;
  is_login: boolean = false;
  is_skip: boolean = false;;
  private txtLang: any;


  constructor(
    private router: Router,
    private afServ: AfService,
    private dataServ: DataService,
    // private odooServ: OdooService,
    private translate: TranslateService,
    // public menuCtrl: MenuController
  ) {}

  ngOnInit() {


    this.translate.get("walkthrought").subscribe(rep => {
      this.txtLang = rep;

      this.loadSlides(); 
    });

    this.initializeView();
    
  }

  //initialize view
  initializeView(){
    // this.handleAuthFirebase();
    this.afServ.getInfoServer().subscribe(async (reponse:any)=>{
      console.log(reponse);
      if(reponse.length){

        const conf_serveur = reponse.find((elt: any) => elt.active==true);
        
        let objServeur = Serveur;
        objServeur.database = conf_serveur.database;
        // objServeur.url = conf_serveur.url;
        objServeur.url = "http://localhost:8000";
        objServeur.passswd = conf_serveur.passwd;
        objServeur.customer = conf_serveur.login;

        localStorage.setItem(Constants.ODOO_CONF, JSON.stringify(objServeur));
        await this.initializeLogin();
        // localStorage.setItem(Constants.ODOO_CONF, JSON.stringify(objServeur));
      }

    }, (err)=>{
      let objServeur = Serveur;
      
    }); 
  }

  //This method is used to initialize login to Odoo
  private async initializeLogin(){

    if(localStorage.getItem(Constants.ODOO_CONF)){
      const data: any = localStorage.getItem(Constants.ODOO_CONF)
      const config = JSON.parse(data);
      
      const params = {username: config.customer, password: config.passswd};
      // console.log(params);
      try {
        // const rep: any = await this.odooServ.initConnexion(params);
        // console.log(rep);
        // const objLogin = { uid: rep.id, lang: "fr", ...params};
      } catch (error) {
        // console.log(error);
      }
    }
  }

  swiperReady(){
    this.swiper = this.slider?.nativeElement.swiper;
  }


  //This method is used to define slides
  loadSlides(){

    // this.translate.get("start").subscribe(rep=>{
      this.slides =[ 
        {
          "img" : "assets/imgs/slider/slide.png",
          "title" : this.txtLang.network_logistic,
          "description": this.txtLang.network_multimodal,
          "progress": "assets/icon/progress/progress.svg",
          // "title_en" : "Easily manage your clients' reservations in your hotel at your fingertips"
        },
        {
          "img":"",
          "banner":"assets/imgs/slider/slide1.png",
          "description":"Trouvez le bon entraînement pour ce dont vous avez besoin",
          "progress": "assets/icon/progress/progress_1.svg",
        },
        {
          "img":"",
          "banner":"assets/imgs/slider/slide2.png",
          "description":"Faire des séances d'entraînement appropriées et d'excellents résultats",
          "progress": "assets/icon/progress/progress_2.svg",
        },
        {
          "img":"",
          "banner":"assets/imgs/slider/slide3.png",
          "description":"Faites une séance d'entraînement et vivons en bonne santé avec nous",
          "progress": "assets/icon/progress/progress_3.svg",
        },
      ];
    console.log(this.slides);
    
  }

  //This method is used to handle slide change
  handleSlidechanged(ev: any){
    this.is_beginning = this.slider.nativeElement.swiper.isBeginning;
    this.is_end = this.slider.nativeElement.swiper.isEnd;
    console.log(this.is_end);
    console.log(this.slider.nativeElement.swiper.activeIndex);
    // this.currentSlide = this.slider.nativeElement.swiper.activeIndex;
  }

  //Slide has changed
  // slideHasChanged(){
  //   this.slider.isEnd().then((rep: any)=>{
  //     if(rep){
  //       this.is_end = true;
  //       this.is_next = false;
  //     }else{
  //       this.is_next = true;
  //       this.is_end = false;
  //     }
  //   });

  //   this.slider.getActiveIndex().then(idx=>{
  //     this.slider.length().then(size=>{
  //       if(size-1 == idx){
  //         this.is_skip = true;
  //         // this.slider.lockSwipeToNext(true);
  //       }
  //     });  
  //   });
  // }

  //This method is used to change slide
  changeSlide(index: number){
    const swiper: Swiper = this.slider.nativeElement.swiper;
    swiper.slideNext();
    // this.swiper?.slideNext(300);

  }

  //This method is used to go on Login page
  goToLogin(){
    localStorage.setItem("first_fitness", '1');
    this.router.navigate(['login']);
  }

  //Go to End of slide
  skip(){ 
    const swiper: Swiper = this.slider.nativeElement.swiper;
    
    swiper.slideTo(this.slides.length - 1);
    this.is_skip = true;
    // this.slider.length().then(size=>{
    //   this.slider.slideTo(size-1);
    //   this.is_skip = true;
    //   this.slider.lockSwipeToNext(true);
    // });
  }

}
