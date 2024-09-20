import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/models/contants.models';
import { User } from 'src/models/user';
import { DataService } from 'src/app/providers/data.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  defaultImg: string = "assets/imgs/bg_coach.png";
  lang: any;
  current_user: User;
  package_type: string;
  notification_list: any;
  notification_title: string;

  constructor(
    private router : Router,
    private dataServ: DataService,
    private userServ: UserService,
    private nav: NavController,
  ) {
    this.package_type = this.router.getCurrentNavigation()?.extras?.state?.['notification_type'];
    if(this.package_type == 'session') {
      this.notification_title = "Séances";
    } else if(this.package_type == 'program') {
      this.notification_title = "Programmes";
    }
    this.initializeView();
  }

  ngOnInit() {

  }

  gotoDetailPage(noti_id: number) {
    this.router.navigate(['app/tabs/notification-detail/'+noti_id]);
  }

  async initializeView() {
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }
    this.notification_list = await this.userServ.getCustomNotifications(this.package_type);
  }

  onBack() {
    this.nav.back();
  }
}
