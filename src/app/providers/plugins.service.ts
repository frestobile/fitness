import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
// import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@awesome-cordova-plugins/barcode-scanner/ngx';
// import { Geolocation, Position } from '@capacitor/geolocation';
// import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
// import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
// import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';


@Injectable({
  providedIn: 'root'
})
export class PluginsService {

  constructor(
    // private qrScanner: BarcodeScanner, 
    // private callNumber: CallNumber,
    // private emailComposer: EmailComposer,
    ) { }

  /**
   * Cette fonction permet à un utilisateur 
   * de prendre une photo à partir de la caméra de l'appareil
   *
   **/
  takePicture(){
    
    return new Promise(async (resolve, reject)=>{

      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true, 
          promptLabelPhoto: "Via la galerie",
          promptLabelPicture: "Via la caméra",
          promptLabelCancel: "Annuler",
          resultType: CameraResultType.Base64
        });
      
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        // var imageUrl = image.webPath;
        resolve(image);
  
      } catch (error) {
         reject(error);
      }
    });
          
}//FIn takin picture

  /**
   * This method is used to scan a
   * qr Code
   * 
   * @returns Promise
   */
  // openScan(): Promise<string>{

  //   return new Promise((resolve, reject)=>{
      
  //     this.qrScanner.scan().then((result: BarcodeScanResult) => {
  //       const texte = result.text;
  //       resolve(texte);
  //     }).catch(err => reject(err)
  //     );

  //   });
    
  // }

    /**
     * This method is used to get current
     * position of 
     */
    // getCurrentPosition(): Promise<Position>{
    //   return new Promise((resolve, reject) => {
    //       Geolocation.getCurrentPosition().then((position) => {
    //           // console.log(position);
    //           resolve(position);
    //       }).catch((err) => {
    //           reject(err);
    //       });
    //   });
    // }


    /**
     * This method is used to make a call
     * @param phone string
     */
    // makeCall(phone: string){
    //   this.callNumber.callNumber(phone, true).then(res => console.log('Launched dialer!', res))
    // }

    	/**
	* Cette fonction permet d'envoyer un mail
	* @param adrEmail string
	* @param txtMessage string
	* (A Executer sur un Smartphone)
	**/
	// doEmail(adrEmail, txtMessage, sujet?: string, body?: string) {

	// 	if (adrEmail) {
			
	// 		//Now we know we can send
	// 		let email = {
	// 			to: adrEmail,
	// 			subject: sujet,
	// 			body: body,
	// 			isHtml: true
	// 		};

	// 		this.emailComposer.open(email).then(() => {
				
	// 		});
	
	// 	} else {
		
	// 	}
	// }

}
