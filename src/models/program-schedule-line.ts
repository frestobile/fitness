import { Program } from './program';
import { ProgramSchedule } from './program-schedule';

/** Cette classe définit l'objet Training training.session.exercise.post **/
export class ProgramScheduleLine {
  public program_schedule: ProgramSchedule;
  public program: Program;

  constructor(serverData?: any) {
    if(serverData!=undefined){
      this.setData(serverData);
    }else
      this.createData();
  }

  /** Cette fonction permet de définir
   * les valeurs des champs
   * @param data JSONObject, il s'agit des données JSON du serveur
   *
   ***/
  private setData(data : any){
    if(data.program_schedule === undefined || !data.program_schedule){
      this.program_schedule = new ProgramSchedule();
    }else{
      this.program_schedule = data.program_schedule;
    }

    if(data.program === undefined || !data.program) {
      this.program = new Program();
    }else{
      this.program = data.program;
    }
  }

  //On créé un objet de type Partner
  private createData(){
    this.program_schedule = new ProgramSchedule();
    this.program = new Program();
  }
}
