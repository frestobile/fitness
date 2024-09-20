/** Cette classe définit l'objet  (pour la gestion du modele stock.picking) **/

export class Stock {

    public id: number;
    public name: string;
    public scheduled_date: string;
    public date_deadline: string;
    public picking_type_id: { id: number; name: string; };
    public partner_id:{ id: number; name: string; };
    public exploitation_id: { id: number; name: string; };
    public origin: string;
    public create_date: string;
    public write_date: string;
    public move_ids_without_package: number[];
    public state: string;
    public peach_id: { id: number; name: string; };
    // public exploitation_id: { id: number; name: string; };
        
 
    constructor(serverJSON?: any) {
      
      if(serverJSON!==undefined){
        this.setStock(serverJSON);
      }else{
        this.initObjet();
      }
      
      
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
    setStock(data : any){
      
      this.id = data.me.id.me;
  
      if(!data.me.name.me || data.me.name==undefined)
        this.name = "";
      else
        this.name = data.me.name.me;
      
      if(!data.me.create_date.me || data.me.create_date==undefined)
        this.create_date = "";
      else
        this.create_date = data.me.create_date.me;
      
      if(!data.me.write_date.me || data.me.write_date==undefined)
        this.write_date = "";
      else
        this.write_date = data.me.write_date.me;
      
  
      if(!data.me.state.me || data.me.state.me==undefined)
        this.state = '';
      else
        this.state = data.me.state.me;
  
        
      if(data.me.partner_id==undefined || !data.me.partner_id.me)
        this.partner_id = {id:0, name:""};
      else
        this.partner_id = {
          id: data.me.partner_id.me[0].me,
          name: data.me.partner_id.me[1].me 
        };
      
      if(data.me.exploitation_id==undefined || !data.me.exploitation_id.me)
        this.exploitation_id = {id:0, name:""};
      else
        this.exploitation_id = {
          id: data.me.exploitation_id.me[0].me,
          name: data.me.exploitation_id.me[1].me 
        };
  
      if(data.me.date_deadline===undefined || !data.me.date_deadline.me)
        this.date_deadline = '';
      else
        this.date_deadline = data.me.date_deadline.me;

      if(data.me.origin===undefined || !data.me.origin.me)
        this.origin = '';
      else
        this.origin = data.me.origin.me;
      
      if(data.me.scheduled_date===undefined || !data.me.scheduled_date.me)
        this.scheduled_date = '';
      else
        this.scheduled_date = data.me.scheduled_date.me;
      
      
      if(data.me.move_ids_without_package==undefined || !data.me.move_ids_without_package.me || data.me.move_ids_without_package.me.length==0)
        this.move_ids_without_package = [];
      else
        this.move_ids_without_package = this.getIdTabs(data.me.move_ids_without_package.me);

      
      if(data.me.picking_type_id==undefined || !data.me.picking_type_id.me)
        this.picking_type_id = {id:0, name:""};
      else
        this.picking_type_id = { 
          id: data.me.picking_type_id.me[0].me,
          name: data.me.picking_type_id.me[1].me 
        };
      
      if(data.me.peach_id==undefined || !data.me.peach_id.me)
        this.peach_id = {id:0, name:""};
      else
        this.peach_id = { 
          id: data.me.peach_id.me[0].me,
          name: data.me.peach_id.me[1].me 
        };
  
    }
  
  
    //Initialisation des données
    initObjet(){
    
      this.id = 0;
      this.scheduled_date = "";
      this.date_deadline = "";
      this.origin = '';
      this.write_date = '';
      this.create_date = '';
      this.name = "";
      this.partner_id = {id:0, name: ""};
      this.exploitation_id = {id:0, name: ""};
      this.peach_id = {id:0, name: ""};
      this.picking_type_id = {id:0, name: ""};
      this.move_ids_without_package = [];
      this.state = '';
    }
  
  
  }
  