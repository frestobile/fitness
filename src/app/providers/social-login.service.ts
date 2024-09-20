import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookLogin, FacebookLoginPlugin } from '@capacitor-community/facebook-login';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

export interface SocialUser{
  id?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  givenName?: string;
  email?: string;
  birthdate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {

  fbLogin: FacebookLoginPlugin;
  user: any = null;
  token :any = null;

  constructor(
    private http: HttpClient
  ) { }

  async setupFbLogin() {
    if (isPlatform('desktop')) {
      this.fbLogin = FacebookLogin;
    } else {
      // Use the native implementation inside a real app!
      //const { FacebookLogin } = Plugins;
      this.fbLogin = FacebookLogin;
      
    }

    if(!isPlatform('capacitor')){
      GoogleAuth.initialize({
        clientId: '156510539903-i347gbe2m3dfmo48eu6an0b8m3ufraeo.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });
    }
  }

  //This method is used to authenticate user
  login() {

    return new Promise(async (resolve, reject)=>{

      const FACEBOOK_PERMISSIONS = ['email', 'public_profile'];
      const result = await this.fbLogin.login({ permissions: FACEBOOK_PERMISSIONS });
  
      if (result.accessToken && result.accessToken.userId) {
        this.token = result.accessToken;
        this.loadUserData().subscribe(res => {
          this.user = res;
          resolve(res);
        });
      } else if (result.accessToken && !result.accessToken.userId) {
        // Web only gets the token but not the user ID
        // Directly call get token to retrieve it now
        this.getCurrentToken();
      } else {
        // Login failed
        reject(result);
      }
    });
    
  }

  //Get current token
  getCurrentToken() {
    
    return new Promise(async (resolve, reject)=>{

      const result = await this.fbLogin.getCurrentAccessToken();
      console.log(result);
      alert(JSON.stringify(result));
      if (result.accessToken) {
        this.token = result.accessToken;
        this.loadUserData().subscribe(res => {
          this.user = res;
          resolve(res);
        });
      } else {
        // Not logged in
        reject(result);
      }
    });
    
  }

  //Retrieve user
  loadUserData() {
    const url = `https://graph.facebook.com/${this.token.userId}?fields=id,first_name,last_name,picture.width(720),email&access_token=${this.token.token}`;
    return this.http.get(url);
  }

  async logout() {
    await this.fbLogin.logout();
    this.user = null;
    this.token = null;
  }

  googleLogin(): Promise<User>{
    return new Promise(async (resolve, reject)=>{
      try {        
        const rep: any = await GoogleAuth.signIn();
        resolve(rep);
      } catch (error) {
        //alert(JSON.stringify(error));
        console.log(error);
        reject(error);
      }
    });
  }

  async googleLogout(){
    await GoogleAuth.signOut();
  }
}
