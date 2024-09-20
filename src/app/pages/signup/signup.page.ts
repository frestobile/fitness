import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { DataService } from 'src/app/providers/data.service';
import { NetworkService } from 'src/app/providers/network.service';
import { UserService } from 'src/app/providers/user.service';
import { ICredential } from 'src/models/iuser';
import { User } from 'src/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  login: ICredential = {};
  img_fb: string = "assets/imgs/fb.png";
  img_google: string = "assets/imgs/google.png";
  img_apple: string = "assets/imgs/apple-logo.png";
  submitted = false;
  is_pending: boolean;
  is_eye: boolean = false;

  constructor(
    private networkServ: NetworkService,
    private userServ: UserService,
    private nav: NavController,
    private alertServ: AlertService,
    private authServ: AuthService,
    private dataServ: DataService
  ) { }

  ngOnInit() {
  }

  // //Sign In User
  async onRegister(form: NgForm) {

    console.log("form: ", form);

    this.submitted = true;

    if (form.valid) { 
           
      if(!this.networkServ.isOnline()){
        // console.log("login");
        this.alertServ.errorToast("Vérifier votre connexion Internet avant de continuer");
        // console.log('Offline');
      }else{
        console.log('testing');
        this.is_pending = true;
        const rep = await this.userServ.getUserByEmail(this.login.email);
        console.log("rep::: ", rep);
        if(rep.length>0){
          this.alertServ.errorToast("Cette adresse Email existe déjà");
          this.is_pending = false;
          return;
        }

        this.login.email = this.login.email!==undefined ? this.login.email.trim() : "";
        const username = this.login.username!==undefined ? this.login.username.trim() : "";
        // const firstname = this.login.firstname!==undefined ? this.login.firstname : "Fitness"; 
        // const lastname = this.login.lastname!==undefined ? this.login.lastname : "Fitness"; 
        const new_passwd = this.login.password!==undefined ? this.login.password : ""; 
        const email = this.login.email;
        const userData = {
          username: username,
          email: email,
          password: new_passwd,
          // first_name: firstname,
          // last_name: lastname
        }

        this.userServ.registerUser(userData).then(res=>{
          console.log("registration response: ", res);
          localStorage.setItem('uid', res.data.id);
          localStorage.setItem('token', res.data.token);
          this.dataServ.setUserInfo(new User(res.data));
          this.authServ.setLoggedIn();
          this.is_pending = false;
          this.nav.navigateRoot(['/preferences']);
        }).catch(err=>{
          this.is_pending = false;
          console.log(err); 
          //this.nav.navigateRoot(['/preferences']);
        });
      }
    } 
  }

  //Go to previous signin page
  goToSignIn(){
    this.nav.back();
  }

  //This method is used go back to login
  goToLogin(){
    this.nav.back();
  }

}
