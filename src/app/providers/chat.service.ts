import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Message } from 'src/models/message';
import { Channel } from 'src/models/channel';
import * as moment from 'moment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly PRODUIT_ = 'message';
  private readonly CAT_ = 'channel';

  constructor(
    private apiServ: ApiService,
    private dataServ: DataService
  ) { }

  /**
   * This method is used to get messages online
   * @returns Promise<Message[]>
   */
  getOnlineMessages(filter: any = null): Promise<Message[]>{
    return new Promise(async (resolve, reject)=>{
      const url = "message/list";
      this.apiServ.post_private(url, filter).then((res:any)=>{
        let results: Message[] = [];
        const msg_list = res.items.data;
        msg_list.forEach((elt: any) => results.push(new Message(elt)));
        resolve(results);

      }).catch(err=>{
        reject(err);
      });

    });
  }

  getUpdatedMessages(channel_id: number, author_id: any): Promise<Message[]>{
    return new Promise(async(resolve, reject)=>{
      const url = "message/updated";
      const filter = {channel_id: channel_id, author_id: author_id};
      this.apiServ.post_private(url, filter).then((res:any)=>{
        let results: Message[] = [];
        const msgs = res.items;
        msgs.forEach((elt: any) => results.push(new Message(elt)));
        resolve(results);
      }).catch(err=>{
        reject(err);
      });
    })
  }

  /**
   * This method is used to get channels online
   * @returns Promise<Channel[]>
   */
  getOnlineChannels(filter: any = null): Promise<Channel[]>{

    return new Promise(async (resolve, reject)=>{

      const url = "get-private-channel";
      this.apiServ.post_private(this.CAT_, filter).then((rep:any)=>{
        let results: Channel[] = [];
        rep.forEach((elt: any) => results.push(new Channel(elt)));
        resolve(results);

      }).catch(err=>{
        reject(err);
      });
    });
  }

  getMessageChannel(filter: any = null): Promise<any> {
    return new Promise(async (resolve, reject)=>{
      const url = "message/get-message-channel";
      this.apiServ.post_private(url, filter).then((res:any)=>{
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      });

    });
  }

  getMessageChannelList(filter: any = null): Promise<any> {
    return new Promise(async (resolve, reject)=>{
      const url = "message/message-channel-list";
      this.apiServ.post_private(url, filter).then((res: any)=>{
        console.log("channel list: ", res);
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })

    })
  }

  //
  createMessage(data: any): Promise<any> {
    return new Promise(async (resolve, reject)=>{
      const url = "message/store";
      this.apiServ.post_private(url, data).then((res: any)=>{
        console.log("message data: ", res);
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  //Store List of messages
  storeMessages(data: Message[]){
    this.dataServ.mergeData('_ona_'+this.PRODUIT_, data);
    this.dataServ.setItem('_ona_' + this.PRODUIT_ + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }

  //Retrieve list of channels
  getListMessages(): Promise<Message[]>{
    return this.dataServ.getItem('_ona_'+this.PRODUIT_);
  }

  //Store List of channels
  storeChannels(data: Channel[]){
    this.dataServ.mergeData('_ona_'+this.CAT_, data);
    this.dataServ.setItem('_ona_' + this.CAT_ + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }

  //Retrieve list of channels
  getListChannels(): Promise<Channel[]>{
    return this.dataServ.getItem('_ona_'+this.CAT_);
  }

  /**
   * This method is used to group element
   * by date
   * @param data any[]
   * @returns
   */
  groupByDate(data: Message[]){

    data = data.sort((a, b) => a.id - b.id);
    // this gives an object with dates as keys
    const groups = data.reduce((groups:any, obj: Message) => {
      const date = moment(obj.created_at).format('YYYY-MM-DD');
      if (!groups[date]) {
        groups[date] = [];
      }
      if(obj.message_type=="comment")
      groups[date].push(obj);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        elements: groups[date]
      };
    });

    return groupArrays;
  }

}
