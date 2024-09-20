import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private availableLanguages: Array<{ code: string, name: string }>;
  private selected$: Subject<string> = new Subject<string>();
  
  constructor() { }

  public getLanguage(): Observable<string> {
      return this.selected$;
  }

  public setData(data: any) {
      this.selected$.next(data);
  }

  public listOfLanguages(){
    
    this.availableLanguages = [
      {
        code: 'en',
        name: 'English'
      }, 
      {
          code: 'fr',
          name: 'Français'
      }
    ];

    return this.availableLanguages;
  }


}
