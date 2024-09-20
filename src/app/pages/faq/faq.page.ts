import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/providers/data.service';
import { UserData } from 'src/app/providers/user-data';
import { Constants } from 'src/models/contants.models';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  lang: string = 'en';
  faqs: any[] = [];

  constructor(
    private userDataServ: UserData,
    private dataServ: DataService
  ) { }

  ngOnInit() {
    this.initializeView();
  }

  //This method is used to initialize view
  async initializeView(){
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);

    this.userDataServ.getFAQ().subscribe((rep: any)=>{
      console.log(rep);
      for (const key in rep) {
        if (Object.prototype.hasOwnProperty.call(rep, key)) {
          const element = rep[key];
          if (key==this.lang){
            this.faqs = element.tab;
            break;
          }
        }
      }
    })
  }


}
