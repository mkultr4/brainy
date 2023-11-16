import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { BriefPresentationToolbarService } from '../services/brief-presentation-toolbar.service';
import { FileUtilService } from 'src/app/services/utils/file-util.service';
import { ToastrService } from 'ngx-toastr';
import { BriefToolbarAction } from '../../brief/models/brief-toolbar-action';
import { ISubscription } from 'rxjs/Subscription';
import { BriefPresentationElement } from 'src/app/models/brief-presentation/brief-presentation-element';
@Component({
  selector: 'app-brief-presentation-toolbar',
  templateUrl: './brief-presentation-toolbar.component.html',
  styleUrls: ['./brief-presentation-toolbar.component.scss']
})
export class BriefPresentationToolbarComponent implements OnInit, AfterContentInit, OnDestroy {
  // Public vars
  public elementFocused: BriefPresentationElement;
  // Subscription
  public subscriptionFocused: ISubscription;
  // Constructor
  constructor(
    private _briefPresentationToolbarService: BriefPresentationToolbarService,
    private _fileUtilService: FileUtilService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.subscriptionFocused = this._briefPresentationToolbarService.focusedElement.subscribe(element => {
      this.elementFocused = element;
    })
  }

  // Add text element
  addTextElement() {
    // Toolbar action
    const action = new BriefToolbarAction();
    action.type = 'text';
    // Trigger
    this._briefPresentationToolbarService.triggerAction(action);
  }

  // Add shape
  addShape(shapeType) {
    // Toolbar action
    const action = new BriefToolbarAction();
    action.type = shapeType;
    // Trigger
    this._briefPresentationToolbarService.triggerAction(action);
  }

  /**
 * Choose Image
 * @param file
 */
  chooseImage(file: File) {
    let valid = true;
    if (file && file.size > 0) {
      if (!this._fileUtilService.validateFileExtension(file, 'image')) {
        this._toastrService.info('Formato de archivo no aceptado');
        valid = false;
      }
      if (!this._fileUtilService.validateFileSize(file, 'image')) {
        this._toastrService.info('Tamaño de archivo muy grande');
        valid = false;
      }
      if (valid) {
        // Toolbar action
        const action = new BriefToolbarAction();
        action.type = 'image';
        action.args = file;
        this._briefPresentationToolbarService.triggerAction(action);
      }
    }
  }

  /**
 * On set font size
 * @param fontSize  
 */
  onSetFontSize(fontSize: number) {

    //Trigger global
    this._briefPresentationToolbarService.triggerAddStyle({ style: 'fontsize', fontsize: fontSize });

  }
  /**
   * On set fore color
   * @param color 
   */
  onSetForecolor(color: string) {
    this._briefPresentationToolbarService.triggerAddStyle({ style: 'forecolor', color: color });
  }

  /**
 * Back color
 * @param backgroundColor 
 */
  onSetBackcolor(color: string) {
    //Trigger global
    this._briefPresentationToolbarService.triggerAddStyle({ style: 'backcolor', color: color });

  }
  /**
   * On remove format
   * @param arg 
   */
  onRemoveFormat(arg) {
    this._briefPresentationToolbarService.triggerAddStyle({ style: 'removeformat', arg: arg });
  }
  ngOnDestroy() {
    if (this.subscriptionFocused) {
      this.subscriptionFocused.unsubscribe();
    }
  }

}
