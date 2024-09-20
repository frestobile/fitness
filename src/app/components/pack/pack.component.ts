import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Session } from 'src/models/session';
import { Constants, DAK } from 'src/models/contants.models';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.scss'],
})
export class PackComponent  implements OnInit {

  @Input() pack: Session;
  @Input() lang?: string = "fr";
  @Output() showPack : EventEmitter<Session> = new EventEmitter<Session>();

  levels: any = DAK.getUserLevels();
  default_image: string = "assets/imgs/bootcamp.png";
    

  constructor() { }

  ngOnInit() {}

  goToBootcamp(program: Session){
    this.showPack.emit(program);
  }

  //This method is used to get level name
  getNameOfLevel(level: string){
    return this.levels.find((elt: any) => elt.id == level).name;
  }

  getImage(obj: Session){
    const bg_image = obj.session_image ? Constants.PREFIX_BASE64+obj.session_image : this.default_image;
    return bg_image;  
  }


}
