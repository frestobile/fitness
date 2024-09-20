import { Session } from "./session";
import { SessionSchedule } from "./session-schedule";

/** Cette classe définit l'objet Training training.session.exercise.post **/
export class SessionScheduleLine {
  public session_schedule: SessionSchedule;
  public session: Session;

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
    if(data.session_schedule === undefined || !data.session_schedule){
      this.session_schedule = new SessionSchedule();
    }else{
      this.session_schedule = data.session_schedule;
    }

    if(data.session === undefined || !data.session) {
      this.session = new Session();
    }else{
      this.session = data.session;
    }
  }

  //On créé un objet de type Partner
  private createData(){
    this.session_schedule = new SessionSchedule();
    this.session = new Session();
  }

}
