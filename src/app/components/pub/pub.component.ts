import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrainingPub } from 'src/models/pub';

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.scss'],
})
export class PubComponent  implements OnInit {

  @Input() pub: TrainingPub;
  @Input() supplier?: boolean = true;
  @Output() showAdvert: EventEmitter<any> = new EventEmitter<any>();
  lang: string = "fr";
  
  constructor() { }

  ngOnInit() {}

  //Display pub
  showPub(obj: TrainingPub){
    this.showAdvert.emit(obj);
  }

  getColor(state: string): string{
    return state=="not_paid" ? "danger":"vert";
  }

  getState(state: string){
    if(state=="pending"){
      return "Brouillon";
    }else if(state=="progress"){
      return "En cours";
    }else{
      return "Terminé";
    }
  }

}
