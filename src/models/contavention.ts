import { SingleObjet } from "./entity";

/** Cette classe définit l'objet Peach contravention **/
export class Contravention {

    public id: number;
    public status: string;
    public name: string;
    public user_id: SingleObjet;
    public partner_id: SingleObjet;
    public currency_id: SingleObjet;
    public mobile: string;
    public email: string;
    public vehicle_registration_number: string;
    public type_id: SingleObjet;
    public department_id: SingleObjet;
    public template_id: SingleObjet;
    public officer_id: SingleObjet;
    public triggering_id: SingleObjet;
    public offense_reason: string;
    public offense_location: string; 
    public amount: number;
    public date: string;
    public due_date: string;
    public unidentified_offender: boolean;
    public pv_signed: boolean;
    public material_seizure: boolean;
    public approver_ids: number[];
    public submit_date: string;
    public note: string;
    public write_uid: SingleObjet;
    public create_date: string;
    public write_date: string;
    public company_id: SingleObjet;
    public warning: boolean;
    public pv_signed_date: string;
    public signature: string;
    public composition_contravention: boolean;
    public validated_date: string;
    public be_transmitted: boolean;
    paid: boolean;
    payment_date: string;
    invoice_number: string;
    contravention_type: string;
    reserve: boolean;
    reserve_text: string;
    material_seizure_ids: number[];
    
  
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
  
      if(data.me.name==undefined || !data.me.name.me)
        this.name = "";
      else
        this.name = data.me.name.me;
      
      if(!data.me.mobile.me || data.me.mobile==undefined)
        this.mobile = "";
      else
        this.mobile = data.me.mobile.me;
  
      if(data.me.material_seizure==undefined || !data.me.material_seizure.me)
        this.material_seizure = false;
      else
        this.material_seizure = data.me.material_seizure.me;
  
      if(data.me.contravention_type==undefined || !data.me.contravention_type.me)
        this.contravention_type = "";
      else
        this.contravention_type = data.me.contravention_type.me;

      if(data.me.validated_date==undefined || !data.me.validated_date.me)
        this.validated_date = "";
      else
        this.validated_date = data.me.validated_date.me;

      if(data.me.offense_reason==undefined || !data.me.offense_reason.me)
        this.offense_reason = "";
      else
        this.offense_reason = data.me.offense_reason.me;
  
      if(!data.me.officer_id.me || data.me.officer_id==undefined)
        this.officer_id = { id: 0, name: ""};
      else
        this.officer_id = { id: data.me.officer_id.me[0].me, name: data.me.officer_id.me[1].me };
  
      if(data.me.status==undefined || !data.me.status.me)
        this.status = "";
      else
        this.status = data.me.status.me;
  
      if(data.me.email==undefined || !data.me.email.me)
        this.email = "";
      else
        this.email = data.me.email.me;
  
      if(data.me.vehicle_registration_number==undefined || !data.me.vehicle_registration_number.me)
        this.vehicle_registration_number = "";
      else
        this.vehicle_registration_number = data.me.vehicle_registration_number.me;
  
      if(data.me.composition_contravention==undefined || !data.me.composition_contravention.me)
        this.composition_contravention = false;
      else
        this.composition_contravention = data.me.composition_contravention.me;

      if(data.me.pv_signed.me==undefined || !data.me.pv_signed.me)
        this.pv_signed = false;
      else
        this.pv_signed = data.me.pv_signed.me;
  
      if(data.me.template_id==undefined || !data.me.template_id.me)
        this.template_id = {id:0, name:""};
      else
        this.template_id = { id: data.me.template_id.me[0].me, name: data.me.template_id.me[1].me };
  
      if(data.me.date==undefined || !data.me.date.me)
        this.date = "";
      else
        this.date = data.me.date.me;
  
      
      //ON attribut des valeurs aux restes des propriétés
      if(data.me.unidentified_offender==undefined || !data.me.unidentified_offender.me)
        this.unidentified_offender = false;
      else
        this.unidentified_offender = data.me.unidentified_offender.me; 
      
      
      if(data.me.write_uid===undefined || !data.me.write_uid.me)
        this.write_uid = {id:0, name: ""};
      else
        this.write_uid = { id: data.me.write_uid.me[0].me, name: data.me.write_uid.me[1].me };
      
      
      if(data.me.amount===undefined || !data.me.amount.me)
        this.amount = 0;
      else
        this.amount = data.me.amount.me;
      
  
      if(data.me.material_seizure_ids==undefined || !data.me.material_seizure_ids.me || data.me.material_seizure_ids.me.length==0)
        this.material_seizure_ids = [];
      else
        this.material_seizure_ids = this.getIdTabs(data.me.material_seizure_ids.me);

      if(data.me.approver_ids==undefined || !data.me.approver_ids.me || data.me.approver_ids.me.length==0)
        this.approver_ids = [];
      else
        this.approver_ids = this.getIdTabs(data.me.approver_ids.me);
      
  
      if(data.me.offense_location==undefined || !data.me.offense_location.me)
        this.offense_location = "";
      else
        this.offense_location = data.me.offense_location.me;
  
      if(data.me.triggering_id==undefined || !data.me.triggering_id.me)
        this.triggering_id = {id: 0, name: ""}; 
      else
        this.triggering_id = { id: data.me.triggering_id.me[0].me, name: data.me.triggering_id.me[1].me };

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
      
      if(data.me.type_id==undefined || !data.me.type_id.me)
          this.type_id = { id: 0, name: ''};
      else
          this.type_id = { id: data.me.type_id.me[0].me, name: data.me.type_id.me[1].me };
      
      if(data.me.department_id==undefined || !data.me.department_id.me)
          this.department_id = { id: 0, name: ''};
      else
          this.department_id = { id: data.me.department_id.me[0].me, name: data.me.department_id.me[1].me };
  
      if (data.me.user_id == undefined || !data.me.user_id.me)
          this.user_id = { id: 0, name: '' };
      else
          this.user_id = { id: data.me.user_id.me[0].me, name: data.me.user_id.me[1].me };
      
      if(data.me.note===undefined || !data.me.note.me)
        this.note = "";
      else
        this.note = data.me.note.me;
      
        if(data.me.create_date==undefined || !data.me.create_date.me)
        this.create_date = "";
      else
        this.create_date = data.me.create_date.me;
      
      if(data.me.due_date==undefined || !data.me.due_date.me)
        this.due_date = "";
      else
        this.due_date = data.me.due_date.me;
  
      if(data.me.write_date===undefined || !data.me.write_date.me)
        this.write_date = "";
      else
        this.write_date = data.me.write_date.me;
      
      if(data.me.submit_date===undefined || !data.me.submit_date.me)
        this.submit_date = "";
      else
        this.submit_date = data.me.submit_date.me;

      if(data.me.signature===undefined || !data.me.signature.me)
        this.signature = "";
      else
        this.signature = data.me.signature.me;

      if(data.me.payment_date===undefined || !data.me.payment_date.me)
        this.payment_date = "";
      else
        this.payment_date = data.me.payment_date.me;

      if(data.me.invoice_number===undefined || !data.me.invoice_number.me)
        this.invoice_number = "";
      else
        this.invoice_number = data.me.invoice_number.me;

      if(data.me.reserve_text===undefined || !data.me.reserve_text.me)
        this.reserve_text = "";
      else
        this.reserve_text = data.me.reserve_text.me;

      if(data.me.pv_signed_date===undefined || !data.me.pv_signed_date.me)
        this.pv_signed_date = "";
      else
        this.pv_signed_date = data.me.pv_signed_date.me;

      if(data.me.be_transmitted===undefined || !data.me.be_transmitted.me)
        this.be_transmitted = false;
      else
        this.be_transmitted = data.me.be_transmitted.me;

      if(data.me.paid===undefined || !data.me.paid.me)
        this.paid = false;
      else
        this.paid = data.me.paid.me;

      if(data.me.warning===undefined || !data.me.warning.me)
        this.warning = false;
      else
        this.warning = data.me.warning.me;

      if(data.me.reserve===undefined || !data.me.reserve.me)
        this.reserve = false;
      else
        this.reserve = data.me.reserve.me;
  
    }
    
  
    //On créé un objet de type Partner
    protected createPartner(){
  
      this.id = 0;
      this.name = "";
      this.invoice_number = "";
      this.contravention_type = "";
      this.offense_reason = "";
      this.officer_id = { id: 0, name: ""};
      this.status = "";
      this.email = "";
      this.vehicle_registration_number = "";
      this.pv_signed = false;
      this.template_id = {id:0, name:""};
      this.date = "";
      this.unidentified_offender = false;
      this.be_transmitted = false;
      this.paid = false;
      this.mobile = "";
      this.signature = "";
      this.payment_date = "";
      this.pv_signed_date = "";
      this.validated_date = "";
      this.reserve_text = "";
      this.offense_location = "";
      this.triggering_id = { id: 0, name: '' };
      this.partner_id = { id: 0, name: '' };
      this.user_id = { id: 0, name: '' };
      this.type_id = { id: 0, name: '' };
      this.department_id = { id: 0, name: '' };
      this.company_id = { id: 0, name: '' };
      this.currency_id = { id: 0, name: 'XOF' };
      this.approver_ids = [];
      this.material_seizure_ids = [];
      this.submit_date = "";
      this.write_uid = { id: 0, name: '' };
      this.amount = 0;
      this.write_date = "";
      this.due_date = "";
      this.material_seizure = false;
      this.composition_contravention = false;
      this.warning = false;
      this.reserve = false;
      this.create_date = "";
      this.note = "";
      
    }
  
  }
  