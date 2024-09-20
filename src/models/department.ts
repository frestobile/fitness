/** Cette classe définit le modele stock.warehouse **/

import { SingleObjet } from "./entity";

export class Department {

    public id: number;
    public name: string;
    public company_id: SingleObjet;
    public contravention_ids: number[];
    public claim_ids: number[];

    
    constructor(serverJSON?: any) {
      if(serverJSON!==undefined)
        this.setMessage(serverJSON);
      else
        this.initObjet();
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
    private setMessage(data : any){
    
      this.id = data.me.id.me;
      
      if(!data.me.name.me || data.me.name===undefined)
        this.name = '';
      else
        this.name = data.me.name.me;  
  
      if(data.me.company_id==undefined || !data.me.company_id.me)
        this.company_id = {id:0, name: ""};
      else
        this.company_id = { 
          id: data.me.company_id.me[0].me,
          name: data.me.company_id.me[1].me 
        };
      
      if(data.me.contravention_ids==undefined || !data.me.contravention_ids.me || data.me.contravention_ids.me.length==0)
        this.contravention_ids = [];
      else
        this.contravention_ids = this.getIdTabs(data.me.contravention_ids.me);

      if(data.me.claim_ids==undefined || !data.me.claim_ids.me || data.me.claim_ids.me.length==0)
        this.claim_ids = [];
      else
        this.claim_ids = this.getIdTabs(data.me.claim_ids.me);

    }
  
    //Initialisation des données
    private initObjet(){
  
      this.id = 0;
      this.name = "";
      this.company_id = {id:0, name: ""};;
      this.contravention_ids = [];
      this.claim_ids = [];
    }
  
  }
  