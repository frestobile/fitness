import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EmptyMessage } from 'src/models/iuser';


@Component({
  selector: 'app-empty-view',
  templateUrl: './empty-view.component.html',
  styleUrls: ['./empty-view.component.scss'],
})
export class EmptyViewComponent  implements OnInit {

  @Input() message: EmptyMessage;
  @Input() image: string = "assets/imgs/delivery.jpg";
  @Input() events?: any;
  @Input() isButton?: boolean = false;
  @Input() showImage?: boolean = true;
  @Output() retry: EventEmitter<any> = new EventEmitter<any>(false);

  constructor() { }

  ngOnInit() {}

  onEvent(event: string) {
    this.retry.emit(event);
  }

}
