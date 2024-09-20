import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UserService } from 'src/app/providers/user.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { DAK } from 'src/models/contants.models';
import { Etiquette } from 'src/models/etiquette';
import { User } from 'src/models/user';
import { Single } from 'src/models/single';
import Swiper from 'swiper';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {

  @ViewChild('wizardSlider', {static: true}) slider: ElementRef;
  @ViewChild('poidsSlider', {static: true}) sliderPoids: ElementRef;
  swiper?: Swiper;
  weights_swiper?: Swiper;

  slides: any[] = [];
  is_end: boolean = false;
  
  is_beginning: boolean = true;
  current_lang: any;
  objSpinner: boolean = false;
  is_login: boolean = false;
  is_skip: boolean = false;
  genders: { id: string; name: string; icon: string; icon_s: string; bg: string; checked: boolean;}[] = [];

  private txtLang: any;
  current_user: User;
  persons: { id: string; name: string; checked: boolean; active: boolean; }[] = [];
  weights: number;
  heights: number;
  bg_mic: string = "assets/icon/mic.jpg";
  optionsPage: {
    el: '.swiper-pagination',
    type: 'bullets',
  }
  mic: number = 0;
  levels: { id: string; name: string; checked: boolean; }[] = [];
  regimes: { id: string; name: string; checked: boolean; }[] = [];
  is_pending: boolean;
  private selected_type: any;
  sport_time: number;
  week_time: number;
  tags: Etiquette[] = [];
  list_tags: number[] = [];
  customActionSheetOptions = {

  };
  from_settings: any;
  sport_types: Single[] = [];
  years: number;
  month: number;
  days: number;
  times_per_week: number;
  
  constructor(
    private router: Router,
    private dataServ: DataService,
    private userServ: UserService,
    private agentServ: AgentService,
    private trainingServ: TrainingService,
    private alertServ: AlertService,
    private utils: UtilsService,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.initializeView();
  }

  //initialize view
  async initializeView(){
    const loggedUser = await this.dataServ.getUserInfo();
    if(loggedUser) {
      this.current_user = loggedUser;
    }
    console.log("current user: ", this.current_user);

    this.from_settings = this.router.getCurrentNavigation()?.extras.state;
    this.genders = DAK.getGenders();
    this.persons = DAK.getUserTypes();
    this.levels = DAK.getUserLevels();
    this.regimes = DAK.getRegimeOrNot();
    const sportsList = DAK.getSportType();
    if(sportsList.length > 0) {
      sportsList.map((sports:any)=>{
        const newSports =  new Single({id: sports.id, name: sports.name});
        this.sport_types.push(newSports);
      });
    }

    const objectives = await this.dataServ.getObjectives();
    if(objectives && objectives?.length > 0) {
      this.tags = [];
      objectives.map(objective=>{
        const etData = {
          id: objective.id,
          name: objective.name,
          role: this.current_user.role
        };
        const newEt = new Etiquette(etData);
        this.tags.push(newEt);
      })
    }

    this.levels[0].checked = true;
    this.current_user.sporting_level = this.levels[0].id;

    if(localStorage.getItem("first_fitness_login")!=null)
      this.handleDataSelected();
    else
      this.current_user.birthday = this.utils.getOnlyDateNow();
  }
 
  swiperReady(){
    this.swiper = this.slider?.nativeElement.swiper;
  }
  
  swiperPoidsReady(){
    this.weights_swiper = this.sliderPoids?.nativeElement.swiper;
  }


  //This method is used to define slides
  loadSlides(){

    // this.translate.get("start").subscribe(rep=>{
      this.slides =[ 
        {
          "img" : "assets/imgs/slider/slide.png",
          "title" : this.txtLang.network_logistic,
          "description": this.txtLang.network_multimodal
          // "title_en" : "Easily manage your clients' reservations in your hotel at your fingertips"
        },
        {
          "img":"",
          "banner":"assets/imgs/slider/slide1.png",
          "description":"Trouvez le bon entraînement pour ce dont vous avez besoin"
        },
        {
          "img":"",
          "banner":"assets/imgs/slider/slide2.png",
          "description":"Faire des séances d'entraînement appropriées et d'excellents résultats"
        },
        {
          "img":"",
          "banner":"assets/imgs/slider/slide3.png",
          "description":"Faites une séance d'entraînement et vivons en bonne santé avec nous"
        },
      ];
    console.log(this.slides);
    
  }

  //This method is used to handle slide change
  handleSlidechanged(ev: any){
    this.is_beginning = this.slider.nativeElement.swiper.isBeginning;
    this.is_end = this.slider.nativeElement.swiper.isEnd;
    //console.log(this.is_end);
    //console.log(this.slider.nativeElement.swiper.activeIndex);
    // this.currentSlide = this.slider.nativeElement.swiper.activeIndex;
  }

  //This method is used to handle slide change
  handlePoidschanged(ev: any){
    // this.is_beginning = this.slider.nativeElement.swiper.isBeginning;
    const is_end = this.sliderPoids.nativeElement.swiper.isEnd;
    console.log(is_end);
    console.log(this.sliderPoids.nativeElement.swiper.activeIndex);
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

  //This method is us
  previousPage(){
    const swiper: Swiper = this.slider.nativeElement.swiper;
    console.log(swiper.activeIndex);
    if(swiper.activeIndex==0 && this.from_settings!=undefined){
      this.nav.navigateBack("/app/tabs/account/settings");
    }else{
      swiper.slidePrev();
    }
  }

  //This method is used to change slide
  changeSlide(index: number){
    const swiper: Swiper = this.slider.nativeElement.swiper;
    //console.log(swiper.activeIndex);
    if(swiper.activeIndex==0 && !this.current_user.gender){
      this.alertServ.errorToast("Veuillez choisir un genre");
      return;
    }

    if(swiper.activeIndex==1 && !this.selected_type){
      this.alertServ.errorToast("Veuillez choisir le type de compte");
      return;
    }

    if(swiper.activeIndex==2 && !this.current_user.birthday){
      this.alertServ.errorToast("Veuillez renseigner votre date de naissance");
      return;
    }

    if(swiper.activeIndex==2 && this.computeAge(this.current_user.birthday) < 18){
      this.alertServ.errorToast("Vous devez avoir 18 ans et plus pour continuer");
      return;
    }

    if(swiper.activeIndex==3 && !this.weights){
      this.alertServ.errorToast("Précisez votre poids");
      return;
    }

    if(swiper.activeIndex==4 && !this.heights){
      this.alertServ.errorToast("Précisez votre taille");
      return;
   }


    // this.current_user.weight = this.weights;
    // this.current_user.size = this.heights;
    swiper.slideNext();
    // this.swiper?.slideNext(300);

  }

  //This method is used to select data already choose by user
  handleDataSelected(){
    // //Genders
    const idx_gender: number = this.genders.findIndex(elt => elt.id == this.current_user.gender);
    if(idx_gender>-1)
      this.genders[idx_gender].checked = true;

    // //User Type
    const userType: string = this.current_user.role;
    const idx_type: number = this.persons.findIndex(elt => elt.id== userType);
    if(idx_type>-1) {
      this.persons[idx_type].checked = true;
      this.selected_type = this.persons[idx_type];
      // this.getListOfObjectifs();
    }

    //Go Diet
    const goDiet: string = this.current_user.go_diet ? "yes" : "false";
    const idx_diet: number = this.regimes.findIndex(elt => elt.id == goDiet);
    if(idx_diet>-1) this.regimes[idx_diet].checked = true;

    //Level
    const idx_level: number = this.levels.findIndex(elt => elt.id == this.current_user.sporting_level);
    if(idx_level) this.levels[idx_level].checked = true;

    this.weights = this.current_user.weight;
    this.heights = this.current_user.height;
    this.years = this.current_user.years;
    this.month = this.current_user.month;
    this.days = this.current_user.days;
    this.times_per_week = this.current_user.times_per_week;

  }

  //This method is used to select gender
  selectGender(obj: any, idx: number){
    this.genders[idx].checked = !obj.checked;
    this.current_user.gender = obj.id;
    for (let k = 0; k < this.genders.length; k++) 
      if(k!=idx) this.genders[k].checked = false;
  }

  //Select user type
  selectType(obj: any, idx : number){
    
    this.persons[idx].checked = !obj.checked;
    this.selected_type = obj;
    this.current_user.role = obj.id;
    
    for (let k = 0; k < this.persons.length; k++) 
      if(k!=idx) this.persons[k].checked = false;

    // this.getListOfObjectifs();
  }

  //Handle regim if yes or no
  selectRegime(item: any, idx: number){
    this.regimes[idx].checked = !item.checked;
    this.current_user.go_diet = item.id == "yes" ? true: false;
    for (let k = 0; k < this.regimes.length; k++) 
      if(k!=idx) this.regimes[k].checked = false;
  }

  //Select activity level
  selectLevel(obj: any, idx : number){
    this.levels[idx].checked = !obj.checked;
    this.current_user.sporting_level = obj.id;
    
    for (let k = 0; k < this.levels.length; k++) 
      if(k!=idx) this.levels[k].checked = false;
  }

  //This method is used to handle goals
  handleChecked(ev: any, tag: Etiquette, idx: number){
    //console.log(ev);
    // if(ev.detail.checked){
    //   this.list_tags.push(tag.id);
    // }else{
    //   this.list_tags = this.list_tags.filter(elt => elt!=tag.id);
    // }

    // console.log(this.list_tags);
    // this.current_user.category_id = this.list_tags; 
  }

  //This method is used to select birthdate
  selectedDate(ev: any){
    if(ev.detail.value){
      let selected_date = ev.detail.value;
      const my_birthdate = selected_date.split("T")[0];
      this.current_user.birthday = my_birthdate;
    }
  }

  //Check if is a major
  computeAge(birthdate: string, d2?: any){

    var d1 = new Date(birthdate);
    d2 = d2 || new Date();
    var diff = d2.getTime() - d1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  //This method return text based on mic
  getMic(){
    if(this.weights===undefined || this.heights===undefined){
      return "MIC n'a pas été calculé car vous n'avez pas le poids et la taille";
    }
    
    if(this.weights==0 || this.heights==0){
      return "MIC n'a pas été calculé car vous n'avez pas le poids et la taille";
    }

    const mic = this.weights / ((this.heights/100)**2);
    this.mic = mic;
    if(mic<18.5)
      return "Poids insuffisant et pouvant occasionner certains risques pour la santé"; 
    else if(mic>=18.5 && mic<=24.9)
      return "Poids santé qui n'augmente pas les risques pour la santé"; 
    else if(mic>=25 && mic<=29.9)
      return "Excès de poids pouvant occasionner certains risques pour la santé"; 
    else 
      return "Obésité, risque accru de développer certaines maladies"; 
  }

  //Go to End of slide
  skip(){ 
    const swiper: Swiper = this.slider.nativeElement.swiper;
    /* this.is_skip = true;
    this.nav.navigateRoot(['app']); */
    this.goToHome();
    //swiper.slideTo(this.slides.length - 1);
    // this.slider.length().then(size=>{
    //   this.slider.slideTo(size-1);
    //   this.is_skip = true;
    //   this.slider.lockSwipeToNext(true);
    // });
  }

  goToHome(){

    let toUpdate: any = this.current_user;
    this.is_pending = true;
    // // delete toUpdate["sex"];
    // delete toUpdate["child_ids"];
    // delete toUpdate["active_ad"];
    // console.log("to update: ", toUpdate); 
    // localStorage.setItem("first_fitness_login", '1');

    const roleType: string = this.current_user.role;

    let user_profile = {
      birthday: this.current_user.birthday,
      weight: this.current_user.weight,
      height: this.current_user.height,
      years: this.current_user.years,
      month: this.current_user.month,
      days: this.current_user.days,
      go_diet: this.current_user.go_diet ? 1 : 0,
      times_per_week: this.current_user.times_per_week,
      sporting_level: this.current_user.sporting_level,
    }
    let userData = {
      role: roleType,
      gender: this.current_user.gender,
      email: this.current_user.email,
      user_profile: user_profile
    }

    this.userServ.updateUser(userData).then((rep)=>{
      this.is_pending = false;
      this.dataServ.setUserInfo(this.current_user);
      if(this.from_settings==undefined)
        this.router.navigate(['profile']);
      else 
        this.nav.navigateBack("/app/tabs/account/settings");
    }).catch(err=>{
      this.is_pending = false;
      this.dataServ.setUserInfo(this.current_user);
      if(this.from_settings==undefined)
        this.router.navigate(['profile']);
      else 
        this.nav.navigateBack("/app/tabs/account/settings");
    });
  }

  //This method is used to handle sport duration
  selectedDuration(ev : any){

  }

}
