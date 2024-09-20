/** Cette classe définit l'objet User (res.user) **/

export class User {

  public id: number;
  public username : string;
  public first_name: string;
  public last_name: string;
  public display_name : string;
  public email: string;
  public phone_number: string;
  public login_type: string;
  public login_status: string;
  public profile_image: string;
  public role: string; // coach or client
  public last_notification_seen: string;
  public job: string;
  public age: number;
  public birthday: string;
  public address: string;
  public gender: string;
  public weight: number;
  public height: number;
  public notifications: number;
  public go_diet: Boolean;
  public years: number;
  public month: number;
  public days: number;
  public times_per_week: number;
  public password: string;

  public city: string;
  public lang: {id: string; titre: string};
  public country_id: {id: number; name: string};
  public currency_id: {id: number; name: string};
  public signup_expiration: string;
  public sporting_level: string;
  public background_image: string;
  public fb_id: string;
  public google_id : string;

  constructor(serverJSON?: any) {
    // this.popLang = objLang;
    if(serverJSON!==undefined)
      this.setUser(serverJSON);
    else
      this.initUser();
  } 

  private getIdTabs(liste: any[]){

    let tab = [];
    for (var i = 0; i < liste.length; i++) {
        tab.push(liste[i].me);
    }

    return tab;
  }
  
  /** 
   * Cette fonction retourne le libelle de la notification
   * en fonction de l'id
   * @param id string, l'id du titre
   * @return string 
   **/
  getTitreById(id: string, tab: any[]){

    for (let i = 0; i < tab.length; i++) {
      if(tab[i].id==id)
        return tab[i].text;
    }

  }

  /** Cette fonction permet de définir 
   * les valeurs des champs
   * @param data JSONObject, il s'agit des données JSON du serveur
   *
   ***/
  setUser(data : any){
    this.id = data.id;
    if(data.username === undefined || !data.username){
      this.username = "";
    }else{
      this.username  = data.username;
    }

    if(data.first_name === undefined || !data.first_name){
      this.first_name = "";
    }else{
      this.first_name = data.first_name;
    }

    if(data.last_name === undefined || !data.last_name){
      this.last_name = "";
    }else{
      this.last_name = data.last_name;
    }

    if(data.display_name === undefined || !data.display_name){
      this.display_name = "";
    }else{
      this.display_name  = data.display_name;
    }

    if(data.email === undefined || !data.email){
      this.email = "";
    }else{
      this.email = data.email;
    }

    if(data.phone_number === undefined || !data.phone_number){
      this.phone_number = "";
    }else{
      this.phone_number = data.phone_number;
    }

    if(data.login_type === undefined || !data.login_type){
      this.login_type = "";
    }else{
      this.login_type = data.login_type;
    }

    if(data.login_status === undefined || !data.login_status){
      this.login_status = "";
    }else{
      this.login_status = data.login_status;
    }

    if(data.profile_image === undefined || !data.profile_image){
      this.profile_image = "";
    }else{
      this.profile_image = data.profile_image;
    }

    if(data.role === undefined || !data.role){
      this.role = "";
    }else{
      this.role = data.role;
    }

    if(data.last_notification_seen === undefined || !data.last_notification_seen){
      this.last_notification_seen = "";
    }else{
      this.last_notification_seen = data.last_notification_seen;
    }

    if(data.job === undefined || !data.job){
      this.job = "";
    }else{
      this.job = data.job;
    }

    if(data.age === undefined || !data.age){
      this.age = 0;
    }else{
      this.age = data.age;
    }

    if(data.birthday === undefined || !data.birthday){
      this.birthday = "";
    }else{
      this.birthday = data.birthday;
    }

    if(data.address === undefined || !data.address){
      this.address = "";
    }else{
      this.address = data.address;
    }

    if(data.gender === undefined || !data.gender){
      this.gender = "";
    }else{
      this.gender = data.gender;
    }

    if(data.password === undefined || !data.password){
      this.password = "";
    }else{
      this.password = data.password;
    }

    if(data.city === undefined || !data.city){
      this.city = "";
    }else{
      this.city = data.city;
    }

    if(data.lang === undefined || !data.lang){
      this.lang = data.lang;
    }else{
      this.lang = {id:"", titre: ""};
    }

    if(data.country_id === undefined || !data.country_id){
      this.country_id = data.country_id;
    }else{
      this.country_id = {id: 0, name: ""};
    }

    if(data.currency_id === undefined || !data.currency_id){
      this.currency_id = {id: 0, name: ""};
    }else{
      this.currency_id = data.currency_id;
    }

    if(data.signup_expiration === undefined || !data.signup_expiration){
      this.signup_expiration = "";
    }else{
      this.signup_expiration = data.signup_expiration;
    }

    if(data.background_image === undefined || !data.background_image){
      this.background_image = "";
    }else{
      this.background_image = data.background_image;
    }  
    
    if(data.sporting_level === undefined || !data.sporting_level){
      this.sporting_level = "";
    }else{
      this.sporting_level = data.sporting_level;
    }  

    if(data.go_diet === undefined || !data.go_diet){
      this.go_diet = false;
    }else{
      this.go_diet = data.go_diet == 1 ? true : false;
    }  

    if(data.years === undefined || !data.years){
      this.years = 0;
    }else{
      this.years = data.years;
    }  

    if(data.month === undefined || !data.month){
      this.month = 0;
    }else{
      this.month = data.month;
    }  

    if(data.days === undefined || !data.days){
      this.days = 0;
    }else{
      this.days = data.days;
    }  

    if(data.weight === undefined || !data.weight){
      this.weight = 0;
    }else{
      this.weight = data.weight;
    }  

    if(data.height === undefined || !data.height){
      this.height = 0;
    }else{
      this.height = data.height;
    }  

    if(data.times_per_week === undefined || !data.times_per_week){
      this.times_per_week = 0;
    }else{
      this.times_per_week = data.times_per_week;
    }  

    if(data.google_id === undefined || !data.google_id){
      this.google_id = "";
    }else{
      this.google_id = data.google_id;
    }  

    if(data.fb_id === undefined || !data.fb_id){
      this.fb_id = "";
    }else{
      this.fb_id = data.fb_id;
    }  

    if(data.notifications === undefined || !data.notifications){
      this.notifications = 0;
    }else{
      this.notifications = data.notifications;
    }  
  }

  //initialisation de l'objet User
  initUser(){
    this.id = 0;
    this.username  = "";
    this.first_name = "";
    this.last_name = "";
    this.display_name  = "";
    this.email = "";
    this.phone_number = "";
    this.login_type = "";
    this.login_status = "";
    this.profile_image = "";
    this.role = "";
    this.last_notification_seen = "";
    this.notifications = 0;
    this.job = "";
    this.age = 0;
    this.birthday = "";
    this.address = "";
    this.gender = "male";
    this.password = "";
    this.city = "";
    this.lang = {id:"", titre: ""};
    this.country_id = {id: 0, name: ""};
    this.currency_id = {id: 0, name: ""};
    this.signup_expiration = "";
    this.background_image = "";
    this.sporting_level = "beginner";
    this.go_diet = false;
    this.years  = 0;
    this.month = 0;
    this.days = 0;
    this.google_id = "";
    this.fb_id = "";
    this.weight = 0;
    this.height = 0;
    this.times_per_week = 0;
  }
}
