import { SingleObjet } from "./entity";

/** Cette classe définit l'objet Training training.session.exercise.post **/
export class SessionPost {

  public id: number;
  public session_id: SingleObjet;
  public message_ids: number[];
  public name: string;
  public description: string;
  public message_partner_ids: number[];
  public calories: number;
  public distance: number;
  public time: number;
  public create_date: string;
  public write_date: string;
  public state: string;


  constructor(serverJSON?: any) {

    if(serverJSON!=undefined){
      this.setPartner(serverJSON);
      // this.hydrate(serverJSON.me)
    }else
      this.createPartner();
    
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
  private setPartner(data : any){
    
    this.id = data.me.id.me;

    if(!data.me.name.me || data.me.name==undefined)
      this.name = "";
    else
      this.name = data.me.name.me;
    

    if(data.me.state==undefined || !data.me.state.me)
      this.state = "";
    else
      this.state = data.me.state.me;


    if(data.me.description==undefined || !data.me.description.me)
      this.description = "";
    else
      this.description = data.me.description.me;

    
    if(data.me.create_date==undefined || !data.me.create_date.me)
      this.create_date = "";
    else
      this.create_date = data.me.create_date.me;

    if(data.me.distance==undefined || !data.me.distance.me)
      this.distance = 0;
    else
      this.distance = data.me.distance.me;

    
    if(data.me.write_date==undefined || !data.me.write_date.me)
      this.write_date = "";
    else
      this.write_date = data.me.write_date.me;

    
    if(data.me.calories===undefined || !data.me.calories.me)
      this.calories = 0;
    else
      this.calories = data.me.calories.me; 
    
    
    if(data.me.message_ids==undefined || !data.me.message_ids.me || data.me.message_ids.me.length==0)
      this.message_ids = [];
    else
      this.message_ids = this.getIdTabs(data.me.message_ids.me);
    
    if(data.me.message_partner_ids==undefined || !data.me.message_partner_ids.me || data.me.message_partner_ids.me.length==0)
      this.message_partner_ids = [];
    else
      this.message_partner_ids = this.getIdTabs(data.me.message_partner_ids.me);
    
    
    if(data.me.session_id==undefined || !data.me.session_id.me)
        this.session_id = { id: 0, name: ''};
    else
        this.session_id = { id: data.me.session_id.me[0].me, name: data.me.session_id.me[1].me };


    if(data.me.time==undefined || !data.me.time.me)
      this.time = 0;
    else
      this.time = data.me.time.me;
    
  }
  
  
  //On créé un objet de type Partner
  private createPartner(){

    this.id = 0;
    this.name = "";
    this.state = "";
    this.create_date = "";
    this.distance = 0;
    this.write_date = "";
    this.calories = 0;
    this.session_id = { id: 0, name: '' };
    this.message_partner_ids = [];
    this.message_ids = [];
    this.time = 0;    
  }

}
