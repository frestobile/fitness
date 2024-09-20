import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { countries } from 'src/data_countries/data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent  implements OnInit {
  
  private dumpData: any[] = countries;
  list_countries: any[] = countries;
  is_country: boolean;
  txt_search: string;

  constructor(private modalCountry: ModalController) { }

  ngOnInit() {}

  //This method is used select country
  selectCountry(obj: any){
    
    this.modalCountry.dismiss(obj);
  }
  
  onClose(){
    this.modalCountry.dismiss();
  }

  //This method is used to handle country
  handleCloseCountry(ev: any){
    this.is_country = false;
  }

  /**
   * This method is used to search element on the list
   * @param ev any
   * @returns 
   */
  getItems(ev: any) {

    let val: string = ev.target.value;
    
    if (val == '' || val == undefined) {
      this.list_countries = this.dumpData;
      return;
    }

    if (val != '' && val !== undefined && val.length > 1) {
      
      this.list_countries = this.dumpData.filter((item: any) => {
        let txtNom: string = '';
        txtNom = item.name;
        return txtNom.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
        
    } else if (val == '' || val == undefined) {
      this.list_countries = this.dumpData;
    }
  }

}
