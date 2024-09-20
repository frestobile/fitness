/** Cette classe définit l'objet Pays (pour la gestion du modele res.country) **/

import { SingleObjet } from "./entity";

export class Pays {

  public id: number;
  public name: string;
  public code: string;
  public currency_id: SingleObjet;

  constructor(serverJSON: any) {
    this.setPays(serverJSON);
  } 


  /** Cette fonction permet de définir 
   * les valeurs des champs
   * @param data JSONObject, il s'agit des données JSON du serveur
   *
   ***/
  setPays(data : any){
    
    this.id = data.me.id.me;
    
    if(!data.me.name.me || data.me.name===undefined)
      this.name = "";
    else
      this.name = data.me.name.me;
    
    if(!data.me.code.me || data.me.code===undefined)
      this.code = "";
    else
      this.code = data.me.code.me;

    if(data.me.currency_id==undefined || !data.me.currency_id.me || data.me.currency_id.me=='false')
      this.currency_id = {id:0, name:""};
    else
      this.currency_id = { 
        id: data.me.currency_id.me[0].me,
        name: data.me.currency_id.me[1].me 
      };

  
  }

  //création d'une tache vide
  initTask(){

    this.code = '';
    this.id = 0;
    this.name = "";
    this.currency_id = {id:0, name:""};
  }

}
