import { Component, OnInit, Renderer, Output, EventEmitter, Input } from '@angular/core';
import { modalFadeAnimation } from '../../../app.animations';

@Component({
  selector: 'app-animate-modal',
  templateUrl: './animate-modal.component.html',
  styleUrls: ['./animate-modal.component.scss'],
  animations: [modalFadeAnimation]
})
export class AnimateModalComponent implements OnInit {
  public stateModal = 'hidden';
  @Input() modalId = '';
  @Input() modalClass = '';
  @Output() modalOnShow = new EventEmitter();
  @Output() modalOnHide = new EventEmitter();
  constructor(
    private renderer: Renderer
  ) { }

  ngOnInit() {
  }

  showModal() {
    this.renderer.setElementClass(document.body, 'overflow-hidden', true);
    this.stateModal = 'visible';
    setTimeout(() => {
      this.modalOnShow.emit();
    });
  }

  closeModal() {
    this.stateModal = 'hidden';

    setTimeout(() => {
      this.renderer.setElementClass(document.body, 'overflow-hidden', false);
      this.modalOnHide.emit();
    }, 400);
  }

}
