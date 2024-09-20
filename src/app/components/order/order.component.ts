import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DAK } from 'src/models/contants.models';
import { TrainingOrder } from 'src/models/training-order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent  implements OnInit {

  @Input() program: TrainingOrder;
  @Output() showProgram: EventEmitter<TrainingOrder> = new EventEmitter<TrainingOrder>();
  lang: string = "fr";
  levels: any = DAK.getUserLevels();
  
  constructor() { }

  ngOnInit() {}

  //Display pub
  getProgram(obj: TrainingOrder){
    this.showProgram.emit(obj);
  }

  //This method is used to get level name
  getNameOfLevel(level: string){
    return this.levels.find((elt: any) => elt.id == level).name;
  }

  getColor(state: string): string{
    return state!="paid" ? "danger":"vert";
  }

  getState(state: string){
    if(state=="pending"){
      return "Non payé";
    }else if(state=="progress"){
      return "En cours";
    }else if(state=="finished"){
      return "Terminé";
    }else{
      return "Annulé";
    }
  }

}
