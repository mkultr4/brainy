import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { Option } from 'src/app/models/brief/option';
import { ModalFloatingComponent } from 'src/app/modules/shared/modal-floating/modal-floating.component';

@Component({
  selector: 'app-contextual-brief-icon',
  templateUrl: './contextual-brief-icon.component.html',
  styleUrls: ['./contextual-brief-icon.component.scss']
})
export class ContextualBriefIconComponent implements OnInit {
  // Public
  public icons = [];
  // Input
  @Input() option: Option;
  // Outpus
  @Output() onShowModal = new EventEmitter();
  @Output() onChangeIco = new EventEmitter();
  // View child
  @ViewChild(ModalFloatingComponent) modal: ModalFloatingComponent;
  constructor(private _generalService: GeneralService) {
    this.icons = this._generalService.getIcons();
  }

  ngOnInit() {
  }
  // On show
  onShow(show: boolean) {
    this.onShowModal.emit(show);
  }

  // Change icon
  changeIcon($event, ico) {
    $event.preventDefault();
    $event.stopPropagation();
    // this.option.icon = ico;
    this.onChangeIco.emit(ico);
    this.modal.hideModal();
  }
}
