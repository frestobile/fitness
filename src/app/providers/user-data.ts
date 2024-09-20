// import { environment } from './../../environments/environment';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
// import { HttpService } from './common/api/http.service';
// import { DataService } from './data-service';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  // favorites: string[] = [];
  // HAS_LOGGED_IN = 'hasLoggedIn';
  private readonly STORE_BRANDS = 'kngo_brands';
  private readonly STORE_CITIES = 'kngo_cities_';

  constructor(
    private http: HttpClient,
    private dataServ: DataService,
    public toastCtrl: ToastController
  ) { }

  //This method is used to retrieve list of brands
  getListBrands(){
    // return this.http.get(environment.api_brands_vehicle);
  }

  //This method store brands
  storeBrandsForUser(brands: any): void{
    this.dataServ.setItem(this.STORE_BRANDS, brands);
  }

  //This method retrieve brands stored
  loadBrandsForUser(): Promise<any> {
    return this.dataServ.getItem(this.STORE_BRANDS);
  }
 
  //This method is used to search cities based on country
  searchCitiesByCountry(isoCodeCountry: string, search_city: string=""){
    
    const headers = {'x-mashape-key': '1d2c075047msh3f2dcdb5548ceb7p10af4ejsn2a10672e2d8d'};
    const req: string = '?offset=0&limit=10&hateoasMode=false&countryIds='+isoCodeCountry+'&namePrefix='+search_city;

    // return this.http.get(environment.api_cities+req, {headers: headers});
  }

  //This method is used to get FAQs
  getFAQ(){
    
    const req: string = 'assets/data/faq.json';
    return this.http.get(req);
  }


  //Store cities on local db
  storeCitiesByCountry(country_code: string, cities: any[]){
    this.dataServ.setItem(this.STORE_CITIES+country_code, cities);
  }

  //Load cities based on country code
  loadCitiesByCountry(country_code: string){
    return this.dataServ.getItem(this.STORE_CITIES+country_code);
  }

  /**
	 * Cette fonction permet de définir
	 * les messages d'erreur
	 **/
	getMessageError(txtLang?: any){
		
		let validation_messages = {
			'name': [
				{ type: 'required', message: "This field is required" },
				{ type: 'minlength', message: "This value is too short" },
				{ type: 'maxlength', message: "This value is too large" } 
			],
			
			'password': [
				{ type: 'required', message: "This field is required" },
        { type: 'minlength', message: "Password must have more than 6 characters" },
			],
			'usage': [
				{ type: 'required', message: "This field is required" }
			],
			'gender': [
				{ type: 'required', message: "Please select a gender" }
			],
			
			'email': [
				{ type: 'required', message: "This field is required" },
				{ type: 'email', message: "This email is not correct" },
				{ type: 'emailExist', message: "This email already exists" }
			],
			'phone': [
				{ type: 'required', message: "Your phone number is required" }
			],
		
		};

		return validation_messages;
	}

      /**
     * Cette fonction affiche un message
     * personnalisé avec button ok
     * @param txtMessage string, message à afficher
     * @param position any, position du message (top, middle or bottom)
     * @param options any, optional informations such as css class (.toat-error)
     *
     **/
  async showMsgWithButton(txtMessage: string, position: any, options?: any, btns?: string) {
      
        let toast = await this.toastCtrl.create({
        message: txtMessage,
        color: options !== undefined ? options : undefined,
        duration: 4000,
        buttons: btns !== undefined ? [
          {
            side: 'start',
            icon: btns,
            text: '',
            role: "cancel"
          },
          {
            side: 'end',
            // icon: btns,
            text: 'OK',
            role: "cancel"
          }	
        ]: undefined,
        position: position
        });
      
      toast.present();
  }

}
