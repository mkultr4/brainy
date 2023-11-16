import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { InvitationLevel } from '../../../../models/invitations/invitation-level';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-share-participants-link',
  templateUrl: './modal-share-participants-link.component.html',
  styleUrls: ['./modal-share-participants-link.component.scss']
})
export class ModalShareParticipantsLinkComponent implements OnInit {
  // public modalId = uuid();
  public hostUrl = 'http://brainy.com/share/';
  @Input() modalId;
  @Input() invitationLevelId = InvitationLevel.CORE;
  @Input() invitationReferenceId: string;
  @Input() objectType: string;

  @ViewChild('urlToShareInput') urlToShareInput: ElementRef;
  public configuring = false;
  public shareLinkHasPassword = false;
  public urlToShare = '';
  constructor(
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {

    this.urlToShare = this.hostUrl + this.objectType + '/' + this.invitationReferenceId;

  }

  // Copy to clipboard
  onCopyToClipboard() {
    // this._toastrService.info('Copiado al portapapeles');
    this.urlToShareInput.nativeElement.select();
  }
  configure() {
    this.configuring = !this.configuring;
  }
  // On show
  onShow() {
    this.urlToShare = this.hostUrl + this.objectType + '/' + this.invitationReferenceId;
    const sel = window.getSelection ? window.getSelection() : undefined;
    if (sel) {
      if (sel.removeAllRanges) {
        sel.removeAllRanges();
      } else if (sel.empty) {
        sel.empty();
      }
    }
    setTimeout(() => {
      this.urlToShareInput.nativeElement.select();
    }, 200);
  }
  // On hide modal
  onHide() {
    this.configuring = false;
  }
}
