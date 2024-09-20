import { SingleObjet } from "./entity";

/** Cette classe définit l'objet Peach contravention.approver **/
export class Approbateur {

    public id: number;
    public status: string;
    public contravention_id: SingleObjet;
    public employee_id: SingleObjet;
    public name: string;
    public user_id: { id: number; name: string; };
    public required: boolean;
    public department_id: SingleObjet;
    public company_id: SingleObjet;
    public display_name: string;

    // public number: number;
    // public total_qty: number;
    // public transfer_type: string;
    // public peach_type: string;
    public write_uid: SingleObjet;
    public create_uid: SingleObjet;
    public create_date: string;
    public write_date: string;
    // public time_of_passage: number;
    // public estimated_release_date: string;
    // public voucher_number: string;
    // public vessel?: string;
  
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
  
      if(data.me.status==undefined || !data.me.status.me)
        this.status = "";
      else
        this.status = data.me.status.me;

    
      if(data.me.display_name==undefined || !data.me.display_name.me)
        this.display_name = "";
      else
        this.display_name = data.me.display_name.me;
         
      
      if(data.me.write_uid===undefined || !data.me.write_uid.me)
        this.write_uid = {id:0, name: ""};
      else
        this.write_uid = { id: data.me.write_uid.me[0].me, name: data.me.write_uid.me[1].me };

      if(data.me.user_id===undefined || !data.me.user_id.me)
        this.user_id = {id:0, name: ""};
      else
        this.user_id = { id: data.me.user_id.me[0].me, name: data.me.user_id.me[1].me };
      
  
      if(data.me.create_uid==undefined || !data.me.create_uid.me)
        this.create_uid = {id: 0, name: ""}; 
      else
        this.create_uid = { id: data.me.create_uid.me[0].me, name: data.me.create_uid.me[1].me };

      if(data.me.contravention_id==undefined || !data.me.contravention_id.me)
        this.contravention_id = {id: 0, name: ""}; 
      else
        this.contravention_id = { id: data.me.contravention_id.me[0].me, name: data.me.contravention_id.me[1].me };
      
      if(data.me.department_id==undefined || !data.me.department_id.me)
          this.department_id = { id: 0, name: ''};
      else
          this.department_id = { id: data.me.department_id.me[0].me, name: data.me.department_id.me[1].me };
      
      if(data.me.employee_id==undefined || !data.me.employee_id.me)
          this.employee_id = { id: 0, name: ''};
      else
          this.employee_id = { id: data.me.employee_id.me[0].me, name: data.me.employee_id.me[1].me };
  
      if (data.me.company_id == undefined || !data.me.company_id.me)
          this.company_id = { id: 0, name: '' };
      else
          this.company_id = { id: data.me.company_id.me[0].me, name: data.me.company_id.me[1].me };
      
      if(data.me.required===undefined || !data.me.required.me)
        this.required = false;
      else
        this.required = data.me.required.me;
      
        if(data.me.create_date==undefined || !data.me.create_date.me)
        this.create_date = "";
      else
        this.create_date = data.me.create_date.me;
      
        
      if(data.me.write_date===undefined || !data.me.write_date.me)
        this.write_date = "";
      else
        this.write_date = data.me.write_date.me;
      
    }
    
  
    //On créé un objet de type Partner
    private createPartner(){
  
      this.id = 0;
      this.name = "";
      this.status = "";
      this.display_name = "";
      this.contravention_id = { id: 0, name: '' };
      this.company_id = { id: 0, name: '' };
      this.department_id = { id: 0, name: '' };
      this.employee_id = { id: 0, name: '' };
      this.write_uid = { id: 0, name: '' };
      this.create_uid = { id: 0, name: '' };
      this.user_id = { id: 0, name: '' };
      this.write_date = "";
      this.create_date = "";
      this.required = false;
      
    }
  
  }
  