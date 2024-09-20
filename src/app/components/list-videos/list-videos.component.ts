import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.scss'],
})
export class ListVideosComponent  implements OnInit {

  @Input() videos: any[];
  @Output() showVideo: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  //This method is used to play video
  displayVideos(objVideo: any){
    this.showVideo.emit(objVideo);
  }

}
