/** Cette classe définit l'objet channel  (pour la gestion du namee mail.channel) **/

import { SingleObjet } from "./entity";

export class Channel {

    public id: number;
    public name: string;
    public channel_type: string;
    public description: string;
    public is_private: number;
    public coach_id: number;
    public user_ids: number[];
    public unread_counts: number;
    public avatar: string;
    public message_counts: number;
    public created_at:string;
    public updated_at:string;
  
    /*
     * 
     * @param serverJSON JSONObject, il s'agit des données qui proviennent du server ou 
     *                                d'une autre soruce
     */
    constructor(serverJSON?: any) {
      if(serverJSON!=undefined)
        this.setMessage(serverJSON);
      else
        this.initObjet();
    }
  
    //Cette fonction permet de générer un tableau
    //d'identifiant
    private getIdTabs(liste: any[]){
  
      let tab = [];
  
      for (var i = 0; i < liste.length; i++) {
          tab.push(liste[i].me);
      }
  
      return tab;
    } 
  
  
    /** Cette fonction permet de définir 
     * les valeurs des champs
     * @param data JSONObject, il s'agit des données JSON du serveur
     *
     ***/
    private setMessage(data : any){
      this.id = data.id;
      if(data.name===undefined || !data.name){
        this.name = "";
      }else{
        this.name = data.name;
      }

      if(data.channel_type===undefined || !data.channel_type){
        this.channel_type = "";
      }else{
        this.channel_type = data.channel_type;
      }

      if(data.description===undefined || !data.description){
        this.description = "";
      }else{
        this.description = data.description;
      }

      if(data.is_private===undefined || !data.is_private){
        this.is_private = 0;
      }else{
        this.is_private = data.is_private;
      }

      if(data.coach_id===undefined || !data.coach_id){
        this.coach_id = 0;
      }else{
        this.coach_id = data.coach_id;
      }

      if(data.user_ids===undefined || !data.user_ids){
        this.user_ids = [];
      }else{
        this.user_ids = data.user_ids;
      }

      if(data.unread_counts===undefined || !data.unread_counts){
        this.unread_counts = 0;
      }else{
        this.unread_counts = data.unread_counts;
      }

      if(data.avatar===undefined || !data.avatar){
        this.avatar = "";
      }else{
        this.avatar = data.avatar;
      }

      if(data.message_counts===undefined || !data.message_counts){
        this.message_counts = 0;
      }else{
        this.message_counts = data.message_counts;
      }

      if(data.created_at===undefined || !data.created_at){
        this.created_at = "";
      }else{
        this.created_at = data.created_at;
      }

      if(data.updated_at===undefined || !data.updated_at){
        this.updated_at = "";
      }else{
        this.updated_at = data.updated_at;
      }
    }
  
    //Initialisation des données
    private initObjet(){
      this.id = 0;
      this.name = "";
      this.channel_type = "";
      this.description = "";
      this.is_private = 0;
      this.coach_id = 0;
      this.user_ids = [];
      this.unread_counts = 0;
      this.avatar = "";
      this.message_counts = 0;
      this.created_at = "";
      this.updated_at = "";
    }
  
  
  }
  