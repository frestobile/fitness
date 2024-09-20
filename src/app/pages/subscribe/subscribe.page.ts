import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { NetworkService } from 'src/app/providers/network.service';
import { DataPayment, PaymentService } from 'src/app/providers/payment.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Constants, Parameters } from 'src/models/contants.models';
import { EmptyMessage } from 'src/models/iuser';
import { Journal } from 'src/models/journal';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { Settings } from 'src/models/settings-models';
import { Single } from 'src/models/single';
import { Souscription } from 'src/models/souscription';
import { SubPayment } from 'src/models/sub-payment';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {

  @ViewChild('modal') modal: IonModal;

  packages: Settings[] = [];
  img_google: string = "assets/imgs/google.png";
  img_apple: string = "assets/imgs/apple-logo.png";
  lang: any;
  current_user: User;
  package: Settings | undefined;
  is_pending: boolean = true;
  errorMessage: EmptyMessage;
  is_payment: boolean = false;
  breakpoints = [0.25, 0.5, 0.75];
  selected_type: string;
  current_date: string;
  start_date: string;
  payment_methods: Single[] = [];
  obj_journal: Journal | any = new Journal();
  obj_login: any;
  cost_session: number;

  constructor(
    private training: TrainingService,
    private paymentServ: PaymentService,
    private utils: UtilsService,
    private agentServ: AgentService,
    private nav: NavController,
    private networkServ: NetworkService,
    private alertServ: AlertService,
    private dataServ: DataService
  ) { }

  ngOnInit() {

    this.errorMessage = {text: "Un problème est survenu", txtButton: "Réessayez" };
    this.current_date = this.utils.getOnlyDateNow();
    this.initializeView();

    this.paymentServ.handleResult().subscribe(async (rep)=>{
      if(rep!=""){
        this.alertServ.loadingPresent("Validation du paiement en cours...");
        this.paymentServ.setHandleResult("");
        try {
          await this.createPaymentObjet(rep);
          this.alertServ.loadingDismiss();
          this.modal.dismiss();
          this.nav.navigateRoot(['success-payment']);
          
        } catch (error) {
          this.alertServ.loadingDismiss();
          //this.nav.navigateRoot(['success-payment']);
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
    }else{
      
    }
    this.obj_login = await this.dataServ.getUserLogin();

    this.getPackages();

    this.updateSettings();
  }

  //THis method is used to update settings
  updateSettings(){ 
    if(this.networkServ.isOnline()){
      this.loadFromServer();
    }else{
      this.loadFromLocal();
    }
  }

  private async loadFromServer(){
    const rep = await this.training.getOnlineSettings();
    console.log(rep);
    if(rep.length){
      this.package = rep ? rep[0] : undefined;
      if(this.package)
        this.dataServ.setItem(Constants.SETTINGS, this.package);
    }else{
      this.loadFromLocal();
    }
  }

  private async loadFromLocal(){
    const rep = await this.dataServ.getItem(Constants.SETTINGS);
    this.package = rep ? rep : Parameters;
    console.log(this.package);
  }

  //This method is used to get packages
  async getPackages(){
    this.is_pending = true;
    try {

      this.is_pending = false;
      //await this.loadFromServer();
      const methods = await this.training.getOnlineMethods();
      //console.log(methods);
      this.payment_methods = methods;
      const journals = await this.training.getOnlineJournals();
      //console.log(journals);
      this.obj_journal = journals.find(elt => elt.type =="bank");

    } catch (error) {
      console.log(error);
      this.is_pending = false;
    }
  }

  //This payment is used to go through Stripe payment
  goPayment(payment_type: string){
    this.selected_type = payment_type;
    this.is_payment = true;
  }

  //Reload data
  handleRetry(ev: any){
    this.getPackages();
  }

  /**
   * This method is used to perfom payment
   * through method choosen
   * 
   * @param method string, payment method
   */
  async checkout(method: string){

    if(this.start_date===undefined || this.start_date==''){
      this.alertServ.errorToast("Veuillez renseigner la date de planification");
      return;
    }

    if(this.cost_session===undefined || this.cost_session==0){
      this.alertServ.errorToast("Veuillez renseigner votre tarif par session");
      return;
    }

    //Update current user infos
    this.updateSessionCost();

    let amount: number = 0;
    let lbl_coach: string = "";

    if(this.package){
      amount = this.selected_type == "annual" ? this.package.annual_cost_subscription : this.package.annual_cost_subscription ;
      lbl_coach = this.selected_type == "annual" ? "Abonnement Coach (par an)" : "Abonnement Coach (par mois)"
    }
    
    const subData : DataPayment = {
      user_id: this.current_user.id,
      amount: amount,
      currency: this.current_user.currency_id.name,
      label: lbl_coach,
      countryCode: "AU",
      package_count: 0,
      payment_status: "pending",
      package_type: "session",
      package_id: 0
    };

    switch (method) {
      case "card":
        await this.paymentServ.createPaymentUsingCard(subData);
        
        break;
      case "apple":
        await this.paymentServ.applePay(subData);
        break;
      case "google":
        await this.paymentServ.googlePay(subData);
        break;
    
      default:
        break;
    }

    this.modal.dismiss();
  }

  //This method is used to update session cost
  updateSessionCost(){
    
    // this.current_user.cost_session = this.cost_session;
    const toUdpate = {
      id: this.current_user.id,
      // cost_session: this.cost_session
    };

    this.agentServ.updateData("partner", this.current_user.id, toUdpate).then((rep)=>{
    });
  }

  //This method is used to create subscribe object
  async createPaymentObjet(ref_payment: string){
    
    let amount: number = 0;
    if(this.package)
      amount = this.selected_type == "annual" ? this.package.annual_cost_subscription : this.package.annual_cost_subscription ;
      
    let objPay: Souscription = new Souscription();
    objPay.amount = amount;
    objPay.active = true;
    objPay.partner_id.id = this.current_user.id;
    objPay.period = this.selected_type;
    objPay.date_start = this.start_date;
    objPay.user_id.id = this.obj_login.uid;
    objPay.state = "pending";

    try {
      const sub = await this.paymentServ.createSubOrAdvert("souscription", objPay);
      objPay = new Souscription(sub);
      console.log(objPay);

      //Save Payment
      let objPayment: SubPayment = new SubPayment();
      objPayment.amount = objPay.amount;
      objPayment.currency_id = objPay.currency_id;
      objPayment.payment_date = this.utils.getOnlyDateNow();
      objPayment.communication = objPay.name;
      objPayment.subscription_id.id = objPay.id;
      objPayment = this.buildPayment(objPayment, ref_payment);
      const payment = await this.paymentServ.createSubOrAdvert("sub-payment", objPayment);
      objPayment = new SubPayment(payment);
      console.log(objPayment);
      //Set payment done
      const toUdpate = { id: objPayment.id, action: "action_create_payments" };
      const result = await this.agentServ.remoteCallData("sub-payment", toUdpate);

    } catch (error) {
      
    }
  }

  //This method is used to handle close modal
  handleMethod(ev: any){
    this.is_payment = false;
  }

  //This method is used to build objet payment 
  private buildPayment(objPayment: SubPayment, ref: string): SubPayment{
    
    //objPayment.payment_token_id = ref;
    objPayment.payment_date = this.current_date;
    objPayment.journal_id.id = this.obj_journal.id;
    objPayment.payment_method_line_id.id = this.payment_methods[this.payment_methods.length - 1].id;

    return objPayment;
  }

}
