// import { Client } from '../../models/client';
import { ICredential } from './../../models/iuser';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {  Storage } from '@ionic/storage/dist/esm';
// import { Constants } from '../../constants/app.constants';
// import { ICredential, IUser } from '../../models/iuser';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Constants } from 'src/models/contants.models';
import * as moment from 'moment';
import { User } from 'src/models/user';
import { Single } from 'src/models/single';

import { ApiService } from './api.service';


@Injectable({
 providedIn: 'root',
})
export class DataService  {

  // private _store: Storage | null = null; 

  constructor(
    private router: Router,
    private storage: Storage,
    private apiServ: ApiService,
  ){}

  async createDatabase(): Promise<any>{
     await this.storage.create();
     return this.storage.defineDriver(CordovaSQLiteDriver);
  }

  //Initialize storage functionnalities
  // async init() {
  
  //   const storage = await this.storage.create();
  //   this._store = storage;
  // }

  async setUserInfo(user: any): Promise<void> {
    // console.log('dataService.user '+ user);
    await this.storage.set(Constants.CURRENT_USER, user);
  }

  //Find User
  async findUser(credential: any): Promise<any> {
    // console.log('findUser.Users start: '+ credential.username);
    return this.storage.get(Constants.USER_DATA).then(u => {
    const users = u;
      if(users){
        // console.log('findUser.Users found: '+ users.length);
        return users.find((x: any) => (x.username === credential.username && x.password === credential.password));
      } else {
        return null;
      }
    });
  }

  //Get User information
  async getUserInfo(): Promise<User | null>{
    const user_id = localStorage.getItem('uid');
    if(user_id == null || user_id == '0' || user_id == '') {
      this.router.navigate(['login']);
      return null;
    }
    const url = 'user-detail?id='+user_id;
    try {
      const res: any = await this.apiServ.get_private(url);
      if (res && res.data) {
        const jsonData = {
          id: res.data.id,
          username : res.data.username,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          display_name : res.data.display_name,
          email: res.data.email,
          phone_number: res.data.phone_number,
          login_type: res.data.login_type,
          profile_image: res.data.profile_image,
          role: res.data.role, // coach or client
          last_notification_seen: res.data.last_notification_seen,
          notifications: res.data.notifications,
          age: res.data.user_profile.age,
          birthday: res.data.user_profile.birthday,
          address: res.data.user_profile.address,
          go_diet: res.data.user_profile.go_diet,
          years: res.data.user_profile.years,
          month: res.data.user_profile.month,
          days: res.data.user_profile.days,
          times_per_week: res.data.user_profile.times_per_week,
          gender: res.data.gender,
          weight: res.data.user_profile.weight,
          height: res.data.user_profile.height,
          currency_id: new Single({id: 1, name: "AUD"}),
          sporting_level: res.data.user_profile.sporting_level
        };
        let user = new User(jsonData);
        return user; // Return the data directly
      }
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //Save User login Data
  setUserLogin(data: any){
    return this.storage.set(Constants.USER_LOGIN, data);
  }
  
  //Retrieve User login data
  getUserLogin(){
    return this.storage.get(Constants.USER_LOGIN);
  }

  //Save Server data information
  setHosting(data: any){
    return this.storage.set(Constants.HOSTING, data);
  }

  //Retrieve Server data information
  getHosting(){
    return this.storage.get(Constants.HOSTING);
  }

  setToken(token: any): void{
    this.removeToken();
    this.storage.set(Constants.TOKEN_KEY, token);
  }

  getToken(): Promise<string>{
    return this.storage.get(Constants.TOKEN_KEY);
  }

  setRefreshToken(token: any){
    this.storage.set(Constants.REFRESHTOKEN_KEY, token);
  }

  getRefreshToken(): Promise<string>{
    return this.storage.get(Constants.REFRESHTOKEN_KEY);
  }

  setCurrentCredentials(credential: ICredential){
    this.storage.set(Constants.CURRENT_CREDENTIALS, credential);
  }

  getCurrentCredentials(): Promise<ICredential>{
    return this.storage.get(Constants.CURRENT_CREDENTIALS);
  }

  removeToken(){
    // console.log('start logging out');
    this.storage.remove(Constants.TOKEN_KEY);
    this.storage.remove(Constants.REFRESHTOKEN_KEY);
    this.storage.remove(Constants.CURRENT_USER);
    // console.log('finished logging out');
  }

  async getObjectives(): Promise<Single[] | null> {
    let objectiveList: Single[] = [];
    const url = 'objective-list';
    try {
      const res: any = await this.apiServ.get_private(url); 
      if(res.data) {
        res.data.map((row:any)=>{
          const singleData = {id: row.id, name: row.title};
          const newSingle = new Single(singleData);
          objectiveList.push(newSingle);
        })
      }
      return objectiveList;
    } catch (error) {
      
    }
    return objectiveList;
  }

  getItem(key: string): Promise<any>{
    return this.storage.get(key);
  }

  removeItem(key: string){
    this.storage.remove(key);
  }

  setItem(key: string, data: any) {
    return this.storage.set(key, data);
  } 

  //Used to merge data
    //Used to merge data
  async mergeData(key: string, data: any[], options?: any){
    
    let results: any[] = [];
    // let dump_data = data.map(elt => elt);
    const rep: any[] = await this.getItem(key);

    if(rep){
      results = rep.filter(elt => elt.id!=0);
      // results = results.filter(elt => elt.id!=0);
      for (let j = 0; j < data.length; j++) {

        const idx_elt = results.findIndex(elt => elt.id == data[j].id);
        if(idx_elt>-1){
          results[idx_elt] = data[j]; 
        }else{
          results.push(data[j]);
        }
      }

    }else{
      results = data;
    }
    // console.log(data)
    // results = results.concat(data);
    // console.log(results);
    this.setItem(key, results);
  }

  //This method clear data on database
  clearData(){
    return this.storage.clear();
  }

  /**
   * This method is used to group element
   * by date
   * @param data any[]
   * @returns 
   */
  groupByDate(data: any[]){
    // this gives an object with dates as keys
    const groups = data.reduce((groups, obj: any) => {
      const date = moment(obj.create_date).format('YYYY-MM-DD');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(obj);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        games: groups[date]
      };
    });

    return groupArrays.reverse();
  }
}
