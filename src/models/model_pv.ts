/** Cette classe définit l'objet contravention.minute.model **/
export class ContraventionPV {

    public id: number;
    public name: string;
    public type_ids: number[];
    public note: string;
    public contravention_type: string;
    user_id: { id: number; name: string; };
    
  
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
  
      if(!data.me.name.me || data.me.name==undefined)
        this.name = "";
      else
        this.name = data.me.name.me;
      
      if(!data.me.note.me || data.me.note==undefined)
        this.note = "";
      else
        this.note = data.me.note.me;
  
      if(data.me.contravention_type==undefined || !data.me.contravention_type.me)
        this.contravention_type = "";
      else
        this.contravention_type = data.me.contravention_type.me;
        
      if(data.me.user_id===undefined || !data.me.user_id.me)
        this.user_id = {id:0, name: ""};
      else
        this.user_id = { id: data.me.user_id.me[0].me, name: data.me.user_id.me[1].me };
        
      
      if(data.me.type_ids==undefined || !data.me.type_ids.me || data.me.type_ids.me.length==0)
        this.type_ids = [];
      else
        this.type_ids = this.getIdTabs(data.me.type_ids.me);
      
    }
    
  
    //On créé un objet de type Partner
    private createPartner(){
  
      this.id = 0;
      this.name = "";
    //   this.state = "";
      this.user_id = {id:0, name: ""};
      this.note = "";
      this.contravention_type = "";
      this.type_ids = [];
      // this.contravention = false;
      
    }
  
  }
  