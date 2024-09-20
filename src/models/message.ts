/** Cette classe définit l'objet message  (pour la gestion du modele mail.message) **/

export class Message {

    public id: number;
    public channel_id: number;
    public model: string;
    public message_type: string;
    public body: string;
    public author_id: number;
    public subject: string;
    public record_name: string;
    public email_from: string;
    public is_read: number;
    public created_at: string;
    public updated_at: string;
  
    /*
     * 
     * @param serverJSON JSONObject, 
     * il s'agit des données qui proviennent du server ou 
     * d'une autre soruce
     *
     */
    constructor(serverJSON?: any) {
      if(serverJSON!==undefined)
        this.setMessage(serverJSON);
      else
        this.initObjet();
    }
  
    //Cette fonction permet de générer un tableau
    //d'identifiant
    private getIdTabs(liste:any[]){
  
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
    
      this.id = data.id;
      
      if(!data.channel_id || data.channel_id===undefined)
        this.channel_id = 0;
      else
        this.channel_id = data.channel_id;

      if(!data.model || data.model===undefined)
        this.model = "";
      else
        this.model = data.model;

      if(!data.message_type || data.message_type===undefined)
        this.message_type = "";
      else
        this.message_type = data.message_type;

      if(!data.body || data.body===undefined)
        this.body = "";
      else
        this.body = data.body;

      if(!data.author_id || data.author_id===undefined)
        this.author_id = 0;
      else
        this.author_id = data.author_id;

      if(!data.subject || data.subject===undefined)
        this.subject = "";
      else
        this.subject = data.subject;

        if(!data.subject || data.subject===undefined)
        this.subject = "";
      else
        this.subject = data.subject;

      if(!data.record_name || data.record_name===undefined)
        this.record_name = "";
      else
        this.record_name = data.record_name;

      if(!data.email_from || data.email_from===undefined)
        this.email_from = "";
      else
        this.email_from = data.email_from;

      if(!data.is_read || data.is_read===undefined)
        this.is_read = 0;
      else
        this.is_read = data.is_read;

      if(!data.created_at || data.created_at===undefined)
        this.created_at = "";
      else
        this.created_at = data.created_at;

      if(!data.updated_at || data.updated_at===undefined)
        this.updated_at = "";
      else
        this.updated_at = data.updated_at;
    }
  
    //Initialisation des données
    private initObjet(){
      this.id = 0;
      this.channel_id = 0;
      this.model = "";
      this.message_type = "";
      this.body = "";
      this.author_id = 0;
      this.subject = "";
      this.record_name = "";
      this.email_from = "";
      this.is_read = 0;
      this.created_at = "";
      this.updated_at = "";
    }
  
  
  }
  