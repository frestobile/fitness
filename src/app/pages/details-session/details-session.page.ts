import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { DataPayment, PaymentService } from 'src/app/providers/payment.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Session } from 'src/models/session';
import { Constants, DAK, Parameters } from 'src/models/contants.models';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { ProgramPayment } from 'src/models/program-payment';
import { Settings } from 'src/models/settings-models';
import { Single } from 'src/models/single';
import { TrainingOrder } from 'src/models/training-order';

@Component({
  selector: 'app-details-session',
  templateUrl: './details-session.page.html',
  styleUrls: ['./details-session.page.scss'],
})
export class DetailsSessionPage implements OnInit {

  defaultImg: string = "assets/imgs/bootcamp.png";
  session: Session = new Session();
  levels: { id: string; name: string; checked: boolean; color: string; decalage: number; }[] = [];
  lang: string = "fr";
  current_user: User;
  current_date: string;
  package: Settings | undefined;
  payment_methods: Single[] = [];
  obj_login: any;
  training_order: TrainingOrder;
  params: string | null = null;
  total_price: number = 0;
  purchase_count: number = 0;
  modalOpen : Boolean = false;
  exercise_count: number = 0;
  is_purchased: Boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paymentServ: PaymentService,
    private alertServ: AlertService,
    private training: TrainingService,
    private utils: UtilsService,
    private agentServ: AgentService,
    private nav: NavController,
    private dataServ: DataService
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("params: ", this.params);
    this.levels = DAK.getUserLevels();
    this.initializeView();

    this.paymentServ.handleResult().subscribe(async (rep)=>{
      if(rep!=""){
        this.alertServ.loadingPresent("Validation du paiement en cours...");
        this.paymentServ.setHandleResult("");
        try {
          await this.onProgram(rep);
          this.alertServ.loadingDismiss();
          //this.modal.dismiss();
          if(this.params==null){
            this.nav.navigateRoot(['success-order']);
          }else{
            this.nav.pop();
          }
        } catch (error) {
          //this.nav.navigateRoot(['success-payment']);
          this.alertServ.loadingDismiss();
          this.alertServ.errorToast("Une erreur est survenue. Veuillez contacter l'administrateur ou réessayer ultérieurement");
        }

      }
    });
  }

  //This method initialize view
  async initializeView(){
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{

    }

    if(this.params != null)
    {
      await this.getSessionDetail();
    }
    this.obj_login = await this.dataServ.getUserLogin();
    this.current_date = this.utils.getOnlyDateNow();


    const settings = await this.dataServ.getItem(Constants.SETTINGS);
    this.package = settings ? settings : Parameters;

    const rep = await this.training.getOnlineSettings();
    //console.log(rep);
    if(rep.length){

      this.package = rep ? rep[rep.length-1] : Parameters;
      this.dataServ.setItem(Constants.SETTINGS, this.package);
    }

    const methods = await this.training.getOnlineMethods();
    console.log(methods);
    this.payment_methods = methods;

  }

  handleModal(ev: any){
    this.modalOpen = false;
  }

  async getSessionDetail() {
    const session_data = await this.training.getSessionDetail(this.params);
    console.log("session data: ", session_data);
    const exercise_schedules = JSON.parse(session_data.schedules);
    this.exercise_count = exercise_schedules.length;
    const sessionData = {
      id: session_data.id,
      name: session_data.name,
      coach_id: session_data.coach_id,
      price: session_data.price,
      sporting_level: session_data.sporting_level,
      objective: session_data.objective,
      currency: {id: 1, name: "AUD"},
      description: session_data.description,
      session_image: session_data.session_image,
      start_date: session_data.start_date,
      end_date: session_data.end_date,
      is_active: session_data.is_active,
      is_private: session_data.is_private,
      created_at: session_data.created_at,
      updated_at: session_data.updated_at
    }
    this.session = new Session(sessionData);
    const purchasedStatus = await this.training.checkSessionPurchased(this.current_user.id, this.params);
    this.is_purchased = purchasedStatus == 1
  }

  //This method is used to set Image
  getImage(obj: Session){
    const bg_image = obj.session_image ? obj.session_image : this.defaultImg;
    return bg_image;
  }

  //This method is used to get level name
  // getNameOfLevel(level: string){
  //   return this.levels.find((elt: any) => elt.id == level);
  // }

  //This method is used to make payment
  async onPaid(){
    //this.router.navigate(['payment']);
    console.log("sporting level: ", this.current_user.sporting_level, this.session.sporting_level);
    // if(this.current_user.sporting_level!=this.session.sporting_level){
    //   this.alertServ.informToast("Ce programme ne correspond à votre niveau. Il est destiné au niveau "+this.session.sporting_level)
    //   return;
    // }

    if(this.purchase_count <= 0) {
      this.alertServ.errorToast("Please purcahse at least one session");
      return;
    }

    const subData : DataPayment = {
      user_id: this.current_user.id,
      amount: this.total_price * 100,
      currency: this.current_user.currency_id.name,
      label: this.session.name,
      countryCode: "AU",
      package_count: this.purchase_count,
      payment_status: 'paid',
      package_type: "session",
      package_id: this.session.id
    };

    try {
      const result = await this.paymentServ.createPaymentForTesting(subData);
      this.modalOpen = true;
      setTimeout(()=>{
        this.handleModal(null);
        // this.router.navigate(['app/tabs/home']);
      }, 2000);
      setTimeout(()=>{
        this.router.navigate(['app/tabs/home']);
      }, 2400);
    } catch (error) {
      this.alertServ.errorToast("There is an error in purchasing, please try later");
    }

  }

  //This method is used to build Training Program
  async buildProgramTraining(){

    let objPay: TrainingOrder = new TrainingOrder();
    objPay.amount = this.session.price;
    objPay.program_id.id = this.session.id;
    objPay.partner_id.id = this.current_user.id;
    objPay.coach_id = new Single({id: this.session.coach_id, name: "aaa"});
    objPay.user_id.id = this.obj_login.uid;
    objPay.sporting_level = this.session.sporting_level;
    objPay.num_sessions = 1;
    objPay.state = "pending";
    objPay.program_ok = true;

    try {
      const rep = await this.agentServ.createData("training-order", objPay);
      this.training_order = new TrainingOrder(rep);
      console.log(this.training_order);
    } catch (error) {

    }

  }

  //This method is used to create pub
  async onProgram(ref_payment: string){

      try {

        await this.buildProgramTraining();
        //Save Payment
        let objPayment: ProgramPayment = new ProgramPayment();
        objPayment.amount = this.training_order.amount;
        objPayment.program_id.id = this.training_order.id;
        objPayment.payment_date = this.utils.getOnlyDateNow();
        objPayment.currency_id = this.training_order.currency_id;
        objPayment.communication = this.training_order.name;
        objPayment = this.buildPayment(objPayment, ref_payment);

        const payment = await this.paymentServ.createSubOrAdvert("program-payment", objPayment);
        objPayment = new ProgramPayment(payment);

        //Set payment done
        const toUdpate = { id: objPayment.id, action: "action_create_payments" };
        const result = await this.agentServ.remoteCallData("program-payment", toUdpate);

        if(this.params!=null)
          this.training.publishData(this.training_order);

      } catch (error) {
        console.log(error);
      }
    }

    changeSessionCount(event: any) {
      let count = event.detail.value;
      this.purchase_count = count;
      if(count > 0)
      {
        this.total_price = count * this.session.price;
      }
    }

    //This method is used to build objet payment
    private buildPayment(objPayment: ProgramPayment, ref: string): ProgramPayment{

      //objPayment.payment_token_id = ref;
      objPayment.payment_date = this.current_date;
      objPayment.journal_id.id = this.package ? this.package.journal_id.id : 0;
      objPayment.payment_method_line_id.id = this.payment_methods[this.payment_methods.length - 1].id;

      return objPayment;
    }

}
