/** Cette classe définit l'objet (pour la gestion du modele body.sport) **/

export class BodySport {

    public id: number;
    public name: string;
    public code: string;
    public exercise_ids: number[];
    // public currency_id;
  
    constructor(serverJSON?: any) {
      if(serverJSON!=undefined)
        this.setPays(serverJSON);
      else 
        this.initTask();
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
    private setPays(data : any){
      
      this.id = data.me.id.me;
      
      if(!data.me.name.me || data.me.name===undefined)
        this.name = "";
      else
        this.name = data.me.name.me;
      
      if(data.me.code===undefined || !data.me.code.me)
        this.code = "";
      else
        this.code = data.me.code.me; 

      if(data.me.exercise_ids==undefined || !data.me.exercise_ids.me || data.me.exercise_ids.me.length==0)
        this.exercise_ids = [];
      else
        this.exercise_ids = this.getIdTabs(data.me.exercise_ids.me);
    
    }
  
    //création d'une tache vide
    private initTask(){
  
      this.exercise_ids = [];
      this.code = '';
      this.id = 0;
      this.name = "";
    }
  
  }
  