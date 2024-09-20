import { SingleObjet } from "./entity";

/** Cette classe définit l'objet subscription.payment.register **/
export class SubPayment {

  public id: number;
  public display_name: string;
  public journal_id: SingleObjet;
  public currency_id: SingleObjet;
  public company_id: SingleObjet;
  public payment_method_line_id: SingleObjet;
  public payment_date: string;
  public communication: string;
  public partner_id: SingleObjet;
  public amount: number;
  public write_date: string;
  payment_token_id: string;
  subscription_id: SingleObjet;
  program_id: SingleObjet;
  pub_id: SingleObjet;

   
  constructor(serverJSON?: any) {

    if(serverJSON!=undefined){
      this.setPartner(serverJSON);
      // this.hydrate(serverJSON.me)
    }else
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
    
    if(!data.me.display_name.me || data.me.display_name==undefined)
      this.display_name = "";
    else
      this.display_name = data.me.display_name.me;




    if(data.me.payment_token_id==undefined || !data.me.payment_token_id.me)
      this.payment_token_id = "";
    else
      this.payment_token_id = data.me.payment_token_id.me;

    if(data.me.communication==undefined || !data.me.communication.me)
      this.communication = "";
    else
      this.communication = data.me.communication.me;


    if(data.me.write_date==undefined || !data.me.write_date.me)
      this.write_date = "";
    else
      this.write_date = data.me.write_date.me;


    if(data.me.payment_date===undefined || !data.me.payment_date.me)
      this.payment_date = "";
    else
      this.payment_date = data.me.payment_date.me; 
    


    if(data.me.program_id==undefined || !data.me.program_id.me)
      this.program_id = {id: 0, name: ""}; 
    else
      this.program_id = { id: data.me.program_id.me[0].me, name: data.me.program_id.me[1].me };

    if(data.me.subscription_id==undefined || !data.me.subscription_id.me)
      this.subscription_id = {id: 0, name: ""}; 
    else
      this.subscription_id = { id: data.me.subscription_id.me[0].me, name: data.me.subscription_id.me[1].me };

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
    
    if(data.me.payment_method_line_id==undefined || !data.me.payment_method_line_id.me)
        this.payment_method_line_id = { id: 0, name: ''};
    else
        this.payment_method_line_id = { id: data.me.payment_method_line_id.me[0].me, name: data.me.payment_method_line_id.me[1].me };
    
    if(data.me.journal_id==undefined || !data.me.journal_id.me)
        this.journal_id = { id: 0, name: ''};
    else
        this.journal_id = { id: data.me.journal_id.me[0].me, name: data.me.journal_id.me[1].me };

    if(data.me.pub_id==undefined || !data.me.pub_id.me)
      this.pub_id = { id: 0, name: ''}; 
    else
      this.pub_id = { id: data.me.pub_id.me[0].me, name: data.me.pub_id.me[1].me };

    if(data.me.amount===undefined || !data.me.amount.me)
      this.amount = 0;
    else
      this.amount = data.me.amount.me;


  }
  
  
  //On créé un objet de type Partner
  private createPartner(){

    this.id = 0;
    this.amount = 0;
    this.communication = "";
    this.payment_token_id = "";
    this.write_date = "";
    this.payment_date = "";
    this.display_name = "";
    this.program_id = { id: 0, name: '' };
    this.partner_id = { id: 0, name: '' };
    this.subscription_id = { id: 0, name: '' };
    this.payment_method_line_id = { id: 0, name: '' };
    this.journal_id = { id: 0, name: '' };
    this.pub_id = { id: 0, name: '' };
    this.company_id = { id: 0, name: '' };
    this.currency_id = { id: 0, name: 'AUD' };
  }

}
