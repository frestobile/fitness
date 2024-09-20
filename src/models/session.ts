import { SingleObjet } from "./entity";
import { ExerciseSchedule } from "./exercise-schedule";

/** Cette classe définit l'objet training.program.product **/
export class Session {

  public id: number;
  public name: string;
  public coach_id: number;
  public price: number;
  public sporting_level: string;
  public objective: string;
  public currency: SingleObjet;
  public description: string;
  public session_image: string;
  public start_date: string;
  public end_date: string;
  public schedules: ExerciseSchedule[] = [];
  public is_active: number;
  public is_private: number;
  public create_at: string;
  public updated_at: string;
  
     
  constructor(serverData?: any) {

    if(serverData!=undefined){
      this.setData(serverData);
    }else
      this.createData();
    
  } 

  //Cette fonction permet de générer un tableau
  //d'identifiant
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
  private setData(data : any){
    this.id = data.id;
    this.name = data.name;
    this.coach_id = data.coach_id;
    this.price = data.price;
    this.sporting_level = data.sporting_level;
    this.objective = data.objective;
    this.currency = data.currency;
    this.description = data.description;
    this.session_image = data.session_image;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.schedules = data.schedules;
    this.is_active = data.is_active;
    this.is_private = data.is_private;
    this.create_at = data.created_at;
    this.updated_at = data.updated_at;  
  }
  
  
  //On créé un objet de type Partner
  private createData(){
    this.id = 0;
    this.name = "";
    this.coach_id = 0;
    this.price = 0;
    this.sporting_level = "";
    this.objective = "";
    this.currency = {id: 0, name: "AUD"};
    this.description = "";
    this.session_image = "";
    this.start_date = "";
    this.end_date = "";
    this.schedules = [];
    this.is_active = 0;
    this.is_private = 0;
    this.create_at = "";
    this.updated_at = "";  
  }

}
