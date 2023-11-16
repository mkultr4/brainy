import { NgModule } from '@angular/core';
import { MzModalComponent, MzModalModule } from 'ngx-materialize';
import { MzModalBrainyComponent } from './mz-modal-brainy/mz-modal-brainy.component';
import { AnimateModalComponent } from './animate-modal/animate-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MzModalModule
   
  ],
  declarations: [
    MzModalBrainyComponent,
    AnimateModalComponent
  ],
  exports: [
    MzModalModule,
    MzModalBrainyComponent,
    AnimateModalComponent
  ]
})
export class SharedModalModule { }
