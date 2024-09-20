import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.page.html',
  styleUrls: ['./success-order.page.scss'],
})
export class SuccessOrderPage implements OnInit {

  constructor(
    private nav: NavController
  ) { }

  ngOnInit() {
  }

  goToHome(){
    this.nav.navigateRoot(['/app/tabs/home'])
  }

  goToProfile(){
    this.nav.navigateRoot(['/app/tabs/account'])
  }

}
