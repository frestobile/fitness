import { SingleObjet } from "./entity";
import { Exercise } from "./exercise";

/** Cette classe définit l'objet Training training.session.exercise.post **/
export class ExerciseSchedule {
  public exercise: Exercise;
  public reps: number;
  public rest: number;
  public time: number;
  public weight: number;

  constructor(serverJSON: any) {
      this.setData(serverJSON);
  } 


  /** Cette fonction permet de définir 
   * les valeurs des champs
   * @param data JSONObject, il s'agit des données JSON du serveur
   *
   ***/
  private setData(data : any){
    this.exercise = data.exercise;
    if(data.reps === undefined || !data.reps){
      this.reps = 0;
    }else{
      this.reps = data.reps;
    }

    if(data.rest === undefined || !data.rest){
      this.rest = 0;
    }else{
      this.rest = data.rest;
    }

    if(data.time === undefined || !data.time){
      this.time = 0;
    }else{
      this.time = data.time;
    }
    
    if(data.weight === undefined || !data.weight){
      this.weight = 0;
    }else{
      this.weight = data.weight;
    }
  }

}
