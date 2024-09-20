import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-success-session',
  templateUrl: './success-session.page.html',
  styleUrls: ['./success-session.page.scss'],
})
export class SuccessSessionPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  goToHome(){
    this.nav.navigateRoot(['/app/tabs/programmes'])
  }

  goToProfile(){
    this.nav.navigateRoot(['/app/tabs/account'])
  }

}
