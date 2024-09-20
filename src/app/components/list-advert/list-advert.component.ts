import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrainingPub } from 'src/models/pub';

@Component({
  selector: 'app-list-advert',
  templateUrl: './list-advert.component.html',
  styleUrls: ['./list-advert.component.scss'],
})
export class ListAdvertComponent  implements OnInit {

  @Input() pubs: TrainingPub[];
  @Output() showAdvert: EventEmitter<any> = new EventEmitter<any>();
  lang: string = "fr";
  defaultImg: string = "assets/imgs/pub.jpg";

  constructor() { }

  ngOnInit() {}

  //Display pub
  showPub(obj: any){
    this.showAdvert.emit(obj);
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
