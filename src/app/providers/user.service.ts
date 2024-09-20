import { Injectable } from '@angular/core';
// import { OdooService } from './odoo.service.ts_';
import { ApiService } from './api.service';
import { User } from 'src/models/user';
import * as moment from 'moment';
import { Message } from 'src/models/message';
import { DataService } from './data.service';
import { Abonne } from 'src/models/followers';
import { Single } from 'src/models/single';
import { Etiquette } from 'src/models/etiquette';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private readonly apiController: string = 'api/v1/patients';
  private readonly PARTNER_ = 'partner';
  private readonly CURRENT_PARTNER_ = 'current-partner';
  private readonly MESSAGE_ = 'message';
  private readonly USERS_ = 'user';
  private readonly EMPLOYEE_ = 'followers';
  private readonly COUNTRY_ = 'country';
  private readonly TAG_ = 'etiquette';

  constructor(
    // private odooServ: OdooService,
    private apiServ: ApiService,
    private dataServ: DataService
  ) { }

  /**
   * This method is used to get users online
   * @returns Promise<Partner[]>
   */
  getUserByEmail(email: any): Promise<User[]>{
    let url = "";
    return new Promise(async (resolve, reject)=>{
      url = 'user-by-email?email=' + email;
      this.apiServ.get_public(url).then((res:any)=>{
        let elt_membres = null;
        if(res && res.data) {
          elt_membres = res.data;
        }
        resolve(elt_membres);
      }).catch(err=>{
        reject(err);
      });
    });
  }

  getUserList(user_ids: any): Promise<any> {
    const url = "get-user-list";
    return new Promise(async (resolve, reject)=>{
      this.apiServ.post_private(url, user_ids).then((res: any)=>{
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  getClientList() : Promise<any> {
    const url = 'get-client-list';
    return new Promise(async(resolve, reject) => {
      this.apiServ.get_private(url).then((res: any)=>{
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  /**
   * This method is used to get a specific user
   * @returns Promise<Partner>
   */
  loginByEmail(credentials: any): Promise<User | undefined>{
    return new Promise(async (resolve, reject)=>{
      const url = 'login';
      this.apiServ.post_public(url, credentials).then((res:any)=>{
        this.dataServ.setUserInfo(res.data);
        resolve(res);
      }).catch(err=>{
        reject(err);
      });
    });
  }

  /**
   * This method is used to get a specific user
   * @returns Promise<User[]>
   */
  getUserById(user_id: number): Promise<User>{
    const url = 'user-detail?id='+user_id;
    return new Promise(async (resolve, reject)=>{
      this.apiServ.get_private(url).then((res:any)=>{
        let elt_membres = null;
        if(res && res.data) {
          elt_membres = res.data;
        }
        resolve(elt_membres);
      }).catch(err=>{
        reject(err);
      });
    });

  }

  registerUser(userData: any): Promise<any> {
    return new Promise(async (resolve, reject)=>{
      const url = 'register';
      this.apiServ.post_public(url, userData).then((res:any)=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      });

    });
  }

  updateUser(userData:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const url = 'update-profile';
      this.apiServ.post_private(url, userData).then((res:any)=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  uploadProfileImage(profileImage: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const url = 'upload-profile-image';
      this.apiServ.post_private(url, profileImage).then((res:any)=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  /**
   * This method is used to get a specific parter
   * @returns Promise<Partner>
   */
  getPartnerById(user_id: number): Promise<User>{

      return new Promise(async (resolve, reject)=>{

        const filter = {"user_ids": ['in', [user_id]]};

        // this.odooServ.requestObjectToOdoo(this.PARTNER_, filter).then((rep:any)=>{
        //   resolve(new Client(rep[0]));
        // }).catch(err=>{
        //   reject(err);
        // });

      });
  }

  async getNotificationList(user_id: number): Promise<any> {
    const url = 'package-notifications?user_id='+user_id;
    try {
      const res = await this.apiServ.get_private(url);
      return res;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async getCustomNotifications(package_type: string) : Promise<any> {
    const url = 'get-custom-notifications?package_type='+package_type;
    try {
      const res = await this.apiServ.get_private(url);
      return res.data;
    } catch (error) {

    }
  }

  async getNotificationDetail(id: number) : Promise<any> {
    const url = 'notification-detail?id='+id;
    try {
      const res = await this.apiServ.get_private(url);
      return res.data;
    } catch (error) {

    }
  }


  //Store List of partners
  storeMembers(data: User[]){
    // this.dataServ.setItem('_ona_'+this.PARTNER_, data);
    this.dataServ.mergeData('_ona_'+this.PARTNER_, data);
    this.dataServ.setItem('_ona_' + this.PARTNER_ + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }

  //This method is used to add user on Partner table
  async addUser(data: User){
    const rep = await this.dataServ.getItem('_ona_'+this.PARTNER_);
    let result: User[] = [];
    if(rep) result = rep;

    result.push(data);
    this.dataServ.setItem('_ona_'+this.PARTNER_, result);
  }

  //This method is used to add message on Message table
  async addMessage(data: Message){
    const rep = await this.dataServ.getItem('_ona_'+this.MESSAGE_);
    let result: Message[] = [];
    if(rep) result = rep;

    result.push(data);
    this.dataServ.setItem('_ona_'+this.MESSAGE_, result);
  }

  //Retrieve list of message
  getListMessages(): Promise<Message[]>{
    return this.dataServ.getItem('_ona_'+this.MESSAGE_);
  }


  //Retrieve list of users offline
  getListUsers(): Promise<User[]>{
    return this.dataServ.getItem('_ona_'+this.PARTNER_);
  }

  //this method is used to store current partner
  storeCurrentPartner(data: User){
    this.dataServ.setItem('_ona_'+this.CURRENT_PARTNER_, data);
  }

  //Retrieve current Partner
  getCurrentPartner(): Promise<User>{
    return this.dataServ.getItem('_ona_'+this.CURRENT_PARTNER_);
  }

  getFollowingCoaches(client_id: any): Promise<any> {
    return new Promise(async(resolve, reject) => {
      const url = "get-following-coaches?client_id="+client_id;
      this.apiServ.get_private(url).then((res: any)=>{
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    });
  }

  getCoachDetail(coach_id: any) : Promise<any> {
    return new Promise(async(resolve, reject)=>{
      const url = "get-coach-detail?coach_id="+coach_id;
      this.apiServ.get_private(url).then((res: any)=>{
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  /**
   * This method is used to count Abonne
   * @returns Promise<number>
   */
  countOnlineAbonne(filter: any = null): Promise<any>{
    return new Promise(async (resolve, reject)=>{
      // this.odooServ.requestCountObjectToOdoo(this.EMPLOYEE_, filter).then((rep:any)=>{
      //   resolve(rep);
      // }).catch(err=>{
      //   reject(err);
      // });

    });

  }

  /**
   * This method is used to search specific data
   *
   * @param table string, table's name
   * @param filter any, request for filtering (JSobject)
   * @returns Promise<number[]>
   */
  searchOnlineData(table: string, filter: any = null): Promise<any>{

    return new Promise(async (resolve, reject)=>{

      // this.odooServ.requestIdsObjectToOdoo(table, filter).then((rep:any)=>{
      //   resolve(rep);
      // }).catch(err=>{
      //   reject(err);
      // });

    });
  }

  //This method is used to retrieve countries
  getOnlineCounties(): Promise<Single[]>{
    return new Promise(async (resolve, reject)=>{
      const _res =  await this.dataServ.getItem('_ona_' + this.COUNTRY_ + '_date');
      console.log("res::: ", _res);
      const _last_update_query = _res ? { last_update: _res } : null;
      // console.log(_res);

      // this.odooServ.requestObjectToOdoo(this.COUNTRY_, null).then((rep:any)=>{
      //   let results: Single[] = [];
      //   // alert(JSON.stringify(rep));
      //   rep.forEach((elt: any) => results.push(new Single(elt)));
      //   resolve(results);

      // }).catch(err=>{
      //   // alert(JSON.stringify(err));
      //   reject(err);
      // });

    });
  }

  //sotre List of countryList
  async storeCountriesList(data: any){

    await this.dataServ.mergeData('_ona_'+this.COUNTRY_, data);
    await this.dataServ.setItem('_ona_'+this.COUNTRY_ + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }

  getCountriesList(){
    return this.dataServ.getItem('_ona_'+this.COUNTRY_);
  }

  //This method is used to retrieve etiauettes
  getOnlineTags(filter: any = null): Promise<Etiquette[]>{

    return new Promise(async (resolve, reject)=>{

      const _res =  await this.dataServ.getItem('_ona_' + this.TAG_ + '_date');
      //const _last_update_query = _res ? { last_update: _res } : null;

      // this.odooServ.requestObjectToOdoo(this.TAG_, filter).then((rep:any)=>{
      //   let results: Etiquette[] = [];
      //   rep.forEach((elt: any) => results.push(new Etiquette(elt)));
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });

    });
  }
}
