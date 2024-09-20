import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { DataPayment, PaymentService } from 'src/app/providers/payment.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Constants, DAK, Parameters } from 'src/models/contants.models';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { ProgramPayment } from 'src/models/program-payment';
import { Settings } from 'src/models/settings-models';
import { Single } from 'src/models/single';
import { TrainingOrder } from 'src/models/training-order';
import { Exercise } from 'src/models/exercise';
import { ExerciseSchedule } from 'src/models/exercise-schedule';
import { Program } from 'src/models/program';
import { ProgramSchedule } from 'src/models/program-schedule';

@Component({
  selector: 'app-details-program',
  templateUrl: './program-detail.page.html',
  styleUrls: ['./program-detail.page.scss'],
})
export class ProgramDetailPage implements OnInit {

  defaultImg: string = "assets/imgs/bootcamp.png";
  program: Program = new Program();
  levels: { id: string; name: string; checked: boolean; color: string; decalage: number; }[] = [];
  lang: string = "fr";
  current_user: User;
  current_date: string;
  package: Settings | undefined;
  payment_methods: Single[] = [];
  obj_login: any;
  training_order: TrainingOrder;
  params: string | null = null;
  total_price: number = 0;
  purchase_count: number = 0;
  modalOpen : Boolean = false;
  exercises: Exercise[] = [];
  schedules: ExerciseSchedule[] = [];
  isUploaded: boolean = false;
  imgLogo: string;
  program_schedule: ProgramSchedule;
  status_types: Single[] = [];
  selected_status: string = '';
  status_changed: boolean = false;
  customActionSheetOptions = {
  };
  isChanged: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paymentServ: PaymentService,
    private alertServ: AlertService,
    private training: TrainingService,
    private utils: UtilsService,
    private agentServ: AgentService,
    private nav: NavController,
    private dataServ: DataService
  ) {
    this.params = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("params: ", this.params);
    this.levels = DAK.getUserLevels();
    const statusList = DAK.getStatus();
    if(statusList.length > 0) {
      statusList.map((status:any)=>{
        const newStatus =  new Single({id: status.id, name: status.name});
        this.status_types.push(newStatus);
      });
    }
    this.initializeView();
  }

  ngOnInit() {

  }

  //This method initialize view
  async initializeView(){
    if(this.params != null)
    {
      await this.getSessionDetail();
    }
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{

    }
    this.obj_login = await this.dataServ.getUserLogin();
    this.current_date = this.utils.getOnlyDateNow();


    const settings = await this.dataServ.getItem(Constants.SETTINGS);
    this.package = settings ? settings : Parameters;

    const rep = await this.training.getOnlineSettings();
    //console.log(rep);
    if(rep.length){

      this.package = rep ? rep[rep.length-1] : Parameters;
      this.dataServ.setItem(Constants.SETTINGS, this.package);
    }

    const methods = await this.training.getOnlineMethods();
    console.log(methods);
    this.payment_methods = methods;

  }

  handleModal(ev: any){
    this.modalOpen = false;
  }

  async getSessionDetail() {
    this.program_schedule = await this.training.getProgramScheduleDetail(this.params);
    if(this.program_schedule) {
      this.selected_status = this.program_schedule.status;
      const program_data = await this.training.getProgramDetail(this.program_schedule.program_id);
      const schedule_data: string = program_data.schedules;
      this.schedules = await this.getExerciseSchedules(schedule_data);
      const programData = {
        id: program_data.id,
        name: program_data.name,
        coach_id: program_data.coach_id,
        price: program_data.price,
        sporting_level: program_data.sporting_level,
        objective: program_data.objective,
        currency: {id: 1, name: "AUD"},
        description: program_data.description,
        program_image: program_data.program_image,
        start_date: program_data.start_date,
        end_date: program_data.end_date,
        schedules: this.schedules,
        is_active: program_data.is_active,
        is_private: program_data.is_private,
        created_at: program_data.created_at,
        updated_at: program_data.updated_at
      }
      this.program = new Program(programData);
      if(this.program.program_image && this.program.program_image != '')
      {
        this.imgLogo = this.program.program_image;
        this.isUploaded = true;
      }
    }
  }

  async getExerciseSchedules(data: string): Promise<ExerciseSchedule[]>{
    let schedules: ExerciseSchedule[] | PromiseLike<ExerciseSchedule[]> = [];
    const schedules_data = JSON.parse(data);
    for(let i = 0; i < schedules_data.length; i++)
    {
      const one_data = schedules_data[i];
      const selected_exercise = new Exercise(one_data.exercise);
      const scheduleData = {
        exercise: selected_exercise,
        reps: one_data.reps,
        rest: one_data.rest,
        time: one_data.time,
        weight: one_data.weight
      }
      const new_schedule = new ExerciseSchedule(scheduleData);
      schedules.push(new_schedule);
    }
    return schedules;
  }

  //This method is used to set Image
  getImage(obj: Program) {
    const bg_image = obj.program_image ? obj.program_image : this.defaultImg;
    return bg_image;
  }

  onBack() {
    this.nav.back();
  }

  gotoExceriseDetail(schedule: ExerciseSchedule) {
    const stateData = {type: "program", id: this.program.id, schedule: schedule};
    this.router.navigate(['/app/tabs/exercise'], {state: stateData});
  }

  selectStatusType(ev:any) {
    this.selected_status = ev.detail.value;
    this.status_changed = true;
  }

  async updateProgramScheduleStatus() {
    const data = {
      'program_schedule_id' : this.program_schedule.id,
      'status' : this.selected_status
    }
    const result = await this.training.updateProgramScheduleStatus(data);
    console.log("status updated result: ", result);
    if(result) {
      this.alertServ.presentToast("mis à jour avec succès");
    }
  }
}
