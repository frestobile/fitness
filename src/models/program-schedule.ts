/** Cette classe définit l'objet Training training.session.exercise.post **/
export class ProgramSchedule {
  public id: number;
  public client_id: number;
  public program_id: number;
  public play_date: string;
  public start_time: string;
  public end_time: string;
  public status: string;

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
    this.id = data.id;
    if(data.client_id === undefined || !data.client_id){
      this.client_id = 0;
    }else{
      this.client_id = data.client_id;
    }

    if(data.program_id === undefined || !data.program_id){
      this.program_id = 0;
    }else{
      this.program_id = data.program_id;
    }

    if(data.play_date === undefined || !data.play_date){
      this.play_date = '';
    }else{
      this.play_date = data.play_date;
    }

    if(data.start_time === undefined || !data.start_time){
      this.start_time = '';
    }else{
      this.start_time = data.start_time;
    }

    if(data.end_time === undefined || !data.end_time){
      this.end_time = '';
    }else{
      this.end_time = data.end_time;
    }

    if(data.status === undefined || !data.status){
      this.status = '';
    }else{
      this.status = data.status;
    }
  }

  //On créé un objet de type Partner
  private createData(){
    this.id = 0;
    this.client_id = 0;
    this.program_id = 0;
    this.play_date = '';
    this.start_time = '';
    this.end_time = '';
    this.status = '';
  }

}
