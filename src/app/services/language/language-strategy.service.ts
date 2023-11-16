import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { LanguageMockService } from './language-mock.service';
import { LanguageService } from './language.service';
import { UtilService } from '../utils/util.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageStrategyService {
  languageService: BaseService;

  constructor(
    _utilService: UtilService,
    translate: TranslateService
  ) {
    if (environment.envName === 'design') {
      this.languageService = new LanguageMockService(_utilService, translate);
    } else {
      this.languageService = new LanguageService(_utilService, translate);
    }
  }

  getService() {
    return this.languageService;
  }

}
