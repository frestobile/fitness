import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
// import { OdooService } from 'src/app/providers/odoo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-synchronized',
  templateUrl: './synchronized.page.html',
  styleUrls: ['./synchronized.page.scss'],
})
export class SynchronizedPage implements OnInit {
  
  is_pending: boolean = true;
  progress: number = 0;
  total: number = environment.tab_models.length;

  constructor(
    // private odooServ: OdooService,
    private nav: NavController
  ) { }

  ngOnInit() {
    // this.odooServ.syncListObjets();

    // this.odooServ.getSynchroStatus().subscribe(rep=>{
    //   this.is_pending = rep;
    //   // console.log(rep);
    // });

    // this.odooServ.getProgressStatus().subscribe((progress: number)=>{
    //   console.log(progress);

    //   this.progress =  ((this.total - progress)/this.total);
    // });
  }

  //This method is used to go to Home
  goToHome(){
    localStorage.setItem('is_initiated', '1');
    this.nav.navigateRoot(['app']);
  }

}
