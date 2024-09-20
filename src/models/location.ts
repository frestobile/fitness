/** Cette classe définit l'objet Location (pour la gestion du modele stock.location) **/

export class Location {

    public id: number;
    public name: string;
    public usage: string;
    public complete_name: string;
    public parent_path: string;
    // public currency_id;
  
    constructor(serverJSON?: any) {
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
      
      if(data.me.usage===undefined || !data.me.usage.me)
        this.usage = "";
      else
        this.usage = data.me.usage.me; 

      if(data.me.complete_name===undefined || !data.me.complete_name.me)
        this.complete_name = "";
      else
        this.complete_name = data.me.complete_name.me;  

      if(data.me.parent_path===undefined || !data.me.parent_path.me)
        this.parent_path = "";
      else
        this.parent_path = data.me.parent_path.me;  
    
    }
  
    //création d'une tache vide
    initTask(){
  
      this.usage = '';
      this.id = 0;
      this.name = "";
      this.complete_name = "";
    }
  
  }
  