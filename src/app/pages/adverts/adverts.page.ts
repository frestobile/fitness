import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { DataPayment, PaymentService } from 'src/app/providers/payment.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Constants, Parameters } from 'src/models/contants.models';
import { EmptyMessage } from 'src/models/iuser';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user'; 
import { TrainingPub } from 'src/models/pub';
import { PubPayment } from 'src/models/pub-payment';
import { Settings } from 'src/models/settings-models';
import { Single } from 'src/models/single';

import { ads } from 'src/data/ads';

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.page.html',
  styleUrls: ['./adverts.page.scss'],
})
export class AdvertsPage implements OnInit {
  
  @ViewChild('modal') modal: IonModal;

  lang: string;
  current_user: User;
  is_pending: boolean = true;
  pubs: TrainingPub[] = [];
  errorMessage: EmptyMessage;
  is_opened: boolean = false;
  isUploaded: boolean = false;
  obj_pub: TrainingPub = new TrainingPub();
  current_date: string;
  package: Settings | undefined;
  obj_login: any;
  payment_methods: Single[] = [];
  is_supplier: boolean;

  constructor(
    private training: TrainingService,
    private utils: UtilsService,
    private agentServ: AgentService,
    private alertServ: AlertService,
    private nav: NavController,
    private paymentServ: PaymentService,
    private dataServ: DataService
  ) { }

  ngOnInit() {

    this.errorMessage = {text: "Vous n'avez pas de publicité. Touchez le bouton + pour faire du sponsoring", txtButton: "Réessayez" };
    this.initializeView();

    this.paymentServ.handleResult().subscribe(async (rep)=>{
      if(rep!=""){
        this.alertServ.loadingPresent("Validation du paiement en cours...");
        this.paymentServ.setHandleResult("");
        try {
          await this.onPub(rep);
          this.alertServ.loadingDismiss();
          this.modal.dismiss();
          this.nav.navigateRoot(['success-pub']);
        } catch (error) {
          //this.nav.navigateRoot(['success-payment']);
          this.alertServ.loadingDismiss(); 
          this.alertServ.errorToast("Une erreur est survenue. Veuillez contacter l'administrateur ou réessayer ultérieurement");
        }

      }
    });
  }

  //This method is used to initialize view
  async initializeView(){

    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    } else {
      
    }
    
    this.obj_login = await this.dataServ.getUserLogin();
    this.current_date = this.utils.getOnlyDateNow();
    this.is_supplier = this.current_user.role == "coach";
    
    const settings = await this.dataServ.getItem(Constants.SETTINGS);
    this.package = settings ? settings : Parameters;
    
    // const rep = await this.training.getOnlineSettings();
    // //console.log(rep);
    // if(rep.length){

    //   this.package = rep ? rep[rep.length-1] : Parameters;
    //   this.dataServ.setItem(Constants.SETTINGS, this.package);
    // }else{

    // }
    
    this.getAdverts();

    // const methods = await this.training.getOnlineMethods();
    // console.log(methods);
    this.payment_methods = [];
    const methods_data = [{id:1, name: "paypal"}, {id: 2, name: "payoneer"}];
    for(let k = 0; k < methods_data.length; k++)
    {
      const ms = new Single(methods_data[k]);
      this.payment_methods.push(ms);
    }
  }

  //This method is used to get adverts published by a coach
  async getAdverts(){

    this.is_pending = true;
    try {
      // const filter = {partner_id: ["=", this.current_user.id] };
      // const rep = await this.training.getOnlineLListOfPub(filter);
      // console.log(rep);
      this.pubs = [];
      for(let i = 0; i < ads.length; i++) {
        const ad = new TrainingPub(ads[i]);
        this.pubs.push(ad);
      }
      
      this.is_pending = false;
    } catch (error) {
      this.is_pending = false;
    }
  }

  //This method is used to go to advert
  goToAdvert(ev: TrainingPub){
    console.log(ev);
  }

  //This method is used to display form to submit advert
  postAdvert(){
    this.is_opened = true;
  }

  //This method is used to handle date changed
  handleDateChanged(ev: any){
    this.obj_pub.duration_days = this.utils.computeDaysBetweenTwoDates(this.obj_pub.date, this.obj_pub.date_start);
    this.obj_pub.amount = this.package ? this.package.cost_daily_pub * this.obj_pub.duration_days : 0;
  }

  //This method is used to handle button when list is empty 
  handleRetry(ev: any){
    this.getAdverts();
  }

  //This method is handle closing form advertising
  handleAdvert(ev: any){
    this.is_opened = false;
  }

  //Close modal
  onClose(){
    this.modal.dismiss();
  }

  //This method is used to handle payment
  async handlePayment(){

    const subData : DataPayment = {
      user_id: this.current_user.id,
      amount: this.obj_pub.amount * 100,
      currency: this.current_user.currency_id.name,
      label: "Publicité",
      countryCode: "AU",
      package_count: 0,
      payment_status: 'pending',
      package_type: 'session',
      package_id:  0
    };

    await this.paymentServ.createPaymentUsingCard(subData);
  }

  //This method is used to create pub
  async onPub(ref_payment: string){

    this.obj_pub.partner_id.id = this.current_user.id;
    this.obj_pub.user_id.id = this.obj_login.uid;
    this.obj_pub.state = "pending";

    if(this.obj_pub.date_start=="" || this.obj_pub.date==""){
      this.alertServ.errorToast("Veuillez renseigner les dates");
      return;
    }

    try {
      const rep = await this.paymentServ.createSubOrAdvert("program_pub", this.obj_pub);
      console.log(rep);
      this.obj_pub = new TrainingPub(rep);

      //Save Payment
      let objPayment: PubPayment = new PubPayment();
      objPayment.amount = this.obj_pub.amount;
      objPayment.pub_id.id = this.obj_pub.id;
      objPayment.payment_date = this.utils.getOnlyDateNow();
      objPayment.currency_id = this.obj_pub.currency_id;
      objPayment.communication = this.obj_pub.name;
      objPayment = this.buildPayment(objPayment, ref_payment);

      const payment = await this.paymentServ.createSubOrAdvert("pub-payment", objPayment); 
      objPayment = new PubPayment(payment);

      //Set payment done
      const toUdpate = { id: objPayment.id, action: "action_create_payments" };
      const result = await this.agentServ.remoteCallData("pub-payment", toUdpate);

    } catch (error) {
      console.log(error);
    }

  }

  //This method is used to build objet payment 
  private buildPayment(objPayment: PubPayment, ref: string): PubPayment{
    
    //objPayment.payment_token_id = ref;
    objPayment.payment_date = this.current_date;
    objPayment.journal_id.id = this.package ? this.package.journal_id.id : 0;
    objPayment.payment_method_line_id.id = this.payment_methods[this.payment_methods.length - 1].id;

    return objPayment;
  }

}
