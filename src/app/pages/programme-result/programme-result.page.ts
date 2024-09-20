import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programme-result',
  templateUrl: './programme-result.page.html',
  styleUrls: ['./programme-result.page.scss'],
})
export class ProgrammeResultPage implements OnInit {

  defaultImg: string = "assets/imgs/bg_coach.png";

  constructor() { }

  ngOnInit() {
  }
}
