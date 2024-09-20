import { SingleObjet } from "./entity";

/** Cette classe définit l'objet Training training.session.exercise.line **/
export class SessionExerciseLine {

  public id: number;
  public exercise_id: SingleObjet;
  public body_id: SingleObjet;
  public sport_id: SingleObjet;
  public session_id: SingleObjet;
  public duration: number;
  public state: string;
  public num_repetition: number;
  public num_serie: number;
  public timeout: number;
  public weight: number;
  public display_name: string;
  public priority: string;



  constructor(serverJSON?: any) {

    if(serverJSON!=undefined){
      this.setData(serverJSON);
      // this.hydrate(serverJSON.me)
    }else
      this.createData();
    
  } 

  hydrate(entity: Record<string | number,any>):void {

    for(const key of Object.keys(entity)){
        
        // if(Reflect.has(this, key)){
          // console.log("I'm in");
          if(typeof entity[key].me === "string" || typeof entity[key].me === "number"  || typeof entity[key].me === "boolean"){
            Reflect.set(this, key, entity[key].me);
          }else if( entity[key].me[1] && typeof entity[key].me[1].me === "string"){
            const toInsert = {id: entity[key].me[0].me, name: entity[key].me[1].me }
            Reflect.set(this, key, toInsert);
          }else if(entity[key].me===false){
            console.log(Reflect.getOwnPropertyDescriptor(this, key));
          }else{
            const tabs = this.getIdTabs(entity[key].me);
            Reflect.set(this, key, tabs);
          }
        // } 
    }
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
    
    this.weight = data.weight;
    this.state = data.state;
    this.num_repetition = data.num_repetition;
    this.duration = data.duration;
    this.num_serie = data.num_serie;
    this.timeout = data.timeout;
    this.session_id = data.session_id;
    this.sport_id = data.sport_id;
    this.body_id = data.body_id;
    this.exercise_id = data.exercise_id;
    this.priority = this.priority; 
    
  }
  
  
  //On créé un objet de type Partner
  private createData(){

    this.id = 0;
    this.weight = 0;
    this.state = "";
    this.num_repetition = 0;
    this.duration = 0;
    this.num_serie = 0;
    this.timeout = 0;
    this.session_id = { id: 0, name: '' };
    this.sport_id = { id: 0, name: '' };
    this.body_id = { id: 0, name: '' };
    this.exercise_id = { id: 0, name: '' };
    this.priority = "";    
  }

}
