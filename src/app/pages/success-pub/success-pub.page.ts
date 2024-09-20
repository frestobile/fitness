import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-success-pub',
  templateUrl: './success-pub.page.html',
  styleUrls: ['./success-pub.page.scss'],
})
export class SuccessPubPage implements OnInit {

  constructor(private nav: NavController ) { }

  ngOnInit() {
  }

  goToHome(){
    this.nav.navigateRoot(['/app/tabs/home'])
  }

  goToProfile(){
    this.nav.navigateRoot(['/app/tabs/account'])
  }

}
