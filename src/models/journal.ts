/** Cette classe définit l'objet channel  (pour la gestion du namee account.journal) **/

export class Journal {

    public id: number;
    public type: string;
    public name: string;
    public display_name:string;

      
    constructor(serverJSON?: any) {
      if(serverJSON!=undefined)
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
      

      if(data.me.display_name===undefined || !data.me.display_name.me)
        this.display_name = '';
      else
        this.display_name = data.me.display_name.me;

      if(data.me.type===undefined || !data.me.type.me)
        this.type = '';
      else
        this.type = data.me.type.me;
    

      if(data.me.name===undefined || !data.me.name.me)
        this.name = '';
      else
        this.name = data.me.name.me;

    }
  
    //Initialisation des données
    private initObjet(){
  
      this.id = 0;
      this.name = "";
      this.type = "";
      this.display_name = "";
    }
  
  
  }
  