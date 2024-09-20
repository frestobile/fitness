/** Cette classe définit l'objet ayant 2 attributs **/

export class Single {

    public id: number;
    public name: string;
    // public display_name;
    
    /*
     * @param type string, correspond au type de données à insérer
     * @param serverJSON JSONObject, il s'agit des données qui proviennent du server ou 
     *                              d'une autre soruce
     *
     */
    constructor(serverJSON?: any) {
      if(serverJSON!==undefined)
        this.setCategory(serverJSON);
      else
        this.initObjet();
    } 
  
  
    /**
     * Define a method
     * @param data any
     */
    private setCategory(data : any){
      
      this.id = data.id;
      
      if(data.name==undefined || !data.name)
        this.name = "";
      else
        this.name = data.name;
      
    }
  
    //Initialisation des données
    private initObjet(){
      this.id = 0;
      this.name = "";
    //   this.display_name = "";
    }
  
  
  }
  