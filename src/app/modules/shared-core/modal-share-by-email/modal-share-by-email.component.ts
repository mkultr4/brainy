import { Component, OnInit, Renderer, ViewChild, Input } from '@angular/core';
import { modalFadeAnimation } from '../../../app.animations';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Core } from '../../../models/cores/core';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { AnimateModalComponent } from '../../shared-modal/animate-modal/animate-modal.component';

@Component({
  selector: 'app-modal-share-by-email,[app-modal-share-by-email]',
  templateUrl: './modal-share-by-email.component.html',
  styleUrls: ['./modal-share-by-email.component.scss'],
})
export class ModalShareByEmailComponent implements OnInit {
  public email = '';
  public emails = [];
  public btnDisabled = false;
  public suggestionInvite = false;
  // Services
  private _coreService;
  @Input() core: Core;
  // View childs
  @ViewChild('modal') modal: AnimateModalComponent;
  @ViewChild('formShare') private formShare: NgForm;
  constructor(
    private renderer: Renderer,
    private _toastrService: ToastrService,
    private _coreStrategyService: CoreStrategyService
  ) { 
    this._coreService = this._coreStrategyService.getService();
  }

  ngOnInit() {
  }
  /** Show modal*/
  showModal() {
    this.modal.showModal();
  }
  modalOnShow(){

  }
  modalOnHide() {
    

    setTimeout(() => {
      this.emails = [];
      this.email = '';
    }, 400);
  }

  /**
   * Add other email
   */
  addOther() {
    if (this.formShare.valid) {
      if (this.emails.indexOf(this.email) === -1) {
        this.emails.push(this.email);
        this.email = '';
      } else {
        this._toastrService.info('El email ya existe  en la lista');
      }
    }
  }
  /**
   * Delete email
   * @param email
   */
  deleteEmail(email: string) {
    const index = this.emails.indexOf(email);
    this.emails.splice(index, 1);
    this.emails = this.emails.slice();
  }
  /**
   * On key up
   */
  onKeyUp(e) {
    const enterKey = 13;
    if (e.which === enterKey) {
      this.addOther();
    }
  }
  /**
   * Send emails
   */
  sendEmails() {
    this.btnDisabled = true;
    let emailsAux = [];
    if (this.emails.length === 0) {
      emailsAux.push(this.email);
    } else {
      emailsAux = this.emails;
    }
    this._coreService.sendByEmail(this.core, emailsAux).subscribe(resp => {
      this.btnDisabled = false;
      if (resp) {
        this.modal.closeModal();
        setTimeout(() => {
          if(emailsAux.length > 1){
            this._toastrService.info('Se enviaron los correos correctamente.');
          }else{
            this._toastrService.info('Se envio el correo correctamente.');
          }
          
        }, 400);
      } else {
        this._toastrService.error('No se pudieron enviar los correos.');
      }
    })
  }

}
