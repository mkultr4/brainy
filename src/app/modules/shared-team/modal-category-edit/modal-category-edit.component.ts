import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../models/categories/category';
import { CategoryStrategyService } from '../../../services/categories/category-strategy.service';
import { AnimateModalComponent } from '../../shared-modal/animate-modal/animate-modal.component';

@Component({
  selector: 'app-modal-category-edit,[app-modal-category-edit]',
  templateUrl: './modal-category-edit.component.html',
  styleUrls: ['./modal-category-edit.component.scss'],
})
export class ModalCategoryEditComponent implements OnInit {

  public category: Category;
  public btnDisabled = true;
  // Services
  private _categoryService;
  // ViewChilds
  @ViewChild('modal') modal: AnimateModalComponent;
  constructor(
    private _categoryStrategyService: CategoryStrategyService,
    private _toastrService: ToastrService
  ) {
    this._categoryService = this._categoryStrategyService.getService();
  }

  ngOnInit() {
  }
  showModal(category: Category) {
    this.category = Object.assign({}, category);
    this.modal.showModal();
  }
  modalOnShow() {

  }
  modalOnHide() {
    this.category = undefined;
    this.btnDisabled = true;
  }
  onChangeName($event) {

    this.btnDisabled = false;
  }

  save() {
    this.btnDisabled = true;
    this._categoryService.update(this.category).subscribe((category) => {
      this.btnDisabled = false;
      if (category) {
        this.modal.closeModal();
        setTimeout(() => {
          this._toastrService.info('Categoría actualizada correctamente');

        }, 400);
      }
    });
  }
}
