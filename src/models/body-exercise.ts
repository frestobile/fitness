import { SingleObjet } from "./entity";

/** Cette classe définit l'objet body.sport.exercise **/
export class BodyExercise {

  public id: number;
  public name: string;
  public body_id: SingleObjet;
  public code: string;


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
    

    if(data.me.code==undefined || !data.me.code.me)
      this.code = "";
    else
      this.code = data.me.code.me;
    
    
    if(data.me.body_id==undefined || !data.me.body_id.me)
        this.body_id = { id: 0, name: ''};
    else
        this.body_id = { id: data.me.body_id.me[0].me, name: data.me.body_id.me[1].me };
 
  }
  
  
  //On créé un objet de type Partner
  private createPartner(){

    this.id = 0;
    this.name = "";
    this.code = "";
    this.body_id = { id: 0, name: '' };
        
  }

}
