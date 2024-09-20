import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from 'src/app/providers/agent.service';
import { ChatService } from 'src/app/providers/chat.service';
import { DataService } from 'src/app/providers/data.service';
import { Channel } from 'src/models/channel';
import { Constants } from 'src/models/contants.models';
import { Message } from 'src/models/message';
// import { Client } from 'src/models/client';
import { User } from 'src/models/user';
import * as moment from 'moment';
import { AlertController, IonContent, IonModal, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, AfterViewChecked {

  @ViewChild('content') content: IonContent;
  @ViewChild('popover') popover: any;
  @ViewChild('modal') modal: IonModal;

  current_channel: Channel | any;
  messages: Message[] = [];
  is_pending: boolean;
  isPop: boolean = false;
  objMessage = {
    text:"Aucun échange dans ce groupe"
  }
  current_user: User;
  lang: string;
  txtMessage: string = "";
  is_infos: boolean = false;
  imagePublic: string = "assets/imgs/sample/sample.png";
  imagePrivate: string = "assets/imgs/sample/sample.png";
  imageCoach: string = "assets/imgs/sample/sample.png";
  group_messages: { date: string; elements: Message[]; }[] = [];
  imageGroupe: string;
  members: User[] = [];
  is_channel: boolean;
  real_chat: string | null;
  partner: User | any;
  intervalId: any;
  constructor(
    private router: Router,
    private dataServ: DataService,
    private agentServ: AgentService,
    private alertServ: AlertService,
    private alertCtrl: AlertController,
    private nav: NavController,
    private activatedRoute: ActivatedRoute,
    private chatServ: ChatService,
    private userServ: UserService
  ) { }

  ngOnInit() {
    this.real_chat = this.activatedRoute.snapshot.paramMap.get("id");
    const item: any = this.router.getCurrentNavigation()?.extras.state;
    console.log("item: ", item,  this.real_chat);
    this.current_channel = item;
    this.is_channel = true;
    // this.imageGroupe = this.current_channel.is_private==0 ? this.imagePublic:this.imagePrivate;
    this.initializeView();
  }

  ngAfterViewChecked(){
    if(this.content){
      //console.log(this.content);
      this.content.scrollToBottom();
    }
  }

  ionViewWillEnter(){

  }

  //This method is used to load messages
  async initializeView(){
    const userInfo = await this.dataServ.getUserInfo();
    if(userInfo) {
      this.current_user = userInfo;
    }else{

    }
    this.lang = await this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    await this.getListOfMembers();
    await this.getOnlineMessages();
    await this.updateMessages();
  }

  //This method is used to get list of members
  async getListOfMembers(){
    try {
      if(this.current_channel) {
        const user_ids = this.current_channel.user_ids;
        const user_data = {user_ids: user_ids}
        const user_res = await this.userServ.getUserList(user_data);
        this.members = [];
        for(let i = 0; i < user_res.length; i++)
        {
          const new_user = new User(user_res[i]);
          this.members.push(new_user);
        }
        this.partner = this.members.find(mem=>mem.id != this.current_user.id);
        this.imageGroupe = this.partner?.profile_image;
      }
    } catch (error) {

    }
  }

  async getOnlineMessages() {
    const filter = {channel_id: this.current_channel.id};
    this.is_pending = true;
    this.chatServ.getOnlineMessages(filter).then((rep)=>{
      this.group_messages = this.chatServ.groupByDate(rep);
      this.messages = rep;
      this.is_pending = false;
      this.content.scrollToBottom();
    }).catch(err=>{
      this.is_pending = false;
    });
  }

  async updateMessages() {
    this.intervalId = setInterval(async ()=>{
      const updated_messages = await this.chatServ.getUpdatedMessages(this.current_channel.id, this.partner?.id );
      if(updated_messages.length > 0) {
        const lastIndex = this.group_messages.length==0 ? 0 : this.group_messages.length - 1;
        const message_date : string  = moment(updated_messages[0].created_at).format('YYYY-MM-DD');
        const last_date : string = (this.group_messages.length==0 || this.group_messages[lastIndex].elements.length==0) ? message_date : moment(this.group_messages[lastIndex].elements[0].created_at).format('YYYY-MM-DD');

        if(this.group_messages.length > 0) {
          if(message_date == last_date){
            updated_messages.map((msg:Message)=>{
              this.group_messages[lastIndex].elements.push(msg);
            });
          }else{
            const objet_message = {
              date: message_date,
              elements : updated_messages
            };
            this.group_messages.push(objet_message);
          }
        }
      }
    }, 2000);
  }

  //This method is used to send message
  sendMessage(){
    if(this.txtMessage===undefined || this.txtMessage==""){
      return;
    }

    let myMessage = new Message();
    //On préremplie le champ
    myMessage.body = this.txtMessage;
    // myMessage.channel_ids.push(this.currentChannel.id);
    myMessage.message_type = "comment";
    myMessage.author_id = this.current_user.id;
    myMessage.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    myMessage.model = "mail.channel";
    myMessage.channel_id = this.current_channel.id;

    this.chatServ.createMessage(myMessage).then(rep=>{
      console.log(rep);

      myMessage = new Message(rep);

      const lastIndex = this.group_messages.length==0 ? 0 : this.group_messages.length - 1;
      const message_date : string  = moment(myMessage.created_at).format('YYYY-MM-DD');
      const last_date : string = (this.group_messages.length==0 || this.group_messages[lastIndex].elements.length==0) ? message_date : moment(this.group_messages[lastIndex].elements[0].created_at).format('YYYY-MM-DD');

      if(this.group_messages.length > 0) {
        if(message_date == last_date){
          this.group_messages[lastIndex].elements.push(myMessage);
        }else{
          const objet_message = {
            date: message_date,
            elements : [myMessage]
          };
          this.group_messages.push(objet_message);
        }
      }else{
        this.group_messages = [{ date: message_date, elements: [myMessage] }];
        this.messages = [myMessage];
      }
      //this.messages.push(myMessage);
      //this.group_messages = this.chatServ.groupByDate(this.messages).sort((a, b)=> new Date(a.date).getTime() - new Date(b.date).getTime());
      this.txtMessage = "";
      this.content?.scrollToBottom();
    }).catch(err=>{
      console.log(err);
      this.alertServ.errorToast("Erreur Internet ou un problème est survenu. Veuillez réessayer ultérieurement.");
    });
  }

  //Go back to the list of group
  closeDiscussion(){
    if(this.real_chat)
      this.nav.navigateBack("/app/tabs/messagerie");
    else
      this.nav.navigateBack("/app/tabs/home");

    this.popover.dismiss();
  }

  //This method is used to leave a group
  leaveGroup(){
    this.popover.dismiss();
    this.presentAlertConfirm();
  }

  //This method is used to show group profile
  showGroupe(){
    this.popover.dismiss();
    if(!this.real_chat)
      this.is_infos = true;
    else{
      console.log(this.partner);
      localStorage.setItem("temp_p", JSON.stringify(this.partner));
      this.router.navigate(['statistics']);
    }
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isPop = true;
  }

  //This method is us to know if user confirm to leave a group
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Quitter le groupe',
      message: "Voulez vous quitter le groupe ? En quittant le groupe vous n'aurez plus accès à ce groupe",
      buttons: [
        {
          text: 'NON',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'OUI',
          handler: () => {
            this.current_channel.channel_partner_ids = this.current_channel.channel_partner_ids.filter((elt:number) => elt!= this.current_user.id);
            const toUpdate = {
              id: this.current_channel.id,
              channel_partner_ids: this.current_channel.channel_partner_ids
            };

            this.agentServ.updateData("channel", this.current_channel.id, toUpdate).then((rep:any)=>{
              this.alertServ.presentToast("Vous avez quitter le groupe");
              this.nav.navigateBack("/app/tabs/messagerie");
            }).catch(err=>{
              this.alertServ.errorToast("Une erreur est survenu veuillez réessayer ultérieurement");
            });
          }
        }
      ]
    });
    await alert.present();
  }

  //This method is used to close Infos
  onCloseInfos(){
    this.modal.dismiss();
  }

  //This method is used to set image of user or default image
  getImage(image_128: string){
    const default_image: string = 'assets/imgs/bg_customer.jpg';
    return image_128 ? Constants.PREFIX_BASE64+image_128 : default_image;
  }

  onBack() {
    this.nav.back();
  }

  //This method is used to see all members
  seeAll(){

  }

  ngOnDestroy(): void {
    // Clear the interval when the page is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('Interval cleared');
    }
  }

}
