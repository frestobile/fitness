import { SingleObjet } from "./entity";

/** Cette classe définit l'objet training.program.pub **/
export class TrainingPub {

  public id: number;
  public name: string;
  public partner_id: SingleObjet;
  public state: string;
  public amount: number;
  public amount_final: number;
  public currency_id: SingleObjet;
  public payment_state: string;
  public payment_reference: string;
  public user_id: SingleObjet;
  public company_id: SingleObjet;
  public narration: string;
  public date_start: string;
  public date: string;
  public duration_days: number;
  public create_date: string;
  public write_date: string;
     
  constructor(serverJSON?: any) {
    if(serverJSON!=undefined){
      this.setData(serverJSON);
      // this.hydrate(serverJSON.me)
    }else
      this.createData();
    
  } 

  hydrate(entity: Record<string | number,any>):void {

    for(const key of Object.keys(entity)){
        console.log(key);
        console.log(entity[key]);

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
    this.duration_days = data.duration_days;
    this.amount = data.amount;
    this.amount_final = data.amount_final;
    this.name = data.name;
    this.date = data.date;
    this.narration = data.narration;
    this.payment_reference = data.payment_reference;
    this.write_date = data.write_date;
    this.payment_state = data.payment_state;
    this.create_date = data.create_date;
    this.date_start = data.date_start;
    this.user_id = data.user_id;
    this.partner_id = data.partner_id;
    this.company_id = data.company_id;
    this.currency_id = data.currency_id;    
  }
  
  
  //On créé un objet de type Partner
  private createData(){

    this.id = 0;
    this.duration_days = 0;
    this.amount = 0;
    this.amount_final = 0;
    this.name = "";
    this.date = "";
    this.narration = "";
    this.payment_reference = "";
    this.write_date = "";
    this.payment_state = "";
    this.create_date = "";
    this.date_start = "";
    this.user_id = { id: 0, name: '' };
    this.partner_id = { id: 0, name: '' };
    this.company_id = { id: 0, name: '' };
    this.currency_id = { id: 0, name: 'EUR' };    
  }

}
