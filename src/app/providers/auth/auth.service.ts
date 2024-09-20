import { UserService } from './../user.service';
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { AlertController } from '@ionic/angular';
// import { AuthToken, JwtAuthToken } from 'src/models/auth/authtoken.model';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  userInfo: any;
  currentAccessToken = null;
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(    
    private alertController: AlertController,
    private storage: DataService,
    private router: Router) { }

    

  public getLoggedIn(): Observable<boolean> {
      return this.loggedIn$;
  }
  
  public getAuthUser(): Observable<boolean> {
      return this.authUser$;
  }

  isAuthenticated() {
    console.log('isAuthenticated: ' + this.loggedIn$.value);
    return this.loggedIn$.value;
  }


  public setLoggedIn(): void{
    this.loggedIn$.next(true); 
    localStorage.setItem("is_login", 'true')
  }

  public logOut(){
    this.loggedIn$.next(false);
    this.storage.removeToken();
    localStorage.removeItem("is_login");
    //localStorage.removeItem("first_tap");
    // this.currentAuthTokenSubject$.next(null);
    this.router.navigateByUrl('/login', { replaceUrl: true }); 
  }


  
  //Display message Error
  showAlert(msg: string, title?:any) {
    const alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(x => x.present());
  }

}
