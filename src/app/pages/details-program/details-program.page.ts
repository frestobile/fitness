import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { DataService } from 'src/app/providers/data.service';
import { DataPayment, PaymentService } from 'src/app/providers/payment.service';
import { TrainingService } from 'src/app/providers/training.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Program } from 'src/models/program';
import { Constants, DAK, Parameters } from 'src/models/contants.models';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import { ProgramPayment } from 'src/models/program-payment';
import { Settings } from 'src/models/settings-models';
import { Single } from 'src/models/single';
import { TrainingOrder } from 'src/models/training-order';

@Component({
  selector: 'app-details-program',
  templateUrl: './details-program.page.html',
  styleUrls: ['./details-program.page.scss'],
})
export class DetailsProgramPage implements OnInit {

  defaultImg: string = "assets/imgs/bootcamp.png";
  program: Program = new Program();
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
  is_purchased: Boolean = false;
  exercise_count: number = 0;

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
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }

    if(this.params != null)
    {
      await this.getProgramDetail();
    }
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
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

  async getProgramDetail() {
    const program_data = await this.training.getProgramDetail(this.params);
    const exercise_schedules = JSON.parse(program_data.schedules);
    this.exercise_count = exercise_schedules.length;

    const programData = {
      id: program_data.id,
      name: program_data.name,
      coach_id: program_data.coach_id,
      price: program_data.price,
      sporting_level: program_data.sporting_level,
      objective: program_data.objective,
      currency: {id: 1, name: "AUD"},
      description: program_data.description,
      program_image: program_data.program_image,
      start_date: program_data.start_date,
      end_date: program_data.end_date,
      is_active: program_data.is_active,
      is_private: program_data.is_private,
      created_at: program_data.created_at,
      updated_at: program_data.updated_at
    }
    this.program = new Program(programData);
    console.log("current program: ", this.program);
    const purchasedStatus = await this.training.checkProgramPurchased(this.current_user.id, this.params);
    this.is_purchased = purchasedStatus == 1
  }

  //This method is used to set Image
  getImage(obj: Program){
    const bg_image = obj.program_image ? obj.program_image : this.defaultImg;
    return bg_image;
  }

  //This method is used to get level name
  // getNameOfLevel(level: string){
  //   return this.levels.find((elt: any) => elt.id == level);
  // }

  //This method is used to make payment
  async onPaid(){
    //this.router.navigate(['payment']);
    // console.log("sporting level: ", this.current_user.sporting_level, this.program.sporting_level);
    // if(this.current_user.sporting_level!=this.program.sporting_level){
    //   this.alertServ.informToast("Ce programme ne correspond à votre niveau. Il est destiné au niveau "+this.program.sporting_level)
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
      label: this.program.name,
      countryCode: "AU",
      package_count: this.purchase_count,
      payment_status: 'paid',
      package_type: "program",
      package_id: this.program.id
    };

    try {
      const result = await this.paymentServ.createPaymentForTesting(subData);
      this.alertServ.informToast("Successfully purchased");
      this.router.navigate(['app/tabs/home']);

    } catch (error) {
      this.alertServ.errorToast("There is an error in purchasing, please try later");
    }

  }

  //This method is used to build Training Program
  async buildProgramTraining(){

    let objPay: TrainingOrder = new TrainingOrder();
    objPay.amount = this.program.price;
    objPay.program_id.id = this.program.id;
    objPay.partner_id.id = this.current_user.id;
    objPay.coach_id = new Single({id: this.program.coach_id, name: "aaa"});
    objPay.user_id.id = this.obj_login.uid;
    objPay.sporting_level = this.program.sporting_level;
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

    changeProgramCount(event: any) {
      let count = event.detail.value;
      this.purchase_count = count;
      if(count > 0)
      {
        this.total_price = count * this.program.price;
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
