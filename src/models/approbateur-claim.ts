import { Approbateur } from "./approbateur";
import { SingleObjet } from "./entity";


export class ApprobateurClaim extends Approbateur{

    claim_id: SingleObjet;

    constructor(serverJSON?: any){
        super(serverJSON);

        if(serverJSON!==undefined)
            this.loadData(serverJSON);
        else
            this.initiateData();
    }

    private loadData(data: any){

        if(data.me.claim_id==undefined || !data.me.claim_id.me)
            this.claim_id = { id: 0, name: ''};
        else
            this.claim_id = { id: data.me.claim_id.me[0].me, name: data.me.claim_id.me[1].me };
    }

    private initiateData(){
        this.claim_id = { id: 0, name: ''};
    }

}