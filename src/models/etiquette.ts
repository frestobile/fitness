import { SingleObjet } from "./entity";

/** Cette classe définit l'objet res.partner.category **/
export class Etiquette {

    public id: number;
    public name: string;
    public checked?: boolean;
    public role: string;
  
    constructor(serverJSON?: any) {
  
      if(serverJSON!==undefined)
        this.setData(serverJSON);
      else
        this.createData();
    } 
  
    //Cette fonction permet de générer un tableau
    //d'identifiant
    // private getIdTabs(liste: any[]){
  
    //   let tab = [];
  
    //   for (var i = 0; i < liste.length; i++) {
    //       tab.push(liste[i].me);
    //   }
  
    //   return tab;
    // } 
  
  
    /** Cette fonction permet de définir 
     * les valeurs des champs
     * @param data JSONObject, il s'agit des données JSON du serveur
     *
     ***/
    private setData(data : any){
      
      this.id = data.id;
  
      if(!data.name || data.name==undefined)
        this.name = "";
      else
        this.name = data.name;
      
  
      if(data.role==undefined || !data.role)
        this.role = '';
      else
        this.role = data.role;
      
    }
    
  
    //On créé un objet de type Partner
    private createData(){
  
      this.id = 0;
      this.name = "";
      this.role = "client";
      
    }
  
  }
  