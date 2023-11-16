import { Component, OnInit, AfterContentInit, ViewChild, OnDestroy } from '@angular/core';
import { Language } from 'src/app/models/languaje/language';
import { LanguageService } from 'src/app/services/language/language.service';
import { MzModalComponent } from 'ngx-materialize';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralService } from 'src/app/services/general/general.service';
import { HeaderWorkflowService } from '../services/header-workflow.service';
import { LanguageStrategyService } from 'src/app/services/language/language-strategy.service';
@Component({
  selector: 'app-modal-change-language',
  templateUrl: './modal-change-language.component.html',
  styleUrls: ['./modal-change-language.component.scss']
})
export class ModalChangeLanguageComponent implements OnInit, AfterContentInit, OnDestroy {
  // Public
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
    }
  };
  public languagesColumnize: Array<any>;
  public currentLanguage: Language;
  // Services
  private _languageService;
  // Subscriptions
  public subscriptionChangeLang: ISubscription;
  public subscriptionShow: ISubscription;
  // View childs
  @ViewChild('modal') public modal: MzModalComponent;
  // Constructor
  constructor(
    private _headerWorkflowService: HeaderWorkflowService,
    private _generalService: GeneralService,
    private _languageStrategyService: LanguageStrategyService
  ) {  
    this._languageService = this._languageStrategyService.getService();
  }
  // Init
  ngOnInit() {
  }
  // After view init
  ngAfterContentInit() {
    // Subscription show
    this.subscriptionShow = this._headerWorkflowService.showModalLanguage.subscribe(show => {
      if (show) {
        this.openModal();
      } else {
        this.closeModal();
      }
    })
    // Subscription change language
    this.subscriptionChangeLang = this._generalService.onChangeLanguageObs.subscribe(lang => {
      this.setLocale(lang);
    });
    this.languagesColumnize = this._languageService.getLanguagesColumns(3);
    this.currentLanguage = this._languageService.getCurrentLanguage();
  }
  // Open modal
  openModal() {
    this.modal.openModal();
  }
  // close modal
  closeModal() {
    this.modal.closeModal();
  }
  // Set local
  setLocale(lang: Language) {
    this.currentLanguage = lang;
    this._languageService.setLanguage(lang);
  }
  // Destroy
  ngOnDestroy() {
    if (this.subscriptionChangeLang) {
      this.subscriptionChangeLang.unsubscribe();
    }
    if(this.subscriptionShow){
      this.subscriptionShow.unsubscribe();
    }
  }
}
