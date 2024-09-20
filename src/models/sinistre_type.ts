import { SingleObjet } from "./entity";

/** Cette classe définit l'objet Contravention type claim.type **/
export class ClaimType {

    public id: number;
    public model_id: SingleObjet;
    public name: string;
    public display_name: string;
    public description: string;
    public code: string;
  
    constructor(serverJSON?: any) {
  
      if(serverJSON!==undefined)
        this.setPartner(serverJSON);
      else
        this.createPartner();
    } 
  
    //Cette fonction permet de générer un tableau
    //d'identifiant
    // private getIdTabs(liste: any[]){
  
    //   let tab = [];
  
    //   for (var i = 0; i < liste.length; i++) {
    //       tab.push(liste[i].me);
    //   }
  
    //   return tab;
    // } 
  
  
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
  
      if(data.me.display_name==undefined || !data.me.display_name.me)
        this.display_name = "";
      else
        this.display_name = data.me.display_name.me;
    
      if(data.me.description==undefined || !data.me.description.me)
        this.description = "";
      else
        this.description = data.me.description.me;
  
  
      
      if(data.me.model_id==undefined || !data.me.model_id.me)
          this.model_id = { id: 0, name: ''};
      else
          this.model_id = { id: data.me.model_id.me[0].me, name: data.me.model_id.me[1].me };

      
    }
    
  
    //On créé un objet de type Partner
    private createPartner(){
  
      this.id = 0;
      this.name = "";
      this.code = "";
      this.display_name = "";
      this.description = "";
      this.model_id = { id: 0, name: '' };
      
    }
  
  }
  