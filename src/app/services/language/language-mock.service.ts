import { Injectable } from '@angular/core';
import { Language } from '../../models/languaje/language';
import { UtilService } from '../utils/util.service';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../../data/mock-languajes';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageMockService extends BaseService {

  public languages: Array<Language>;
  public browserLang: string;
  constructor(
    private _utilService: UtilService,
    private translate: TranslateService) {
    super();
    this.browserLang = translate.getBrowserLang();
    this.languages = LANGUAGES;
  }

  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }
  // Set default language
  setDefaultLanguage(lang) {
    this.translate.setDefaultLang(lang);
  }

  // Set the language
  setLanguage(language: Language) {
    // this.translate.use(language.code.toLocaleLowerCase());
    localStorage.setItem('locale', JSON.stringify(language));
  }
  // get languages
  getLanguages() {
    return of(this.languages);
  }
  // get languages
  getLanguagesMock() {
   return this.languages;
  }

  /// get current language
  getCurrentLanguage() {
    return JSON.parse(localStorage.getItem('locale'));
    // let currentLang = this.translate.currentLang;
    // return this.languages.filter(lang => lang.code.toLocaleLowerCase() === currentLang)[0];
  }
  // columnize language
  getLanguagesColumns(col: number) {
    return this._utilService.columnize(this.languages, col);
  }


}
