import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { DataService } from 'src/app/providers/data.service';
import { NetworkService } from 'src/app/providers/network.service';
import { UserService } from 'src/app/providers/user.service';
import { ICredential } from 'src/models/iuser';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
})
export class LoginEmailPage implements OnInit {

  login: ICredential = {};
  img_fb: string = "assets/imgs/fb.png"; 
  img_google: string = "assets/imgs/google.png";
  img_apple: string = "assets/imgs/apple-logo.png";
  submitted = false;
  is_pending: boolean;
  is_eye: boolean = false;
  credentialData: { email: string; password: string; };

  constructor(
    private networkServ: NetworkService,
    private dataServ: DataService, 
    private nav: NavController,
    private userServ: UserService,
    private alertServ: AlertService,
    private authServ: AuthService
  ) { }

  ngOnInit() {
  }

  // //Sign In User
  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) { 
      
      this.is_pending = true;
      this.login.email = this.login.email!==undefined ? this.login.email.trim() : "";
      const credentials = {email: this.login.email, password: this.login.password, lang:'fr'};
     
      if(!this.networkServ.isOnline()){
        // console.log("login");
        this.dataServ.findUser(credentials).then((x:any) => {
          this.is_pending = false;
          if(x){
           this.dataServ.setUserInfo(x); 
           this.authServ.setLoggedIn();
           this.nav.navigateRoot(['/app']);
          }
  
        });
        // console.log('Offline');
      } else {

        // console.log('Online');
        this.is_pending = true;
        this.userServ.loginByEmail(credentials).then((res: any)=>{  
          console.log("login response: ", res.data.status);
          this.is_pending = false;
          if(res.data.status == 'active'){
            localStorage.setItem('uid', res.data.id);
            localStorage.setItem('token', res.api_token);
            this.authServ.setLoggedIn();
            this.nav.navigateRoot(['/app']);
          }else{
            this.alertServ.errorToast("Email et/ou mot de passe incorrecte");
          }
          // this.router.navigateByUrl('/app/tabs/home');
        }).catch((err) => {
          this.is_pending = false;
        });
      }

    } 
  }

  //This method is used to handle forgoten password
  openForgotPwd(){

  }

  /**
   * This method is used to log in
   * by facebook
   */
  loginByFacebook(){

  }

  /**
   * This method is used to log in
   * by Google
   */
  loginByGoogle(){

  }

}
