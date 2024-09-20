import { Injectable } from '@angular/core';
import { OdooService } from './odoo.service.ts';
import { DataService } from './data.service';
import { Contravention } from 'src/models/contavention';

import * as moment from 'moment';
import { ContraventionType } from 'src/models/etiquette';
import { Single } from 'src/models/single';

@Injectable({
  providedIn: 'root'
})
export class ContraventionService {

  private readonly CONTRAVENTION = 'contravention';
  private readonly SINISTRE_ = 'sinistre';
  private readonly CONTRAVENTION_TYPE_ = 'type_contravention';
  private readonly MODELS_ = 'model_pv';
  private readonly TRIGGERING_ = 'triggering';
  private readonly OFFENSE_ = 'offense_reason';

  constructor(
    private odooServ: OdooService,
    private dataServ: DataService
  ) { }

  /**
   * This method is used to get Contraventions
   * @returns Promise<Contravention[]>
   */
  getOnlineContraventions(): Promise<Contravention[]>{

    return new Promise(async (resolve, reject)=>{

      const _res =  await this.dataServ.getItem('_ona_' + this.CONTRAVENTION + '_date');
      const _last_update_query = _res ? { last_update: _res } : null;
  
      this.odooServ.requestObjectToOdoo(this.CONTRAVENTION, _last_update_query).then((rep:any)=>{
        let results: Contravention[] = [];
        rep.forEach((elt: any) => results.push(new Contravention(elt)));
        resolve(results);

      }).catch(err=>{
        reject(err);
      });

    });
    
  }



  //Store List of contraventions
  storeContraventions(data: Contravention[], options?: string){
    this.dataServ.mergeData('_ona_'+this.CONTRAVENTION, data, options);
    this.dataServ.setItem('_ona_' + this.CONTRAVENTION + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }

  //This method is used to add contravention
  async addContraventionLocal(data: Contravention){
    
    let contras: Contravention[] = [];
    const rep = await this.dataServ.getItem('_ona_'+this.CONTRAVENTION);
    contras = rep != null ? rep : [];
    contras.push(data);

    this.dataServ.setItem('_ona_'+this.CONTRAVENTION, contras);
    // this.dataServ.setItem('_ona_' + this.CONTRAVENTION + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }

  
  //Retrieve list of contraventions
  getListContraventions(): Promise<Contravention[]>{
    return this.dataServ.getItem('_ona_'+this.CONTRAVENTION);
  }


  //Store List of contravention types
  storeTypesContraventions(data: ContraventionType[], options?: string){
    this.dataServ.mergeData('_ona_'+this.CONTRAVENTION_TYPE_, data, options);
    this.dataServ.setItem('_ona_' + this.CONTRAVENTION_TYPE_ + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }

  //Retrieve list of types of contraventions
  getListTypeOfContraventions(): Promise<ContraventionType[]>{
    return this.dataServ.getItem('_ona_'+this.CONTRAVENTION_TYPE_);
  }

  //Store List of triggerings
  storeTriggerings(data: Single[], options?: string){
    this.dataServ.mergeData('_ona_'+this.TRIGGERING_, data, options);
    this.dataServ.setItem('_ona_' + this.TRIGGERING_ + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }
  
  //Retrieve list of types of Triggerings
  getListTriggerings(): Promise<Single[]>{
    return this.dataServ.getItem('_ona_'+this.TRIGGERING_);
  }

  //Store List of offense reasons
  storeOffenseReason(data: Single[], options?: string){
    this.dataServ.mergeData('_ona_'+this.OFFENSE_, data, options);
    this.dataServ.setItem('_ona_' + this.OFFENSE_ + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }
  
  //Retrieve list of offenses reason
  getListOffenseReason(): Promise<Single[]>{
    return this.dataServ.getItem('_ona_'+this.OFFENSE_);
  }

  //Return the current date
  getDateNow(): string{
    return moment().format('YYYY-MM-DD HH:mm');
  }

  //Return date according to a specific weeks
  getDeadline(days: number): string{
    return moment().add(days, 'days').format('YYYY-MM-DD');
  }


  // //Group list of peach line by product
  // groupByProduct(peach_lines: PeachLine[], property?: any){
    
  //   let result: GroupPeachLine[] = [];

  //   let tab_lines = peach_lines;
  //   for (let k = 0; k < tab_lines.length; k++) {
  //     const element = peach_lines[k];
  //     let tabs = [], rep: GroupPeachLine = {}, total_caisses: number = 0, total_poids: number = 0, to_transfer: number = 0;
  //     for(let j = 0; j<tab_lines.length; j++){

  //       if(tab_lines[j].product_id.id == element.product_id.id){
  //         tabs.push(tab_lines[j]);
  //         total_caisses+= tab_lines[j].number;
  //         total_poids += tab_lines[j].total_qty;
  //         to_transfer += tab_lines[j].state == "to_transfer" ? 1 : 0;
  //       }        
  //     }

  //     if(total_caisses!=0){
  //       rep = {
  //         id: element.product_id.id,
  //         product_id: element.product_id,
  //         unit: element.product_uom,
  //         poids: total_poids,
  //         caisses: total_caisses,
  //         to_transfer: to_transfer,
  //         tabs: tabs
  //       };
  //       result.push(rep); 
  //     }
  //   }

  //   // console.log(result);
  //   const resultat = result.filter((obj, index, array) => array.findIndex(t => t.id == obj.id) == index);
  //   // console.log(resultat);
  //   return resultat;
  // }

}
