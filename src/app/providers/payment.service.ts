import { Injectable } from '@angular/core';
import { ApplePayEventsEnum, GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';
import { AgentService } from './agent.service';
import { DataService } from './data.service';
import { BehaviorSubject, first, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SubPayment } from 'src/models/sub-payment';
import { PubPayment } from 'src/models/pub-payment';
import { ApiService } from './api.service';

export interface DataIntent{
    paymentIntent: string;
    ephemeralKey: string;
    customer: string;
}

export interface DataPayment{
  user_id: number;
  amount: number;
  currency: string;
  label: string;
  countryCode: string;
  package_count: number,
  payment_status: string,
  package_type: string,
  package_id: number
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private dataResult$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private agentServ: AgentService,
    private http: HttpClient,
    private dataServ: DataService,
    private apiServ: ApiService
  ) {
    this.initialize();
   }

  //This method is used to initialize payment
  async initialize(): Promise<void> {
    Stripe.initialize({
      publishableKey: environment.stripe.public_key,
    });
  }

  //This method is used to call server to get payment Intent data
  httpPost(body: any) {
    return this.http.post<DataIntent>(environment.stripe.api + '', body).pipe(first());
  }

  //This method is used to create payment
  async createPaymentUsingCard(subData: any){
    
    try {
       
      this.handleStripeEvent();
      // Connect to your backend endpoint, and get every key.
      const data$ = this.httpPost(subData);

      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);
      console.log(paymentIntent);

      // prepare PaymentSheet with CreatePaymentSheetOption. 
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: "Communift"
      });

      //Present Sheet and get result
      const result = await Stripe.presentPaymentSheet();
      console.log("Result ", result);

      if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
        this.splitAndJoin(paymentIntent);
      }else if(result.paymentResult === PaymentSheetEventsEnum.Canceled){

      }else{ //Failed

      }

    } catch (error) {
      console.log(error);
    }

  }

  //This method is used to handle payment flow
  async handlePaymentFlow(subData: any){

    // be able to get event of PaymentFlow
    Stripe.addListener(PaymentFlowEventsEnum.Completed, () => {
      console.log('PaymentFlowEventsEnum.Completed');
    });

    const data$ = this.httpPost(subData);

    const {paymentIntent, ephemeralKey, customer} = await lastValueFrom(data$);

    // Prepare PaymentFlow with CreatePaymentFlowOption.
    await Stripe.createPaymentFlow({
      paymentIntentClientSecret: paymentIntent,
      // setupIntentClientSecret: setupIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
      merchantDisplayName: 'Technyks'
    });

    // Present PaymentFlow. **Not completed yet.**
    const presentResult = await Stripe.presentPaymentFlow();
    console.log('presentResult: ', presentResult); // { cardNumber: "●●●● ●●●● ●●●● ****" }

    // Confirm PaymentFlow. Completed.
    const confirmResult = await Stripe.confirmPaymentFlow();
    console.log('confirmResult: ', confirmResult);
    if (confirmResult.paymentResult === PaymentFlowEventsEnum.Completed) {
      // Happy path
      this.splitAndJoin(paymentIntent);
    }
  }

  //This method is used to handle Apple payment
  async applePay(subData: DataPayment) {

    // Check to be able to use Apple Pay on device
    const isAvailable = Stripe.isApplePayAvailable().catch(() => undefined);
    if (isAvailable === undefined) {
      // disable to use Apple Pay
      return;
    }

    // be able to get event of Apple Pay
    Stripe.addListener(ApplePayEventsEnum.Completed, () => {
      console.log('ApplePayEventsEnum.Completed');
    });
    
    const data$ = this.httpPost(subData);
    const { paymentIntent } = await lastValueFrom(data$);

  // Prepare Apple Pay
  await Stripe.createApplePay({
    paymentIntentClientSecret: paymentIntent,
    paymentSummaryItems: [{
      label: subData.label,
      amount: subData.amount
    }],
    merchantIdentifier: 'technyks',
    countryCode: subData.countryCode,
    currency: subData.currency,
  });

  // Present Apple Pay
  const result = await Stripe.presentApplePay();
  if (result.paymentResult === ApplePayEventsEnum.Completed) {
    // Happy path
    this.splitAndJoin(paymentIntent);
  }
}

//Pay using Google Pay
async googlePay(subData: DataPayment) {
  // Check to be able to use Google Pay on device
  const isAvailable = Stripe.isGooglePayAvailable().catch(() => undefined);
  if (isAvailable === undefined) {
    // disable to use Google Pay
    return;
  }

  Stripe.addListener(GooglePayEventsEnum.Completed, () => {
    console.log('GooglePayEventsEnum.Completed');
  });
  
  const data$ = this.httpPost(subData);
  const { paymentIntent } = await lastValueFrom(data$);

  // Prepare Google Pay
  await Stripe.createGooglePay({
    paymentIntentClientSecret: paymentIntent,

    // Web only. Google Pay on Android App doesn't need
    paymentSummaryItems: [{
      label: subData.label,
      amount: subData.amount
    }],
    merchantIdentifier: 'merchant.com.getcapacitor.stripe',
    countryCode: subData.countryCode,
    currency: subData.currency,
  });

  // Present Google Pay
  const result = await Stripe.presentGooglePay();
  if (result.paymentResult === GooglePayEventsEnum.Completed) {
    // Happy path
    this.splitAndJoin(paymentIntent);
  }
}

  //This method is used to split Payment Intent
  splitAndJoin(paymentIntent: any) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log(result);
    this.dataResult$.next(result);
    return result;
  }

  //This method is used to handle stripe events
  handleStripeEvent(){
    
    Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
      console.log('PaymentSheetEventsEnum.Completed');

    });

  }

  //This method is used to create payment
  async createSubOrAdvert(type:string, objPayment: any){
    return this.agentServ.createData(type, objPayment);
  }

  //This method is going to check if any results
  handleResult(){
    return this.dataResult$.asObservable();
  }

  setHandleResult(data: string){
    this.dataResult$.next(data);
  }

  //This method is used to create payment
  async createPaymentForTesting(subData: any){
    console.log("sub data: ", subData);
    try {
      const url = "subscribe-package";
      const result = await this.apiServ.post_private(url, subData);
      console.log("result: ", result);
    } catch (error) {
      console.log(error);
    }

  }

}
