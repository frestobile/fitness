import { Category } from 'src/models/category';
import { Injectable } from '@angular/core';
import { Produit } from 'src/models/produit';
import * as moment from 'moment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private readonly PRODUIT_ = 'produit';
  private readonly CAT_ = 'category';

  constructor(
    private dataServ: DataService
  ) { }

  /**
   * This method is used to get products online
   * @returns Promise<Produit[]>
   */
  // getOnlineProduct(): Promise<Produit[]>{

  //   return new Promise(async (resolve, reject)=>{

  //     const _res =  await this.dataServ.getItem('_ona_' + this.PRODUIT_ + '_date');
  //     const _last_update_query = _res ? { last_update: _res } : null;
  
  //     this.odooServ.requestObjectToOdoo(this.PRODUIT_, null).then((rep:any)=>{
  //       let results: Produit[] = [];
  //       rep.forEach((elt: any) => results.push(new Produit(elt)));
  //       resolve(results);

  //     }).catch(err=>{
  //       reject(err);
  //     });

  //   });
    
  // }

  /**
   * This method is used to get catetgories online
   * @returns Promise<Category[]>
   */
  // getOnlineCategories(): Promise<Category[]>{

  //   return new Promise(async (resolve, reject)=>{

  //     const _res =  await this.dataServ.getItem('_ona_' + this.CAT_ + '_date');
  //     const _last_update_query = _res ? { last_update: _res } : null;
  
  //     this.odooServ.requestObjectToOdoo(this.CAT_, null).then((rep:any)=>{
  //       let results: Category[] = [];
  //       rep.forEach((elt: any) => results.push(new Category(elt)));
  //       resolve(results);

  //     }).catch(err=>{
  //       reject(err);
  //     });

  //   });
    
  // }

  //Store List of product
  storeProduit(data: Produit[]){
    this.dataServ.mergeData('_ona_'+this.PRODUIT_, data);
    this.dataServ.setItem('_ona_' + this.PRODUIT_ + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }

  //Retrieve list of products
  getListProduct(): Promise<Produit[]>{
    return this.dataServ.getItem('_ona_'+this.PRODUIT_);
  }

  //Store List of categories
  storeCategories(data: Category[]){
    this.dataServ.mergeData('_ona_'+this.CAT_, data);
    this.dataServ.setItem('_ona_' + this.CAT_ + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }

  //Retrieve list of categories
  getListCategories(): Promise<Category[]>{
    return this.dataServ.getItem('_ona_'+this.CAT_);
  }
}
