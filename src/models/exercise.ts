import { SingleObjet } from "./entity";

/** Cette classe définit l'objet Training training.session.exercise.line **/
export class Exercise {

  public id: number;
  public title: string;
  public instruction: string;
  public tips: string;
  public video_type: string;
  public video_url: string;
  public bodyparts: string[];
  public image: string;
  public sport: string;
  public equipment: string;

  constructor(resData?: any) {
    if(resData!=undefined){
      this.setData(resData);
    }else
      this.createData();
    
  } 

  hydrate(entity: Record<string | number,any>):void {

    for(const key of Object.keys(entity)){
        
        // if(Reflect.has(this, key)){
          // console.log("I'm in");
          if(typeof entity[key].me === "string" || typeof entity[key].me === "number"  || typeof entity[key].me === "boolean"){
            Reflect.set(this, key, entity[key].me);
          }else if( entity[key].me[1] && typeof entity[key].me[1].me === "string"){
            const toInsert = {id: entity[key].me[0].me, name: entity[key].me[1].me }
            Reflect.set(this, key, toInsert);
          }else if(entity[key].me===false){
            console.log(Reflect.getOwnPropertyDescriptor(this, key));
          }else{
            const tabs = this.getIdTabs(entity[key].me);
            Reflect.set(this, key, tabs);
          }
        // } 
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
  private setData(data : any){
    this.id = data.id;
    if(data.title === undefined || !data.title){
      this.title = "";
    }else{
      this.title = data.title;
    }

    if(data.instruction === undefined || !data.instruction){
      this.instruction = "";
    }else{
      this.instruction = data.instruction;
    }

    if(data.tips === undefined || !data.tips){
      this.tips = "";
    }else{
      this.tips = data.tips;
    }

    if(data.video_type === undefined || !data.video_type){
      this.video_type = "";
    }else{
      this.video_type = data.video_type;
    }

    if(data.video_url === undefined || !data.video_url){
      this.video_url = "";
    }else{
      this.video_url = data.video_url;
    }

    if(data.bodyparts === undefined || !data.bodyparts){
      this.bodyparts = [];
    }else{
      this.bodyparts = data.bodyparts;
    }

    if(data.exercise_image === undefined || !data.exercise_image){
      this.image = "";
    }else{
      this.image = data.exercise_image;
    }
    
    if(data.sport === undefined || !data.sport){
      this.sport = "";
    }else{
      this.sport = data.sport;
    }

    if(data.equipment === undefined || !data.equipment){
      this.equipment = "";
    }else{
      this.equipment = data.equipment;
    }
  }
  
  private createData(){
    this.id = 0;
    this.title = "";
    this.instruction = "";
    this.tips = "";
    this.video_type = "";
    this.video_url = "";
    this.bodyparts = [];
    this.image = "";
    this.sport = "";
    this.equipment = "";
  }

}
