import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderWorkflowService {
  // Show modal language
  private _showModalLanguage: Subject<boolean>;
  public showModalLanguage: Observable<Boolean>;
  constructor() {
    // Init show modal language
    this._showModalLanguage = new Subject<boolean>();
    this.showModalLanguage = this._showModalLanguage.asObservable();
  }
  // Show modal language
  onShowModalLanguage(show: boolean) {
    this._showModalLanguage.next(show);
  }

}
