import { Component, Renderer, Input, OnDestroy } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-mz-modal-brainy',
  templateUrl: './mz-modal-brainy.component.html',
  styleUrls: ['./mz-modal-brainy.component.scss']
})
export class MzModalBrainyComponent extends MzModalComponent implements OnDestroy {
  @Input() modalId;
  @Input() modalClass;
  constructor(renderer: Renderer) {
    super(renderer);
  }
  ngOnDestroy() {
    this.closeModal();
  }

}
