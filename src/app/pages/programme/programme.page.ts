import { SessionSchedule } from 'src/models/session-schedule';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Constants, DAK } from 'src/models/contants.models';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { DataService } from 'src/app/providers/data.service';
import { User } from 'src/models/user';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Session } from 'src/models/session';
import { SessionScheduleLine } from 'src/models/session-schedule-line';
import { ProgramScheduleLine } from 'src/models/program-schedule-line';
import { ProgramSchedule } from 'src/models/program-schedule';


export type ChartOptions = {
  chart?: ApexChart;
  series?: ApexAxisChartSeries | any[];
  stroke?: ApexStroke;
  markers?: ApexMarkers;
  grid?: ApexGrid;
  tooltip?: ApexTooltip;
  colors?: any[];
  labels?: any[];
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  title?: ApexTitleSubtitle;
  subtitle?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  legend?: ApexLegend;
  fill?: ApexFill;
  plotOptions?: ApexPlotOptions;
};
@Component({
  selector: 'app-programme',
  templateUrl: './programme.page.html',
  styleUrls: ['./programme.page.scss'],
})
export class ProgrammePage implements OnInit {


  @ViewChild('popover') popover: any;
  public barOptions: Partial<ChartOptions>;
  selected_day: string;
  days: { id: number; name: string; fr_name: string; en_name: string; bg: string; checked: boolean; }[] = [];
  isPop: boolean = false;
  menu_options: { id: string; name: string; usage: string; active: boolean; }[] = [];
  lang: any;
  current_user: User;
  current_date: string;
  session_schedule_lines: SessionScheduleLine[] = [];
  private sessionSchedulesOfWeek: SessionScheduleLine[] = [];

  program_schedule_lines: ProgramScheduleLine[] = [];
  private programSchedulesOfWeek: ProgramScheduleLine[] = [];

  is_pending: boolean = true;
  bg_card_green: string = "assets/imgs/bg-card-form-green.png";
  bg_card_blue: string = "assets/imgs/bg-card-form-blue.png";

  constructor(
    private datePipe: DatePipe,
    private trainingServ: TrainingService,
    private utils: UtilsService,
    private dataServ: DataService,
    private router: Router,
  ) {
    this.barChart();
  }

  ngOnInit() {
    this.menu_options = DAK.getProgramOptions();
    this.initializeView();
  }

  //This method open popup window
  onShowOption(e: any){
    this.popover.event = e;
    this.isPop = true;
  }

  //initialize view
  async initializeView() {
    // this.handleAuthFirebase();
    this.days = DAK.getDay();

    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }

    this.current_date = this.utils.getOnlyDateNow();
    if(this.current_user.role == "coach")
      this.menu_options = DAK.getProgramCoachOptions();

    this.getSessionsAvailable();
    this.getProgramsAvailable();
  }

  //This method is used to get session availability
  async getSessionsAvailable() {
    const day = Date.now();
    const day_value = this.datePipe.transform(day, "EEEE");
    this.is_pending = true;
    try {
      const rep = await this.trainingServ.getTrainingSessionSchedules(this.current_user.id);
      if(rep.length!=0){
        this.sessionSchedulesOfWeek = this.buildSessionsCurrentWeek(rep);
        this.selectRealDay(day_value, day);
      }
      this.is_pending = false;
    } catch (error) {
      this.is_pending = false;

    }
  }

  async getProgramsAvailable() {
    const day = Date.now();
    const day_value = this.datePipe.transform(day, "EEEE");
    this.is_pending = true;
    try {
      const rep = await this.trainingServ.getTrainingProgramSchedules(this.current_user.id);
      if(rep.length!=0){
        this.programSchedulesOfWeek = this.buildProgramsCurrentWeek(rep);
        this.selectRealDay(day_value, day);
      }
      this.is_pending = false;

    } catch (error) {
      this.is_pending = false;
    }
  }

  //This method is used to build session current week
  private buildSessionsCurrentWeek(sessionScheduleLines: SessionScheduleLine[]): any{
    let resutls: SessionScheduleLine[] = [];
    for (let k = 0; k < sessionScheduleLines.length; k++) {
      const element = sessionScheduleLines[k];
      if(this.utils.isCurrentWeek(element.session_schedule.play_date)){
        resutls.push(element);
      }
    }
    return resutls;
  }

  private buildProgramsCurrentWeek(programScheduleLines: ProgramScheduleLine[]): any{
    let resutls: ProgramScheduleLine[] = [];
    for (let k = 0; k < programScheduleLines.length; k++) {
      const element = programScheduleLines[k];
      if(this.utils.isCurrentWeek(element.program_schedule.play_date)){
        resutls.push(element);
      }
    }
    return resutls;
  }

  selectRealDay(day_value: any, day: any) {
    console.log(day);
    if (day_value == "Dimanche" || day_value == "Sunday") {
      this.selectDays(this.days, 0);
    } else if (day_value == "Lundi" || day_value == "Monday") {
      this.selectDays(this.days, 1);
    } else if (day_value == "Mardi" || day_value == "Tuesday") {
      this.selectDays(this.days, 2);
    } else if (day_value == "Mercredi" || day_value == "Wednesday") {
      this.selectDays(this.days, 3);
    } else if (day_value == "Jeudi" || day_value == "Thursday") {
      this.selectDays(this.days, 4);
    } else if (day_value == "Vendredi" || day_value == "Friday") {
      this.selectDays(this.days, 5);
    } else {
      this.selectDays(this.days, 6);
    }
  }


  //This method is used to select gender
  selectDays(obj: any, idx: number) {
    this.session_schedule_lines = this.sessionSchedulesOfWeek.filter(elt => new Date(elt.session_schedule.play_date).getDay() == idx);
    this.program_schedule_lines = this.programSchedulesOfWeek.filter(elt => new Date(elt.program_schedule.play_date).getDay() == idx);
    this.days[idx].checked = !obj.checked;
    this.selected_day = obj.fr_name;
    console.log(this.selected_day);
    for (let k = 0; k < this.days.length; k++)
      if (k != idx) this.days[k].checked = false;
  }

  barChart() {
    this.barOptions = {
      chart: {
        type: 'bar',
        height: 120,
        width: '100%',
        offsetX:2,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: '',
          data: [9, 6, 11, 8, 16],
          color: '#BDD0FB',
        },
        {
          name: '',
          data: [12, 16, 11, 10, 9],
          color: '#007FFF',
        }
      ],
      labels: ['7:00', '11:00', '15:00', '19:00', '23:00'],
      grid: {
        borderColor: '#FFFFFF',
        padding: {
          right: 0,
          left: 0,
        },
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            fontFamily: 'Urbanist-Bold'
          }
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
          style: {
            colors: '#FFFFFF',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: 10,
          borderRadius: 5,
          borderRadiusApplication: 'end',
          isFunnel3d: true,
        }
      },
      dataLabels: {
        enabled: false,
      },
      legend :{
        show: false,
      }
    }
  }

  goToPage(route: string){

    this.router.navigate(['app/tabs/'+route]);
    this.popover.dismiss();
  }

  //This method is used to show session
  showSession(obj: SessionSchedule){
    console.log("object detail: ", obj);
    this.router.navigate(['app/tabs/session-detail/'+obj.id]);
  }

  showProgram(obj: ProgramSchedule){
    this.router.navigate(['app/tabs/program-detail/'+obj.id]);
  }
}
