import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { ItemProfileComponent } from 'src/app/components/item-profile/item-profile.component';
import { AgentService } from 'src/app/providers/agent.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { DataService } from 'src/app/providers/data.service';
// import { OdooService } from 'src/app/providers/odoo.service';
import { UserService } from 'src/app/providers/user.service';
import { environment } from 'src/environments/environment';
import { Constants, DAK } from 'src/models/contants.models';

// import { Client } from 'src/models/client';
import { User } from 'src/models/user';


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
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  // @ViewChild(IonModal) modal: IonModal;
  // no_authenticated: boolean = true;

  slideOptions: any = {
    // spaceBetween: 8,
    slidesPerView: 1.90,
  };
  slideOptionsTwo: any = {
    // spaceBetween: 8,
    slidesPerView: 3,
  };

  slideOptionsThree: any = {
    // spaceBetween: 8,
    slidesPerView: 1.60,
  };

  dataSource: object;

  current_user: User | any;
  defaultImg: string = "assets/imgs/bg_coach.png";

  private txtLang: any;
  // menus: any[] = [];
  // isModalOpen: boolean;
  entrainements: any[] = [1, 2, 3, 4];
  lang: any;
  terms: string = "";
  policies: string = "";
  is_pending: boolean;
  last_update: string;
  progress: number = 0;
  total: number = environment.tab_models.length;
  bg_image: string;
  levels: { id: string; name: string; checked: boolean; color: string; decalage: number; }[] = [];
  current_level: any;
  public barOptions: Partial<ChartOptions>;


  constructor(
    private authServ: AuthService,
    private router: Router,
    private translate: TranslateService,
    public alertCtrl: AlertController,
    private userServ: UserService,
    private agentServ: AgentService,
    private dataServ: DataService,
    // private odooServ: OdooService
  ) {
    this.barChart();
  }

  barChart() {
    this.barOptions = {
      chart: {
        type: 'bar',
        height: 120,
        width: '100%',
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: '',
          data: [12, 16, 11, 10, 9, 5, 3,],
          color: '#007FFF',
        }
      ],
      labels: ['Lun','Mar', 'Mer', 'Jeu', 'Ven','Sam', 'Dim'],
      grid: {
        borderColor: '#9ECEFE',
        padding: {
          right: 0,
          left: 0,
        },
      },
      xaxis: {
        labels: {
          show: true,
          style : {
            fontSize: '9px',
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
            colors: '#9ECEFE',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      plotOptions:{
        bar : {
          columnWidth:10,
          borderRadius: 5,
          borderRadiusApplication: 'end',
          isFunnel3d: true,
        }
      },
      dataLabels:{
        enabled: false,
      }
    }
  }

  ngOnInit() {

    //Retrieve message lang

    this.levels = DAK.getUserLevels();
    this.translate.get("account_p").subscribe(rep => {
      this.txtLang = rep;
      // this.menus = DAK.getMenuRequestInfos(rep);
    });

    // this.odooServ.getSynchroStatus().subscribe(rep=>{
    //   this.is_pending = rep;
    // });

    // this.odooServ.getProgressStatus().subscribe((progress: number)=>{
    //   console.log(progress);
    //   this.progress =  ((this.total - progress)/this.total);
    // });

  }

  ionViewDidEnter() {

    this.initializeView();
  }

  //This method is used to authenticate user
  async initializeView() {
    const temp_p = localStorage.getItem("temp_p");
    let current_user: any = temp_p != null ? JSON.parse(temp_p) : undefined;
    console.log(current_user);
    if(current_user==undefined)
      current_user = await this.dataServ.getUserInfo();
    //console.log("user 0001");
    localStorage.removeItem("tem_p");
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);

    if (current_user) { 
      this.current_user = current_user;
      console.log(this.current_user);
      this.current_level = this.levels.find(elt => elt.id == this.current_user.sporting_level);
      const default_image: string = this.current_user.supplier_rank > 0 ? 'assets/imgs/bg_coach.jpg' : 'assets/imgs/bg_customer.jpg';
      this.bg_image = current_user.image_128 ? Constants.PREFIX_BASE64 + current_user.image_128 : default_image;
      this.getDataOnline();
      // console.log(this.current_user);
    }

  }

  //This method is used to get data online
  async getDataOnline() {
    const filter = "?id="+this.current_user.id;
    try {
      const rep = await this.userServ.getUserById(this.current_user.id);
      this.current_user = rep;
      //this.dataServ.setUserInfo(rep[0]);

    } catch (error) {

    }

  }


  //Go to contact page
  async goToHelp() {
    this.router.navigate(['/help']);
    // await Browser.open({ url: environment.contact_url, toolbarColor:environment.browser_color });
  }


  //This method is used to synchronize data with Server
  handleSynchronization() {

    // this.odooServ.syncListObjets();
  }

  //This method is used to logout User
  async logOut() {


    const alert = await this.alertCtrl.create({
      header: 'DOMSE',
      message: "Voulez-vous vous déconnecter ?",
      buttons: [
        {
          text: "NON",
          role: 'cancel'
        },
        {
          text: "OUI",
          handler: (elt) => {
            this.authServ.logOut();
          }
        },
      ]
    });

    await alert.present();
  }

  //This method is used to go historic view
  gotoHistory() {
    this.router.navigate(['app/tabs/account/settings']);
  }

  //This method is used to navigate trough page
  goToPage(route: string) {
    this.router.navigate([route]);
  }

  //This method is used to handle video action
  showDetailsVideo(ev: any){

  }

  showDetailsImage(ev: any){

  }

}
