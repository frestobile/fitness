import { Component } from '@angular/core';
import { User } from 'src/models/user';
import { DataService } from '../providers/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  current_user: User;
  constructor(
    private router : Router,
    private dataServ: DataService
  ) {}

  ngOnInit() {
    this.initializeView();
  }

  async initializeView(){
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.router.navigate(['app/tabs/home']);
    }else{
      if(localStorage.getItem('first_fitness')==null) {
        this.router.navigate(['walkthrough']);
      }else {
        this.router.navigate(['login']);
      }
    }
  }
}
