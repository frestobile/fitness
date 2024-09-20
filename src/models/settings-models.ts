import { SingleObjet } from "./entity";

/** Cette classe définit l'objet res.config.settings **/
export class Settings {

    public id: number;
    public display_name: string;
    public currency_id: SingleObjet;
    public cost_daily_pub: number;
    public monthly_cost_subscription: number;
    public annual_cost_subscription: number;
    journal_id: SingleObjet;
    
  
    constructor(serverJSON?: any) { 
  
      if(serverJSON!==undefined)
        this.setPartner(serverJSON);
      else
        this.createPartner();
    } 
   
    //Cette fonction permet de générer un tableau
    //d'identifiant
    protected getIdTabs(liste: any[]){
  
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
    protected setPartner(data : any){
      
      this.id = data.me.id.me;
        
      if(!data.me.annual_cost_subscription.me || data.me.annual_cost_subscription==undefined)
        this.annual_cost_subscription = 0;
      else
        this.annual_cost_subscription = data.me.annual_cost_subscription.me;
  

      if(data.me.monthly_cost_subscription==undefined || !data.me.monthly_cost_subscription.me)
        this.monthly_cost_subscription = 0;
      else
        this.monthly_cost_subscription = data.me.monthly_cost_subscription.me;

  
      if(data.me.display_name==undefined || !data.me.display_name.me)
        this.display_name = "";
      else
        this.display_name = data.me.display_name.me;
      
    
      if(data.me.cost_daily_pub===undefined || !data.me.cost_daily_pub.me)
        this.cost_daily_pub = 0;
      else
        this.cost_daily_pub = data.me.cost_daily_pub.me;
    
      
      if(data.me.currency_id==undefined || !data.me.currency_id.me)
        this.currency_id = { id: 0, name: ''}; 
      else
        this.currency_id = { id: data.me.currency_id.me[0].me, name: data.me.currency_id.me[1].me };

      if(data.me.journal_id==undefined || !data.me.journal_id.me)
        this.journal_id = { id: 0, name: ''}; 
      else
        this.journal_id = { id: data.me.journal_id.me[0].me, name: data.me.journal_id.me[1].me };
        
    }
    
  
    //On créé un objet de type Partner
    protected createPartner(){
  
      this.id = 0;
      this.monthly_cost_subscription = 0;
      this.display_name = "";
      this.annual_cost_subscription = 0;
      this.currency_id = { id: 0, name: 'AUD' };
      this.journal_id = { id: 0, name: 'AUD' };
      this.cost_daily_pub = 0;
    }
  
  }
  