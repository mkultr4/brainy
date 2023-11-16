import {
  Component, OnInit, Input, Output, EventEmitter,
  ElementRef, ViewChild, AfterContentInit, OnDestroy, HostListener
} from '@angular/core';
import * as uuid from 'uuid/v4';
@Component({
  selector: 'app-alert-dialog,[app-alert-dialog]',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements AfterContentInit, OnDestroy {
  // privates
  private _show = false;
  // Elements
  private $origin;
  private $parentAlert;
  private $container;
  private $alertDialog;
  // Inputs
  @Input() message: string;
  @Input() acceptText: string;
  @Input() cancelText: string;
  @Input() alertId: string;
  @Input() alertClass: string;
  @Input() alertOverlayClass: string;
  @Input() container = 'body';
  @Input() edge = 'center';
  @Input() set show(show: boolean) {
    this._show = show;
    this.toggleAlert();
  }
  // Outputs
  @Output() alertOnAccept = new EventEmitter();
  @Output() alertOnCancel = new EventEmitter();
  @Output() alertOnOpen = new EventEmitter();
  @Output() alertOnClose = new EventEmitter();
  // Child
  @ViewChild('alertDialog') alertDialog: ElementRef;

  constructor(private elRef: ElementRef) {
    this.alertId = 'alert-' + uuid();
  }

  ngAfterContentInit() {
    this.$origin = $(this.elRef.nativeElement);
    this.$container = $(this.container);
    this.$parentAlert = this.$origin.closest('.closest-alert');
    this.$alertDialog = $(this.alertDialog.nativeElement);
    if (this.$parentAlert.length === 0) {
      this.$parentAlert = this.$origin;
    }
    this.$container.append(this.$alertDialog);
    this.initDialog();

  }
  // Accept click
  acceptFn() {
    this.alertOnAccept.emit();
    this.hideAlertDialog();
  }
  // Cancel click
  cancelFn() {
    this.alertOnCancel.emit();
    this.hideAlertDialog();
  }
  // Posisionated alert
  posisionated() {
    // Position


    const position = { 
      left: this.$parentAlert.offset().left - this.$container.offset().left, top: this.$parentAlert.offset().top - this.$container.offset().top };
    const alertDialog = this.$alertDialog.find('.alert-dialog');
    if (this.edge === 'center') {
      if (alertDialog.width() > this.$parentAlert.width()) {
        const midLeft = (alertDialog.outerWidth()) - (this.$parentAlert.outerWidth());

        position.left = position.left - midLeft / 2;
      } else {
        const midLeft = (this.$parentAlert.outerWidth() / 2) - (alertDialog.outerWidth() / 2)
        position.left = position.left + midLeft;
      }
    }
    else if (this.edge === 'left') {

      position.left = position.left - (alertDialog.outerWidth());
    }
    else if (this.edge === 'right') {
      console.log(this.$parentAlert.outerWidth() );
      position.left = position.left + this.$parentAlert.outerWidth() ;
    }

    if (position.left < 0) {
      position.left = 0;
    }

    if ((position.left + alertDialog.outerWidth()) > this.$container.width()) {
      const diff = (position.left + alertDialog.outerWidth()) - this.$container.width();
      position.left = position.left - diff - 5;
    }
    /*if ((position.top + alertDialog.outerHeight()) > window.innerHeight) {
      const diff = (position.top + alertDialog.outerHeight()) - window.innerHeight;
      position.top = position.top - diff - 5;
    }*/
    return position;
  }

  hideAlertDialog() {
    this._show = false;
    if (this.$alertDialog) {
      this.$alertDialog.removeClass('show');
      this.alertOnClose.emit();
    }
  }
  showAlertDialog() {

    this._show = true;
    const position = this.posisionated();
    this.$alertDialog.find('.alert-dialog').css({ 'top': position.top + 'px', 'left': position.left + 'px' });
    this.$alertDialog.addClass('show');
    this.alertOnOpen.emit();
  }
  toggleAlert() {
    if (this._show) {
      this.showAlertDialog();
    } else {
      this.hideAlertDialog();
    }
  }
  // Init Alert Dialog
  initDialog() {
    this.$origin.on('click', (e) => { this.showAlertDialog(); });
  }


  @HostListener('window:resize', ['$event']) onResize(event) {

    this.hideAlertDialog();
  }

  ngOnDestroy() {
    this.$origin.off('click');
    if (this.$alertDialog.length > 0) {
      this.$alertDialog.remove();
    }
  }

}
