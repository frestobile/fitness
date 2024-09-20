import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { DataService } from 'src/app/providers/data.service';
import { TrainingService } from 'src/app/providers/training.service';
import { Constants, DAK } from 'src/models/contants.models';
import { EmptyMessage } from 'src/models/iuser';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user'; 
import { TrainingOrder } from 'src/models/training-order';

@Component({
  selector: 'app-coaching-programmes',
  templateUrl: './coaching-programmes.page.html',
  styleUrls: ['./coaching-programmes.page.scss'],
})
export class CoachingProgrammesPage implements OnInit {
  
  @ViewChild('modal') modal: IonModal;
  lang: string;
  current_user: User;
  is_pending: boolean = true;
  is_training: boolean = false;
  errorMessage: EmptyMessage;
  orders: TrainingOrder[] = [];
  selectedOrder: TrainingOrder;
  tabs_points: number[] = [0.5, 0.75];
  init_breakpoint: number = 0.75;
  levels: { id: string; name: string; checked: boolean; color: string; decalage: number; }[] = [];

  constructor(
    private router: Router,
    private training: TrainingService,
    private dataServ: DataService
  ) { }

  ngOnInit() {
    this.errorMessage = {text: "Impossible de récupérer les demandes de coaching, une erreur est survenue", txtButton: "Réessayez" };
    this.levels = DAK.getUserLevels();
    this.initializeView();

    this.handleEventsData();
  }

  //This method is used to handle events
  handleEventsData(){
    this.training.getObservableData().subscribe(rep=>{
      console.log(rep);
      if(rep!=null){
        const idx: number = this.orders.findIndex(elt => elt.id == rep.training_id.id);
        if(idx>-1){
          this.orders[idx].session_line_ids.push(rep.id);
        }
        this.training.publishData(null);
      }
    });
  }

  //Initialize view
  async initializeView(){
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{
      
    }
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    this.getProgrammesPaid();
  }

  //This method is used to get programs paid by user
  async getProgrammesPaid(){
    
    this.is_pending = true; 
    try {
      const filter = { payment_state: ["=", "paid"], state: ["=", "progress"], coach_id: ["=", this.current_user.id] };
      const rep = await this.training.getOnlineTrainingOrders(filter);

      console.log(rep);
      this.orders = rep;
      this.is_pending = false;
    } catch (error) {
      this.is_pending = false;
    }
  }

  //This method is used to go through details
  goToTraining(obj: TrainingOrder){
    this.selectedOrder = obj;
    this.is_training = true;
  }

  handleRetry(ev: any){
    this.getProgrammesPaid();
  }

  //This method is used to get level name
  getNameOfLevel(level: string){
    return this.levels.find((elt: any) => elt.id == level);
  }

  // Handler Close modal
  handleCloseModal(ev: any){
    this.is_training = false;
  }

  //This method is used to perform session workflow
  onHandleSession(){
    this.modal.dismiss();
    this.router.navigate(['create-programme'], {state: this.selectedOrder});
  }

  //This method checks if sessions is fulled
  isFull(selectedOrder: TrainingOrder): boolean{
    return selectedOrder.session_line_ids.length == selectedOrder.num_sessions;
  }

}
