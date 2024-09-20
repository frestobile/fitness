import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { AgentService } from 'src/app/providers/agent.service';
import { AlertService } from 'src/app/providers/alert.service';
import { ChatService } from 'src/app/providers/chat.service';
import { DataService } from 'src/app/providers/data.service';
import { Channel } from 'src/models/channel';
import { Constants } from 'src/models/contants.models';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.page.html',
  styleUrls: ['./messagerie.page.scss'],
})
export class MessageriePage implements OnInit {
  
  @ViewChild('modalChannel', {static: true}) modalChannel: IonModal;
  lang: string;
  current_user: User;
  channels: Channel[] = [];
  is_pending: boolean;
  optionsMessage = {
    text:"Vous n'avez aucune discussion pour le moment"
  };
  is_channel: boolean = true;
  channel_type: string;
  objChannel: any = {};
  is_created: boolean;

  constructor(
    private chatServ: ChatService,
    private dataServ: DataService,
    private router: Router,
    private agentServ: AgentService,
    private alertServ: AlertService
  ) { }

  ngOnInit() {
    this.initializeView();
  }

  //This method is used to initialize
  async initializeView(){
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    
  }
  
  ionViewDidEnter(){
    this.iniateChannel();
  }

  //This method is used to initiate user and channels 
  async iniateChannel(){
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{
      
    }
    this.getChannels();
  }

  //This method is used to channels
  async getChannels(){

    this.is_pending = true;
    try {
      const filter = { user_id: this.current_user.id };
      const channels_data = await this.chatServ.getMessageChannelList(filter);
      this.channels = [];
      for (let k = 0; k < channels_data.length; k++) {
        let element = channels_data[k];
        element.user_ids = JSON.parse(element.user_ids);
        const new_channel = new Channel(element);
        this.channels.push(new_channel);
      }
      this.is_pending = false; 
    } catch (error) {
      this.is_pending = false;
    }   
  }

  //User can join a group
  joinGroup(item: Channel){
    let tabs = item.user_ids;
    tabs.push(this.current_user.id);

    const toSend = {
      channel_partner_ids: tabs,
      id: item.id
    };

    // console.log(toSend);  
    this.agentServ.updateData("channel", item.id, toSend).then(rep=>{
      this.alertServ.presentToast("Vous avez intégrer le groupe");
    }).catch(err=>{

    });
  }

  //This method is used to go to the next
  goToChat(item: Channel){
    if(item.user_ids.indexOf(this.current_user.id)<=-1){
      return;
    }
    this.router.navigate(['app/tabs/chat/1'], {state: item});
  }

}
