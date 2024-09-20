import { Component, OnInit } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/providers/data.service';
import { LanguageService } from 'src/app/providers/events/language.service';
import { Constants } from 'src/models/contants.models';
import { ILanguage } from 'src/models/ilanguage';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
})
export class ChangeLanguagePage implements OnInit {

  defaultLanguageCode = 'en';
  languages: ILanguage[];

  constructor(
    // @Inject(APP_CONFIG) private config: AppConfig,
    private dataServ: DataService,
    private languageService: LanguageService,
    // private translate: TranslateService
  ) { }

  ngOnInit() {

    this.languages = this.languageService.listOfLanguages();
    this.dataServ.getItem(Constants.KEY_DEFAULT_LANGUAGE).then( l => {
      if(l){
        this.defaultLanguageCode = l;
        console.log('default language code: '+ this.defaultLanguageCode);
      } else {
        console.log('No default language code: ');
      }
    });
  }

  onLanguageClick(language: any){
    this.defaultLanguageCode = language.code;

    this.confirmLanguage();
  }

  //This method change the language
  confirmLanguage(){
    this.languageService.setData(this.defaultLanguageCode);
    // this.translate.use(this.defaultLanguageCode);
    this.dataServ.setItem(Constants.KEY_DEFAULT_LANGUAGE,this.defaultLanguageCode);

  }

}
