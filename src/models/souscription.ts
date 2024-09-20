import { SingleObjet } from "./entity";

/** Cette classe définit l'objet program.subscription **/
export class Souscription {

    public id: number;
    public state: string;
    public name: string;
    public user_id: SingleObjet;
    public partner_id: SingleObjet;
    public currency_id: SingleObjet;
    public amount: number;
    public duration: number;
    public period: string;
    public duration_days: number;
    public date: string;
    public date_start: string; 
    public next_payment_date: string;
    public active: boolean;
    public create_date: string;
  company_id: { id: number; name: string; };
  payment_state: string;
    
  
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
  
      if(data.me.payment_state==undefined || !data.me.payment_state.me)
        this.payment_state = "";
      else
        this.payment_state = data.me.payment_state.me;

      if(data.me.name==undefined || !data.me.name.me)
        this.name = "";
      else
        this.name = data.me.name.me;
      
      if(!data.me.duration.me || data.me.duration==undefined)
        this.duration = 0;
      else
        this.duration = data.me.duration.me;
  

      if(data.me.duration_days==undefined || !data.me.duration_days.me)
        this.duration_days = 0;
      else
        this.duration_days = data.me.duration_days.me;

  
      if(data.me.state==undefined || !data.me.state.me)
        this.state = "";
      else
        this.state = data.me.state.me;
    
      if(data.me.period==undefined || !data.me.period.me)
        this.period = "";
      else
        this.period = data.me.period.me;
  
      if(data.me.date==undefined || !data.me.date.me)
        this.date = "";
      else
        this.date = data.me.date.me;
  
      
      //ON attribut des valeurs aux restes des propriétés
      if(data.me.active==undefined || !data.me.active.me)
        this.active = false;
      else
        this.active = data.me.active.me; 
      
      
      if(data.me.amount===undefined || !data.me.amount.me)
        this.amount = 0;
      else
        this.amount = data.me.amount.me;
    
  
      if(data.me.date_start==undefined || !data.me.date_start.me)
        this.date_start = "";
      else
        this.date_start = data.me.date_start.me;
  
      if(data.me.partner_id==undefined || !data.me.partner_id.me)
        this.partner_id = {id: 0, name: ""}; 
      else
        this.partner_id = { id: data.me.partner_id.me[0].me, name: data.me.partner_id.me[1].me };
      
      if(data.me.currency_id==undefined || !data.me.currency_id.me)
        this.currency_id = { id: 0, name: ''}; 
      else
        this.currency_id = { id: data.me.currency_id.me[0].me, name: data.me.currency_id.me[1].me };
      
      if(data.me.company_id==undefined || !data.me.company_id.me)
        this.company_id = { id: 0, name: ''}; 
      else
        this.company_id = { id: data.me.company_id.me[0].me, name: data.me.company_id.me[1].me };
      
      
      if (data.me.user_id == undefined || !data.me.user_id.me)
          this.user_id = { id: 0, name: '' };
      else
          this.user_id = { id: data.me.user_id.me[0].me, name: data.me.user_id.me[1].me };
      
      if(data.me.create_date==undefined || !data.me.create_date.me)
        this.create_date = "";
      else
        this.create_date = data.me.create_date.me;
        
      if(data.me.next_payment_date===undefined || !data.me.next_payment_date.me)
        this.next_payment_date = "";
      else
        this.next_payment_date = data.me.next_payment_date.me;

      
  
    }
    
  
    //On créé un objet de type Partner
    protected createPartner(){
  
      this.id = 0;
      this.name = "";
      this.duration_days = 0;
      
      this.state = "";
      this.period = "";
      this.payment_state = "";
      this.date = "";
      this.active = false;
      
      this.duration = 0;
      this.date_start = "";
      this.partner_id = { id: 0, name: '' };
      this.user_id = { id: 0, name: '' };
      this.company_id = { id: 0, name: '' };
      this.currency_id = { id: 0, name: 'AUD' };
     
      this.next_payment_date = "";
      this.amount = 0;
      this.create_date = "";
    }
  
  }
  