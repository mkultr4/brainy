import { Injectable } from '@angular/core';
import { BriefPresentationElement } from 'src/app/models/brief-presentation/brief-presentation-element';
import { Subject } from 'rxjs';
import { BriefToolbarAction } from '../../brief/models/brief-toolbar-action';

@Injectable()
export class BriefPresentationToolbarService {
  constructor(){}
  //Elements
  private _toolbarAction = new Subject<BriefToolbarAction>();
  public toolbarAction = this._toolbarAction.asObservable();
  //Styles
  private _addStyle = new Subject<any>();
  public addStyle = this._addStyle.asObservable();
  // Focused element
  private _focusedElement = new Subject<BriefPresentationElement>();
  public focusedElement = this._focusedElement.asObservable();
  
  //Trigger add element
  triggerAction(action: BriefToolbarAction) {
      this._toolbarAction.next(action);
  }
  //Trigger add element
  triggerAddStyle(style: any) {
      this._addStyle.next(style);
  }
  /**
   * Set focused element
   * @param element 
   */
  setFocusedElement(element: BriefPresentationElement){
      this._focusedElement.next(element);
  }
  

}
