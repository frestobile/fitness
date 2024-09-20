/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private  connectionStatus: ConnectionStatus;
  private status: BehaviorSubject<any> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(private network: Network, private toastController: ToastController, private platform: Platform) {

    this.platform.ready().then(() => {
      // console.log(this.platform.platforms())
      this.initializeNetworkEvents();
      if(this.platform.is('capacitor')) {
        this.connectionStatus =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      }else{
        this.connectionStatus  = ConnectionStatus.Online;
      }
      this.status.next(this.connectionStatus);
    });
  }

  public initializeNetworkEvents() {
    if(this.platform.is('capacitor')) {
      this.network.onDisconnect().subscribe(() => {
        if (this.status.getValue() === ConnectionStatus.Online) {
          // console.log('WE ARE OFFLINE');
          this.updateNetworkStatus(ConnectionStatus.Offline);
        }
      });
      this.network.onConnect().subscribe(() => {
        if (this.status.getValue() === ConnectionStatus.Offline) {
          // console.log('WE ARE ONLINE');
          this.updateNetworkStatus(ConnectionStatus.Online);
        }
      });
    } else {
      // console.log('WE ASSUME ONLINE');
      this.updateNetworkStatus(ConnectionStatus.Online);
    }

  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public isOnline(): boolean {
    return this.status.getValue() === ConnectionStatus.Online;
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);

    const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';
    const toast = this.toastController.create({
      message: `You are now ${connection}`,
      duration: 3000,
      position: 'bottom'
    }); 
    toast.then(x => x.present());
  }

}
