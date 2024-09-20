import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private isLoading: boolean;

  constructor(
    private toastController: ToastController, 
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController
    ) {}

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'middle',
      color: 'success'
    });
    toast.present();
  }

  async informToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'middle',
      color: 'success'
    });
    toast.present();
  }

  async errorToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }

  	/**
	 * This method is used to display the
	 * loading spinner 
	 * 
	 * @param message string
	 */
	async loadingPresent(message?: string) {

    this.isLoading = true;
		return await this.loadCtrl.create({
		  message: message,
		  spinner: 'circles' 
		}).then(a => {
		  a.present().then(() => {
			// console.log('loading presented');
			if (!this.isLoading) {
			  a.dismiss().then(() => {});
			}
		  });
		});
	}

  /**
	 * This method is used to dismiss
	 * loading spinner
	 */
	async loadingDismiss() {
		this.isLoading = false;
		return await this.loadCtrl.dismiss().then(() => {});
	}

  //Display message to user
  async presentAlert(msg: string) {

    const alert = await this.alertCtrl.create({
      header: 'Communifit',
      message: msg,
      buttons: ['Compris']
    });
  
    await alert.present();
  }

}
