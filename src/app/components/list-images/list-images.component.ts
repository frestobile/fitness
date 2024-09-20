import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss'],
})
export class ListImagesComponent  implements OnInit {

  @Input() images: any[];
  @Output() showImage: EventEmitter<any> = new EventEmitter<any>();
  defaultImg: string = "assets/imgs/bg_coach.png";

  constructor() { }

  ngOnInit() {}

  //This method is used to show image
  viewPhoto(objImage: any){
    this.showImage.emit(objImage);
  }

}
