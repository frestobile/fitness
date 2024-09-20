/** Cette classe définit l'objet category (pour la gestion du modele product.category) **/

export class Category {

  public id: number;
  public name: string;
  public parent_id: { id: number; name: string; }; 
  public child_id: number[];
  
  
  /*
   * @param type string, correspond au type de données à insérer
   * @param serverJSON JSONObject, il s'agit des données qui proviennent du server ou 
   *                              d'une autre soruce
   *
   */
  constructor(serverJSON: any) {
    
    this.setCategory(serverJSON);
  } 

  //Permet de définir la liste
  private getIdTabs(liste:any[]){

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
  setCategory(data : any){
    
    this.id = data.me.id.me;
    
    if(!data.me.name.me || data.me.name==undefined)
      this.name = "";
    else
      this.name = data.me.name.me;
    
    // if(!data.me.display_name.me || data.me.display_name==undefined)
    //   this.display_name = "";
    // else
    //   this.display_name = data.me.display_name.me;
    
    if (data.me.parent_id == undefined || !data.me.parent_id.me)
      this.parent_id = { id: 0, name: '' };
    else
      this.parent_id = { id: data.me.parent_id.me[0].me, name: data.me.parent_id.me[1].me };

    if(data.me.child_id==undefined || !data.me.child_id.me || data.me.child_id.me.length==0)
      this.child_id = [];
    else
      this.child_id = this.getIdTabs(data.me.child_id.me);
    
  }

  //Initialisation des données
  initObjet(){
    this.id = 0;
    this.name = "";
    this.parent_id = {id: 0, name: ""};
    this.child_id = [];
  }


}
