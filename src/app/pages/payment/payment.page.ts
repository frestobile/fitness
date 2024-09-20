import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {


  constructor(
    private router: Router,) { }

  ngOnInit() {
  }

  goTo(route: string, payType: string, cardNumber: string, expiredDate: string, name: string, uriImage: string, color: string, body_image: string, footerImage?: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        payType: payType,
        cardNumber: cardNumber,
        expiredDate: expiredDate,
        name: name,
        uriImage: uriImage,
        color: color,
        body_image: body_image,
        footerImage: footerImage
      }
    };
    this.router.navigate([route], navigationExtras);
  }
}
