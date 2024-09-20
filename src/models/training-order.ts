import { SingleObjet } from "./entity";

/** Cette classe définit l'objet training.program **/
export class TrainingOrder {

  public id: number;
  public name: string;
  public partner_id: SingleObjet;
  public state: string;
  public amount: number;
  public currency_id: SingleObjet;
  public create_date: string;
  public write_date: string;
  public user_id: SingleObjet;
  public company_id: SingleObjet;
  public coach_id: SingleObjet;
  public program_id: SingleObjet;
  public description: string;
  public tag_ids: number[];
  public session_line_ids: number[];
  public sporting_level: string;
  num_sessions: number;
  session_ok: boolean;
  program_ok: boolean;
  payment_state: string;

     
  constructor(serverJSON?: any) {

    if(serverJSON!=undefined){
      this.setData(serverJSON);
    }else
      this.createData();
    
  } 

  hydrate(entity: Record<string | number,any>):void {

    for(const key of Object.keys(entity)){
       
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
    this.amount = data.amount;
    this.num_sessions = data.num_sessions;
    this.session_ok = data.session_ok;
    this.program_ok = data.program_ok;
    this.name = data.name;
    this.description = data.description;
    this.write_date = data.write_date;
    this.sporting_level = data.sporting_level;
    this.payment_state = data.payment_state;
    this.create_date = data.create_date;
    this.tag_ids = data.tag_ids;
    this.session_line_ids = data.session_line_ids;
    this.program_id = data.program_id;
    this.coach_id = data.coach_id;
    this.user_id = data.user_id;
    this.partner_id = data.partner_id;
    this.company_id = data.company_id;
    this.currency_id = data.currency_id; 
  }
  
  
  //On créé un objet de type Partner
  private createData(){

    this.id = 0;
    this.amount = 0;
    this.num_sessions = 0;
    this.session_ok = false;
    this.program_ok = false;
    this.name = "";
    this.description = "";
    this.write_date = "";
    this.sporting_level = "";
    this.payment_state = "";
    this.create_date = "";
    this.tag_ids = [];
    this.session_line_ids = [];
    this.program_id = { id: 0, name: '' };
    this.coach_id = { id: 0, name: '' };
    this.user_id = { id: 0, name: '' };
    this.partner_id = { id: 0, name: '' };
    this.company_id = { id: 0, name: '' };
    this.currency_id = { id: 0, name: 'AUD' };    
  }

}
