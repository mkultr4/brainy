import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../models/categories/category';
import { MzModalComponent } from 'ngx-materialize';
import { CategoryStrategyService } from '../../../services/categories/category-strategy.service';

@Component({
  selector: 'app-modal-category-eliminate,[app-modal-category-eliminate]',
  templateUrl: './modal-category-eliminate.component.html',
  styleUrls: ['./modal-category-eliminate.component.scss']
})
export class ModalCategoryEliminateComponent implements OnInit {
  public category: Category = null;
  public btnDisabled = false;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
      this.category = undefined;
      this.btnDisabled = false;
    }
  };
  // Services
  private _categoryService;
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(
    private _categoryStrategyService: CategoryStrategyService,
    private _toastrService: ToastrService
  ) {
    this._categoryService = this._categoryStrategyService.getService();
  }

  ngOnInit() {
  }
  openModal(category: Category) {
    this.category = category;
    this.modal.openModal();
  }
  eliminate() {
    this.btnDisabled = true;
    this._categoryService.delete(this.category.id).subscribe(deleted => {
      if (deleted) {
        this.btnDisabled = false;
        if (deleted) {
          this.modal.closeModal();
          this._toastrService.info('Categoría borrada exitosamente!');
        } else {
          this._toastrService.error('No se pudo borrar la categoría, intente nuevamente mas tarde');
        }
      } else {
        console.log('cannot delete');
      }
    });
  }



}
