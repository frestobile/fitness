import { SingleObjet } from "./entity";

/** Cette classe définit l'objet avocat (mail.followers) **/
export class Abonne {

 
  public id:number;
  public name:string;
  public is_active:boolean;
  public partner_id:SingleObjet;
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

    if(data.me.name==undefined || !data.me.name.me)
      this.name = "";
    else
      this.name = data.me.name.me;


    if(data.me.is_active==undefined || !data.me.is_active.me)
      this.is_active = false; 
    else
      this.is_active = data.me.is_active.me;


    if(data.me.res_id===undefined || !data.me.res_id.me)
        this.res_id = 0;
    else
        this.res_id = data.me.res_id.me;

   
    if(data.me.partner_id==undefined || !data.me.partner_id.me)
        this.partner_id = {id:0, name: ""};
    else
        this.partner_id = { 
          id: data.me.partner_id.me[0].me,
          name: data.me.partner_id.me[1].me 
        };

    
    if(!data.me.res_model.me || data.me.res_model.me===undefined)
      this.res_model = "";
    else
      this.res_model = data.me.res_model.me;

  }


  //On créé un objet de type Partner
  private createEmploye(){
    
    this.id = 0;
    this.name = "";
    this.partner_id= { id: 0, name: '' };
    this.is_active=false;
    this.res_id=0;
    this.res_model = "";
    
   // this.image="";
  }

}
