import { SingleObjet } from "./entity";

/** Cette classe définit l'objet Peach contravention.material.seizure **/
export class MaterialSeizure {

    public id: number;
    public product_id: SingleObjet;
    public employee_id: SingleObjet;
    public name: string;
    public seized_date: string;

    public write_uid: SingleObjet;
    public create_uid: SingleObjet;
    public create_date: string;
    public write_date: string;

  
    constructor(serverJSON?: any) {
  
      if(serverJSON!==undefined)
        this.setPartner(serverJSON);
      else
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
  
      if(data.me.name==undefined || !data.me.name.me)
        this.name = "";
      else
        this.name = data.me.name.me;  
  
    
      if(data.me.seized_date==undefined || !data.me.seized_date.me)
        this.seized_date = "";
      else
        this.seized_date = data.me.seized_date.me;
         
      
      if(data.me.write_uid===undefined || !data.me.write_uid.me)
        this.write_uid = {id:0, name: ""};
      else
        this.write_uid = { id: data.me.write_uid.me[0].me, name: data.me.write_uid.me[1].me };
     
  
      if(data.me.create_uid==undefined || !data.me.create_uid.me)
        this.create_uid = {id: 0, name: ""}; 
      else
        this.create_uid = { id: data.me.create_uid.me[0].me, name: data.me.create_uid.me[1].me };

      if(data.me.product_id==undefined || !data.me.product_id.me)
        this.product_id = {id: 0, name: ""}; 
      else
        this.product_id = { id: data.me.product_id.me[0].me, name: data.me.product_id.me[1].me };
      
      
      if(data.me.employee_id==undefined || !data.me.employee_id.me)
          this.employee_id = { id: 0, name: ''};
      else
          this.employee_id = { id: data.me.employee_id.me[0].me, name: data.me.employee_id.me[1].me };
  
      
      if(data.me.create_date==undefined || !data.me.create_date.me)
        this.create_date = "";
      else
        this.create_date = data.me.create_date.me;
      
        
      if(data.me.write_date===undefined || !data.me.write_date.me)
        this.write_date = "";
      else
        this.write_date = data.me.write_date.me;
      
    }
    
  
    //On créé un objet de type Partner
    private createPartner(){
  
      this.id = 0;
      this.name = "";
      this.seized_date = "";
      this.product_id = { id: 0, name: '' };
      this.employee_id = { id: 0, name: '' };
      this.write_uid = { id: 0, name: '' };
      this.create_uid = { id: 0, name: '' };
      this.write_date = "";
      this.create_date = "";      
    }
  
  }
  