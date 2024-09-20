import { Contravention } from "./contavention";

export class Sinistre extends Contravention{

    public repair: boolean;
    public repair_date: string;
    fortuitous: boolean;
  nature_of_damaged_installation: string;

    constructor(serverJSON?: any){
        super(serverJSON);

        if(serverJSON!==undefined)
            this.loadData(serverJSON);
        else
            this.initiateData();
    }

    private loadData(data: any){

      if(data.me.fortuitous===undefined || !data.me.fortuitous.me)
        this.fortuitous = false;
      else
        this.fortuitous = data.me.fortuitous.me;

      if(data.me.repair===undefined || !data.me.repair.me)
        this.repair = false;
      else
        this.repair = data.me.repair.me;
      
      if(data.me.repair_date==undefined || !data.me.repair_date.me)
        this.repair_date = "";
      else
        this.repair_date = data.me.repair_date.me;

      if(data.me.nature_of_damaged_installation==undefined || !data.me.nature_of_damaged_installation.me)
        this.nature_of_damaged_installation = "";
      else
        this.nature_of_damaged_installation = data.me.nature_of_damaged_installation.me;
    }

    private initiateData(){
        this.repair_date = "";
        this.nature_of_damaged_installation = "";
        this.repair = false;
        this.fortuitous = false;
    }

}