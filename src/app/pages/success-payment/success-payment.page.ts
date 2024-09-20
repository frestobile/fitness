import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.page.html',
  styleUrls: ['./success-payment.page.scss'],
})
export class SuccessPaymentPage implements OnInit {

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
