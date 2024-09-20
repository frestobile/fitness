import { SingleObjet } from "./entity";

/** Cette classe définit l'objet avocat (mail.wizard.invite) **/
export class MailWizard {

 
  public id:number;
  public display_name:string;
  public send_mail:boolean;
  public message:string;
  public partner_ids: number[];
  public res_id:number;
  public res_model:string;
    
  
  constructor(serverJSON?: any) {

    if(serverJSON!=undefined)
      this.setEmployee(serverJSON);
    else
      this.createEmploye();
    
  } 

  hydrate(entity: Record<string | number,any>):void {

      for(const key of Object.keys(entity)){

          if(Reflect.has(this,key)){
            if(typeof entity[key].me === "string" || typeof entity[key].me === "number"  || typeof entity[key].me === "boolean"){
              Reflect.set(this, key, entity[key]);
            }else if( entity[key].me[1] && typeof entity[key].me[1].me === "string"){
              const toInsert = {id: entity[key].me[0].me, name: entity[key].me[1].me }
              Reflect.set(this, key, toInsert);
            }else{
              const tabs = this.getIdTabs(entity[key].me);
              Reflect.set(this, key, tabs);
            }
          } 
      }
  }
   

    //Permet de définir la liste
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
  private setEmployee(data : any){
    
    this.id = data.me.id.me;

    if(data.me.display_name==undefined || !data.me.display_name.me)
      this.display_name = "";
    else
      this.display_name = data.me.display_name.me;


    if(data.me.send_mail==undefined || !data.me.send_mail.me)
      this.send_mail = false; 
    else
      this.send_mail = data.me.send_mail.me;


    if(data.me.res_id===undefined || !data.me.res_id.me)
        this.res_id = 0;
    else
        this.res_id = data.me.res_id.me;

   
    if(data.me.message==undefined || !data.me.message.me)
        this.message = "";
    else
        this.message = data.me.message.me;
    
    if(!data.me.res_model.me || data.me.res_model.me===undefined)
      this.res_model = "";
    else
      this.res_model = data.me.res_model.me;

    if(data.me.partner_ids==undefined || !data.me.partner_ids.me || data.me.partner_ids.me.length==0)
      this.partner_ids = [];
    else
      this.partner_ids = this.getIdTabs(data.me.partner_ids.me);

  }

  //On créé un objet de type Partner
  private createEmploye(){
    
    this.id = 0;
    this.display_name = "";
    this.message = "";
    this.send_mail=false;
    this.res_id=0;
    this.res_model = "";
    this.partner_ids = [];
    
   // this.image="";
  }

}
