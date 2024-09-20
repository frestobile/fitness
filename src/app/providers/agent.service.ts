import { OfflineManagerService } from './offline-manager.service';
// import { OdooService } from 'src/app/providers/odoo.service';
import { ConnectionStatus, NetworkService } from 'src/app/providers/network.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(
    private networkServ: NetworkService,
    // private odooServ: OdooService,
    private offlineManager: OfflineManagerService
  ) { }

  /**
   * This method is used to add data offline/online
   * @param type string, model name
   * @param data any, data to save
   * @returns 
   */
   createData(type: string, data: any): Promise<any> {
    
    if (this.networkServ.getCurrentNetworkStatus() === ConnectionStatus.Offline ) {
      // const url = `${environment.apiBaseUrl}/${this.apiController}`;
      return this.offlineManager.storeRequest(`${type}`, 'POST', data);
    }else{
      let data : any = null;
      return data;
      // return this.odooServ.addObjetToOdoo(type, data);
    }
  }

  /**
   * This method is used to update data offline/online
   * @param type string, model name
   * @param data any, data to save
   * @returns 
   */
  updateData(type: string, id:any, data: any): Promise<any> {
    
    if (this.networkServ.getCurrentNetworkStatus() === ConnectionStatus.Offline ) {
      return this.offlineManager.storeRequest(`${type}`, 'PUT', data, id);
    }else{
      console.log("update partner data: ", data);
      return data;
      // return this.odooServ.updateObjetToOdoo(type, id, data);
    }
  }

  /**
   * This method is used to delete data offline/online
   * @param type string, model name
   * @param ids number[], list of ids to delete
   * @returns 
   */
  deleteData(type: string, ids: number[]): Promise<any> {
    
    if (this.networkServ.getCurrentNetworkStatus() === ConnectionStatus.Offline ) {
      return this.offlineManager.storeRequest(`${type}`, 'DELETE', ids);
    }else{
      let data : any = null;
      return data;
      // return this.odooServ.deleteObjetToOdoo(type, ids);
    }
  }

  /**
   * This method is used to call Odoo method offline/online
   * @param type string, model name
   * @param data any, data to save
   * @returns 
   */
  remoteCallData(type: string, filter: any): Promise<any> {
    
    if (this.networkServ.getCurrentNetworkStatus() === ConnectionStatus.Offline ) {
      return this.offlineManager.storeRequest(`${type}`, 'ACTION', filter);
    }else{
      let data : any = null;
      return data;
      // return this.odooServ.requestActionToOdoo(type, filter);
    }
  }

  /**
   * This method is used to create and call method offline/online
   * @param type string, model name
   * @param action string, method to call
   * @param data any, data to save
   * @returns 
   */
    // create_remoteData(type: string, data: any, action: string): Promise<any> {
    
    //   if (this.networkServ.getCurrentNetworkStatus() === ConnectionStatus.Offline ) {
    //     return this.offlineManager.storeRequest(`${type}`, 'REMOTE', data, action);
    //   }else{
    //     return this.odooServ.combineCreateActionToOdoo(type, data, action);
    //   }
    // }

  /**
   * This method is used to convert time to decimal
   * @param time_of_passage string, time as HH:mm
   */
  convertToDecimal(time_of_passage: string): number{
    let result: number = 0.0;
    result = parseFloat(time_of_passage.replace(':','.'));
    // console.log(result);
    
    return result;
  }
  
}
