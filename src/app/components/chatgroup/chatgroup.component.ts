import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Channel } from 'src/models/channel';

@Component({
  selector: 'app-chatgroup',
  templateUrl: './chatgroup.component.html',
  styleUrls: ['./chatgroup.component.scss'],
})
export class ChatgroupComponent {

/*   imagePublic: string = "assets/imgs/globe.png";
  imagePrivate: string = "assets/imgs/ouvrir.png"; */
  imagePublic: string = "assets/imgs/sample/sample.png";
  imagePrivate: string = "assets/imgs/sample/sample.png";
  @Input() groupe: Channel;
  @Input() lang: string = "fr";
  @Input() current_user?: any;
  @Output() goToChat : EventEmitter<Channel> = new EventEmitter<Channel>();
  @Output() joinToGroup : EventEmitter<Channel> = new EventEmitter<Channel>();

  constructor() { }

  
  onChatCoach(selectedChannel: Channel){
    this.goToChat.emit(selectedChannel);
  }

  joinGroup(selectedChannel: Channel){
    this.joinToGroup.emit(selectedChannel);
  }

}
