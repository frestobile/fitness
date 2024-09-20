import { User } from 'src/models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { NavController, isPlatform } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { DataService } from 'src/app/providers/data.service';
import { SocialLoginService, SocialUser } from 'src/app/providers/social-login.service';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user : any;
  img_fb: string = "assets/imgs/fb.png";
  img_google: string = "assets/imgs/google.png";
  img_apple: string = "assets/imgs/apple-logo.png";
  is_pending: boolean;

  constructor(
    private router: Router,
    private socialServ: SocialLoginService,
    private dataServ: DataService,
    private alertServ: AlertService,
    private userServ: UserService,
    private authServ: AuthService,
    private nav: NavController,
    private agentServ: AgentService
  ) {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

  ngOnInit() {
    this.socialServ.setupFbLogin();
  }

  //This method is used to login with Odoo
  loginWithOdoo() {
    this.router.navigate(['login-email']);
  }

  //Go to the signup page
  goToSignUp() {
    this.router.navigate(['signup']);
  }

  //This method is used login through
  async loginFacebook() {
    try {
      const rep: any = this.socialServ.login();
      console.log(rep);
      this.checkExistingUser(rep);

    } catch (error) {
      console.log(error);
      this.alertServ.errorToast("Impossible de se connecter via Facebook");
    }
  }

  //This method is used login through google
  async loginGoogle() {
    try {
      //const rep: any =this.socialServ.googleLogin();
      const rep = await GoogleAuth.signIn();
      console.log('user google', rep);
      this.checkExistingUser(rep,'google');

    } catch (error) {
      console.log(error);
      this.alertServ.errorToast("Impossible de se connecter via Google");
    }
  }

  //This method is used to check if user exists
  async checkExistingUser(fb_user: SocialUser, type?: string) {

    this.is_pending = true;
    const email = fb_user.email;
    const rep = await this.userServ.getUserByEmail(email);
    if (rep.length > 0) { //User exist then login in
      if ((type == "fb" && rep[0].fb_id == fb_user.id) || (type == "google" && rep[0].google_id == fb_user.id)) {
        this.nav.navigateRoot(['app']);
      } else if ((type == "fb" && rep[0].fb_id != fb_user.id) || (type == "google" && rep[0].google_id != fb_user.id)) {
        this.alertServ.errorToast("Cette adresse email existe déjà. Utilisez une autre adresse");
      }
      this.is_pending = false;
    } else {

      let objPartner = new User();
      if (type == "fb") {
        objPartner.first_name = fb_user.first_name ? fb_user.first_name : "";
        objPartner.last_name = fb_user.last_name ? fb_user.last_name : "";
        objPartner.fb_id = fb_user.id ? fb_user.id : "";
      } else {
        objPartner.first_name = fb_user.name ? fb_user.name : "";
        objPartner.last_name = fb_user.givenName ? fb_user.givenName : "";
        objPartner.google_id = fb_user.id ? fb_user.id : "";
      }

      objPartner.email = fb_user.email ? fb_user.email : "";
      objPartner.login_type = objPartner.email;

      this.agentServ.createData("partner", objPartner).then(res => {
        this.dataServ.setUserInfo(new User(res));
        this.authServ.setLoggedIn();
        this.is_pending = false;
        this.alertServ.presentToast("Votre compte sur Fitness a été enregistré");
        this.nav.navigateRoot(['/preferences']);
      }).catch(err => {
        this.alertServ.errorToast("Une erreur est survenue, réessayer ultérieurement");
      });
    }
  }

}
