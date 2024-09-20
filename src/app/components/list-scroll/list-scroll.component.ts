import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-list-scroll',
  templateUrl: './list-scroll.component.html',
  styleUrls: ['./list-scroll.component.scss'],
})
export class ListScrollComponent  implements OnInit {

  @ViewChild('poidsSlider', {static: true}) sliderPoids: ElementRef;
  swiper?: Swiper;

  constructor() { }

  ngOnInit() {}

  swiperReady(){
    this.swiper = this.sliderPoids?.nativeElement.swiper;
  }
  
  swiperPoidsReady(){
    this.swiper = this.sliderPoids?.nativeElement.swiper;
  }

    //This method is used to handle slide change
    handlePoidschanged(ev: any){
      // this.is_beginning = this.slider.nativeElement.swiper.isBeginning;
      const is_end = this.sliderPoids.nativeElement.swiper.isEnd;
      console.log(is_end);
      console.log(this.sliderPoids.nativeElement.swiper.activeIndex);
      // this.currentSlide = this.slider.nativeElement.swiper.activeIndex;
    }

    //This method is used to generate range of number
    arrayRange(start: number, stop: number, step:number) {
      return Array.from(
          { length: (stop - start) / step + 1 },
          (value, index) => start + index * step
        );
    }

    generateArray(start: number, stop: number, step:number){

      let tabs: any = [];
      const nombres = this.arrayRange(start, stop, step);
      for (let k = 0; k < nombres.length; k++) {
        const element = nombres[k];
        tabs.push({text: element, value: element});
      }

      return {name: "Poids", options: tabs };
    }

}
