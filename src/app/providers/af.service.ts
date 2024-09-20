import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
// import { DataService } from './data-service';

export interface User{
  uid: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AfService {

  constructor(
    private angularAuth: AngularFireAuth,
    // private dataServ: DataService,
    private afs: AngularFirestore
  ) { }

   //Register account
  //  async signUp({email, password}){

  //   const credential: any = await this.angularAuth.createUserWithEmailAndPassword(email, password);

  //   // console.log('Cred =>', credential);
  //   const authUser: User = {
  //     uid: credential.user.uid,
  //     email: credential.user.email,
  //     password: password
  //   };

  //   //Save authentification User
  //   localStorage.setItem("authUser", JSON.stringify(authUser));
  //  }

  //   //Log In
  //   signIn({email, password}){
  //     return this.angularAuth.signInWithEmailAndPassword(email, password);
  //   }

    //This method is used to retrieve users
    getInfoServer(){
      return this.afs.collection("servers").valueChanges() as Observable<any[]>;
    }

    //This method is used to handle server
    handleInfoServer(){

     const serveur = {
        active : true,
        application : "Direction des operations maritimes, sécurité et environnemental",
        customer : "DOMSE",
        database : "domse_dev",
        logo : "assets/imgs/logo.png",
        passswd : "",
        port : "",
        url : "https://domse-paa-dev.ona-itconsulting.com",
     };

    }


}
