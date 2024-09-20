import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.page.html',
  styleUrls: ['./pay-form.page.scss'],
})
export class PayFormPage implements OnInit {

  payType: string;
  cardNumber : string;
  expiredDate:string;
  name:string;
  uriImage:string;
  color:string;
  body_image:string;
  footerImage:string;
  email: string;

  constructor(private router: Router, public route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.payType = this.router.getCurrentNavigation()?.extras?.state?.['payType'];
        this.cardNumber = this.router.getCurrentNavigation()?.extras?.state?.['cardNumber'];
        this.expiredDate = this.router.getCurrentNavigation()?.extras?.state?.['expiredDate'];
        this.name = this.router.getCurrentNavigation()?.extras?.state?.['name'];
        this.uriImage = this.router.getCurrentNavigation()?.extras?.state?.['uriImage'];
        this.color = this.router.getCurrentNavigation()?.extras?.state?.['color'];
        this.body_image = this.router.getCurrentNavigation()?.extras?.state?.['body_image'];
        this.footerImage = this.router.getCurrentNavigation()?.extras?.state?.['footerImage'];
        this.email = "steveskamdem6.gmail.com"
      }
    });
  }

  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
    ],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

}
