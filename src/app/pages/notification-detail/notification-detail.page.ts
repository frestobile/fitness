import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Constants } from 'src/models/contants.models';
import { DataService } from 'src/app/providers/data.service';
import { UserService } from 'src/app/providers/user.service';
import { User } from 'src/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.page.html',
  styleUrls: ['./notification-detail.page.scss'],
})
export class NotificationDetailPage implements OnInit {
  lang: any;
  current_user: User;
  id: any;
  detail: any;
  title: any;
  content: any;
  package_id: any;
  constructor(
    private nav: NavController,
    private dataServ: DataService,
    private userServ: UserService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.initializeView();
  }

  async initializeView() {
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }
    if(this.id && parseInt(this.id) > 0) {
      this.detail = await this.userServ.getNotificationDetail(parseInt(this.id));
      if(this.detail) {
        switch(this.detail.notifiable_type) {
          case 'session':
            this.title = "Séances";
            break;
          case 'program':
            this.title = "Programmes";
            break;
        }
        this.content = this.detail.content;
        this.package_id = this.detail.notifiable_id;
      }
    }
  }

  onBack() {
    this.nav.back();
  }

  goToPackageDetail(){
    switch(this.detail.notifiable_type) {
      case 'session':
        this.nav.navigateRoot(['/app/tabs/session-detail/'+this.package_id]);
        break;
      case 'program':
        this.nav.navigateRoot(['/app/tabs/program-detail/'+this.package_id]);
        break;
    }
  }

}
