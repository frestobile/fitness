import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
import { Observable, from, of, forkJoin } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { AlertService } from './alert.service';

// import { take } from 'rxjs/operators';
// import { OdooService } from './odoo.service.ts';
import { DataService } from './data.service';

const STORAGE_REQ_KEY = 'STORED-REQUEST';

interface StoredRequest {
  url: string;
  type: string;
  data: any;
  obj_headers:any;
  time: number;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfflineManagerService {

  constructor(private dataService: DataService,
    // private odooServ: OdooService,
    // private authService: AuthService,
    // private httpService: HttpService,
    private alertService: AlertService
    ) { }


   relogin() : Observable<any> {
    return from(this.dataService.getUserInfo()).pipe(
      switchMap(user => {
        if (user) {
          return of(user);
          // return from(this.odooServ.initConnexion({username: user.username, password: user.password, lang: 'fr'}));
        } else {
         // console.log('relogin user Not Found');
          return of(false);
        }
      })
    );

  }

  checkForEvents(): Observable<any> {
    return from(this.dataService.getItem(STORAGE_REQ_KEY)).pipe(
      switchMap(storedOperations => {
        const storedObj = JSON.parse(storedOperations);
        if (storedObj && storedObj.length > 0) {
          return this.sendRequests(storedObj).pipe(
            finalize(() => {
              this.alertService.informToast(`Votre travail a été synchronisé avec le serveur !`);
              this.dataService.removeItem(STORAGE_REQ_KEY);
            })
          );
        } else {
          // console.log('no local events to sync');
          return of(false);
        }
      })
    );
  }

  storeRequest(url: any, type:string, data: any, obj_headers?: any) : Promise<any>{

    const action: StoredRequest = {
       url,
       type,
       data,
       obj_headers,
      time: new Date().getTime(),
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5)
    };
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    return this.dataService.getItem(STORAGE_REQ_KEY).then((storedOperations: any) => {
      let storedObj = JSON.parse(storedOperations);
      if (storedObj) {
        storedObj.push(action);
      } else {
        storedObj = [action];
      }
      // Save old & new local transactions back to Storage
      this.alertService.informToast(`Votre travail a été enregistré. Il sera mis en ligne une fois que vous serez connecté à Internet`);
      // console.log('Make one request.data: '+ JSON.stringify(storedObj));
      return this.dataService.setItem(STORAGE_REQ_KEY, JSON.stringify(storedObj));
    });
  }

  sendRequests(operations: StoredRequest[], objHeaders?:any) {
    const obs = [];
    for (const op of operations) {
      /*console.log('Make one request.data: '+ JSON.stringify(op.data));
      console.log('Make one request.url: '+ op.url);
      console.log('Make one request.type: '+ op.type);*/
     // var params = JSON.stringify(op.data);
      let oneObs = null;
      // if(op.type === 'POST'){
      //    oneObs = from(this.odooServ.addObjetToOdoo(op.url, op.data));
      //   //  oneObs =  this.httpService.post(op.url,  op.data, { observe: 'response', headers: op.obj_headers });
      // } else if(op.type === 'PUT') {
      //    oneObs = from(this.odooServ.updateObjetToOdoo(op.url, op.obj_headers, op.data));
      //    //  oneObs = this.httpService.get(op.url,  op.data);
      // }else if(op.type === 'DELETE'){
      //   oneObs = from(this.odooServ.deleteObjetToOdoo(op.url, op.data));
      // }else{
      //   oneObs = from(this.odooServ.requestActionToOdoo(op.url, op.data));
      // }

      obs.push(oneObs);
    }

    // Send out all local events and return once they are finished
    return forkJoin(obs);
  }

}
