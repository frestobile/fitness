/** Cette classe définit l'objet avocat (hr.employee) **/
export class Employe {

 
  public id:number;
  public name:string;
  public birthday:string;
  public place_of_birth:string;
  public identification_id:string;
  public gender:string;
  public emergency_phone:string;
  public emergency_contact:string;
  
  public work_email:string;
  public work_phone:string;
  public mobile_phone:string;
  public passport_id:string;
  public marital:string;
  public manager:boolean;
  public remaining_leaves:number;
  public children:number;
  public work_location:string;
  public username?: string;
  public password?: string;
  public attendance_state:string;//statut de présence actuel
  public country_id:{id: number; name: string;};
  public job_id:{id: number; name: string;};
  public department_id:{id: number; name: string;};
  public user_id:{id: number; name: string;};
  public address_id:{id: number; name: string;};
  public parent_id:{id: number; name: string;};
  public attendance_ids:number[];//liste des présences
  public last_attendance_id:{id: number; name: string;}//dernière présence

  public active: boolean;
  public is_absent_today:boolean;
  
  
  constructor(serverJSON?: any) {

    if(serverJSON!=undefined)
      this.setEmployee(serverJSON);
    else
      this.createEmploye();
    
  } 

  hydrate(entity: Record<string | number,any>):void {

      for(const key of Object.keys(entity)){

          if(Reflect.has(this,key)){
            if(typeof entity[key].me === "string" || typeof entity[key].me === "number"  || typeof entity[key].me === "boolean"){
              Reflect.set(this, key, entity[key]);
            }else if( entity[key].me[1] && typeof entity[key].me[1].me === "string"){
              const toInsert = {id: entity[key].me[0].me, name: entity[key].me[1].me }
              Reflect.set(this, key, toInsert);
            }else{
              const tabs = this.getIdTabs(entity[key].me);
              Reflect.set(this, key, tabs);
            }
          } 
      }
  }
   

    //Permet de définir la liste
    private getIdTabs(liste: any[]){
  
      let tab = [];
      for (var i = 0; i < liste.length; i++) {
          tab.push(liste[i].me);
      }
  
      return tab;
    }

  /** Cette fonction permet de définir 
   * les valeurs des champs
   * @param data JSONObject, il s'agit des données JSON du serveur
   *
   ***/
  setEmployee(data : any){
    
    this.id = data.me.id.me;

    if(!data.me.name.me || data.me.name.me==undefined)
      this.name = "";
    else
      this.name = data.me.name.me;

    if(data.me.job_id==undefined || !data.me.job_id.me )
      this.job_id = { id: 0, name: '' };
    else
      this.job_id = { id: data.me.job_id.me[0].me, name: data.me.job_id.me[1].me };

    if(data.me.work_email===undefined || !data.me.work_email.me )
      this.work_email = "";
    else
      this.work_email = data.me.work_email.me;

   
    if(!data.me.address_id.me || data.me.address_id.me===undefined)
      this.address_id = { id: 0, name: '' };
    else
      this.address_id = { id: data.me.address_id.me[0].me, name: data.me.address_id.me[1].me };

    if(!data.me.mobile_phone.me || data.me.mobile_phone.me===undefined)
      this.mobile_phone = "";
    else
      this.mobile_phone = data.me.mobile_phone.me;
    
    if(!data.me.work_phone.me || data.me.work_phone.me==undefined)
      this.work_phone = "";
    else
      this.work_phone = data.me.work_phone.me;

    if(!data.me.attendance_state || data.me.attendance_state==undefined)
      this.attendance_state = "";
    else
      this.attendance_state = data.me.attendance_state.me;

    if(data.me.manager==undefined || !data.me.manager.me)
      this.manager = false; 
    else
      this.manager = data.me.manager.me;

    if(data.me.is_absent_today==undefined || !data.me.is_absent_today.me)
      this.is_absent_today = false; 
    else
    this.is_absent_today = data.me.is_absent_today.me;

    if(data.me.children===undefined || !data.me.children.me)
      this.children = 0;
    else
      this.children = data.me.children.me;

    if(data.me.remaining_leaves===undefined || !data.me.remaining_leaves.me)
        this.remaining_leaves = 0;
    else
        this.remaining_leaves = data.me.remaining_leaves.me;

    if(!data.me.emergency_phone.me || data.me.emergency_phone.me===undefined)
      this.emergency_phone = "";
    else
      this.emergency_phone = data.me.emergency_phone.me;

      if(!data.me.emergency_contact.me || data.me.emergency_contact.me===undefined)
      this.emergency_contact = "";
    else
      this.emergency_contact = data.me.emergency_contact.me;



    if(!data.me.place_of_birth.me || data.me.place_of_birth.me==undefined)
      this.place_of_birth = "";
    else
      this.place_of_birth = data.me.place_of_birth.me;


    if(!data.me.identification_id.me || data.me.identification_id.me===undefined)
      this.identification_id = "";
    else
      this.identification_id = data.me.identification_id.me;

    if(!data.me.passport_id.me || data.me.passport_id.me===undefined)
      this.passport_id = "";
    else
      this.passport_id = data.me.passport_id.me;

    if(!data.me.work_location.me || data.me.work_location.me===undefined)
      this.work_location = "";
    else
      this.work_location = data.me.work_location.me;

    if(data.me.department_id==undefined || !data.me.department_id.me)
        this.department_id = {id:0, name: ""};
    else
        this.department_id = { 
          id: data.me.department_id.me[0].me,
          name: data.me.department_id.me[1].me 
        };

    if(data.me.parent_id==undefined || !data.me.parent_id.me)
        this.parent_id = {id:0, name: ""};
    else
        this.parent_id = { 
          id: data.me.parent_id.me[0].me,
          name: data.me.parent_id.me[1].me 
    };

    if(data.me.attendance_ids==undefined || !data.me.attendance_ids.me || data.me.attendance_ids.me.length==0)
    this.attendance_ids = [];
  else
    this.attendance_ids = this.getIdTabs(data.me.attendance_ids.me);
    
  if(data.me.last_attendance_id==undefined || !data.me.last_attendance_id.me)
        this.last_attendance_id = {id:0, name: ""};
    else
        this.last_attendance_id = { 
          id: data.me.last_attendance_id.me[0].me,
          name: data.me.last_attendance_id.me[1].me 
        };

    if(!data.me.country_id.me || data.me.country_id.me===undefined)
      this.country_id = { id: 0, name: '' };
    else
      this.country_id = { id: data.me.country_id.me[0].me, name: data.me.country_id.me[1].me };

    if(!data.me.birthday.me || data.me.birthday.me===undefined)
      this.birthday = "";
    else
      this.birthday = data.me.birthday.me;

    if(data.me.gender==undefined || !data.me.gender.me || data.me.gender.me==undefined)
      this.gender = "";
    else
      this.gender = data.me.gender.me;

    /*if(data.me.image_url===undefined || !data.me.image_url.me)
      this.image_url = "assets/images/person.jpg";
    else
      this.image_url = data.me.image_url.me;*/

    /*if(!data.me.image.me || data.me.image.me=='false')
      this.image = "";
    else
      this.image = data.me.image.me;
    */
    //ON attribut des valeurs aux restes des propriétés

    if(data.me.marital===undefined || !data.me.marital.me)
      this.marital = ''; 
    else
        this.marital = data.me.marital.me;

    if (data.me.user_id.me == undefined || !data.me.user_id.me)
        this.user_id = { id: 0, name: '' };
    else
        this.user_id = { id: data.me.user_id.me[0].me, name: data.me.user_id.me[1].me };
     
    if(!data.me.children.me)
      this.children = 0;
    else  
      this.children = data.me.children.me;
    
    this.active = data.me.active.me;
    //this.is_absent_today = data.me.is_absent_today.me;

  }


  //On créé un objet de type Partner
  createEmploye(){
    this.id = 0;
    this.name = "";
    this.job_id = { id: 0, name: '' };
    this.department_id= { id: 0, name: '' };
    this.work_email = "";
    this.address_id = { id: 0, name: '' };
    this.mobile_phone = "";
    this.emergency_contact="";
    this.emergency_phone="";
    this.work_phone="";
    this.children=0;
    this.place_of_birth="";
    this.manager=false;
    this.remaining_leaves=0;
    this.identification_id = "";
    this.passport_id = "";
    this.country_id = { id: 0, name: '' };
    this.parent_id = { id: 0, name: '' };
    this.birthday = "";
    this.gender = "";
    //this.image_url = "assets/images/person.jpg";
    this.marital = '';
    this.user_id = { id: 0, name: '' };
    this.children = 0;
    this.work_location = "";
    this.active = true;
    this.is_absent_today=true;
   // this.image="";
  }

}
