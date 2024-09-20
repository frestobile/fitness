/** Cette classe définit l'objet lead (opportunité ou poste) res.company **/
export class Company {

    public id: number;
    public default_hotel_checkin: number;
    public default_hotel_checkout: number;
    public name: string;
    public display_name: string;
    public city: string;
    public email: string;
    public zip: string;
    public currency_id: { id: number; name: string; };
    public country_id: { id: number; name: string; };
    public default_public_pricelist: { id: number; name: string; };
    public child_ids: number[];
    public default_member_pricelist: { id: number; name: string; };
    public partner_id: { id: number; name: string; };
    street: string;
    state_id: { id: number; name: string; };
  
    constructor(serverJSON?: any) {
  
      if(serverJSON!==undefined)
        this.setCompany(serverJSON);
      else
        this.createCompany();
      
    } 
  
    /**
     * This method is used to convert objets
     * into Array of number
     * @param liste Array<any>, une liste d'objets xmlrpc
     */
    private getIdTabs(liste : Array<any>): Array<number>{
  
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
    private setCompany(data : any){
      
      this.id = data.me.id.me;
  
      if(!data.me.name.me || data.me.name==undefined)
        this.name = "";
      else
        this.name = data.me.name.me;
      
      if(!data.me.display_name.me || data.me.display_name==undefined)
        this.display_name = "";
      else
        this.display_name = data.me.display_name.me;
      
      if(data.me.city===undefined || !data.me.city.me)
        this.city = "";
      else
        this.city = data.me.city.me;
      
      if(data.me.zip===undefined || !data.me.zip.me)
        this.zip = "";
      else
        this.zip = data.me.zip.me;

      if(data.me.street===undefined || !data.me.street.me)
        this.street = "";
      else
        this.street = data.me.street.me;
      
      if(data.me.default_hotel_checkin===undefined || !data.me.default_hotel_checkin.me)
        this.default_hotel_checkin = 0;
      else
        this.default_hotel_checkin = data.me.default_hotel_checkin.me;

      if(data.me.default_hotel_checkout===undefined || !data.me.default_hotel_checkout.me)
        this.default_hotel_checkout = 0;
      else
        this.default_hotel_checkout = data.me.default_hotel_checkout.me;
      
      if(data.me.email==undefined || !data.me.email.me)
        this.email = "";
      else
        this.email = data.me.email.me;
  
      if (data.me.default_public_pricelist === undefined || !data.me.default_public_pricelist.me)
          this.default_public_pricelist = { id: 0, name: '' };
      else
          this.default_public_pricelist = { id: data.me.default_public_pricelist.me[0].me, name: data.me.default_public_pricelist.me[1].me };
      
      if (data.me.partner_id === undefined || !data.me.partner_id.me)
          this.partner_id = { id: 0, name: '' };
      else
          this.partner_id = { id: data.me.partner_id.me[0].me, name: data.me.partner_id.me[1].me };

      if (data.me.state_id === undefined || !data.me.state_id.me)
          this.state_id = { id: 0, name: '' };
      else
          this.state_id = { id: data.me.state_id.me[0].me, name: data.me.state_id.me[1].me };
      
      if (data.me.default_member_pricelist === undefined || !data.me.default_member_pricelist.me)
          this.default_member_pricelist = { id: 0, name: '' };
      else
          this.default_member_pricelist = { id: data.me.default_member_pricelist.me[0].me, name: data.me.default_member_pricelist.me[1].me };

      if (data.me.currency_id === undefined || !data.me.currency_id.me)
          this.currency_id = { id: 0, name: '' };
      else
          this.currency_id = { id: data.me.currency_id.me[0].me, name: data.me.currency_id.me[1].me };
      
      if (data.me.country_id === undefined || !data.me.country_id.me)
          this.country_id = { id: 0, name: '' };
      else
          this.country_id = { id: data.me.country_id.me[0].me, name: data.me.country_id.me[1].me };
      
        if(data.me.child_ids==undefined || !data.me.child_ids.me || data.me.child_ids.me.length==0)
            this.child_ids = [];
        else
            this.child_ids = this.getIdTabs(data.me.child_ids.me);
  
    }
  
  
    //On créé un objet de type Partner
    private createCompany(){
     
      this.id = 0;
      this.name = "";
      this.display_name = "";
      this.city = "";
      this.street = "";
      this.email = "";
      this.currency_id = { id: 0, name: '' };
      this.country_id = { id: 0, name: '' };
      this.partner_id = { id: 0, name: '' };
      this.child_ids = [];
    }
  
  }
  