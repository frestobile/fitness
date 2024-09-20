/** Cette classe définit l'objet Sinistre sinistre. **/
export class SinistrePV {

    public id: number;
    public name: string;
    public user_id: {id: number; name: string;};
    public type_ids: number[];
    public write_uid: {id: number; name: string;};
    public note: string;
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
  
      
      if(data.me.write_uid===undefined || !data.me.write_uid.me)
        this.write_uid = {id:0, name: ""};
      else
        this.write_uid = { id: data.me.write_uid.me[0].me, name: data.me.write_uid.me[1].me };
        
      if(data.me.type_ids==undefined || !data.me.type_ids.me || data.me.type_ids.me.length==0)
        this.type_ids = [];
      else
        this.type_ids = this.getIdTabs(data.me.type_ids.me);
      
  
      if(data.me.user_id==undefined || !data.me.user_id.me)
          this.user_id = { id: 0, name: ''};
      else
          this.user_id = { id: data.me.user_id.me[0].me, name: data.me.user_id.me[1].me };
  
      
      if(data.me.note==undefined || !data.me.note.me)
        this.note = "";
      else
        this.note = data.me.note.me;
      
  
      if(data.me.write_date===undefined || !data.me.write_date.me)
        this.write_date = "";
      else
        this.write_date = data.me.write_date.me;
  
    }
    
  
    //On créé un objet de type Partner
    private createPartner(){
  
      this.id = 0;
      this.name = "";
      this.user_id = { id: 0, name: '' };
      this.type_ids = [];
      this.write_uid = { id: 0, name: '' };
      this.write_date = "";
      this.note = "";
    }
  
  }
  