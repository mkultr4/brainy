import { Component, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../../../models/brands/brand';
import { MzModalComponent } from 'ngx-materialize';
import { BrandStrategyService } from '../../../services/brands/brand-strategy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-delete-brand',
  templateUrl: './modal-delete-brand.component.html',
  styleUrls: ['./modal-delete-brand.component.scss']
})
export class ModalDeleteBrandComponent implements OnInit {
  // publics
  public brand: Brand;
  public firstConfirm = false;
  public btnDisabled = false;
  // Services
  private _brandService;
  @ViewChild('modal') public modal: MzModalComponent;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
      this.brand = undefined;
      this.firstConfirm = false;
      this.btnDisabled = false;
    }
  };
  constructor(
    private _brandStrategyService: BrandStrategyService,
    private _toastrService: ToastrService
  ) {
    this._brandService = this._brandStrategyService.getService();
  }

  ngOnInit() {
  }
  eliminate() {
    if (this.firstConfirm) {
      this.btnDisabled = true;
      this._brandService.deleteBrand(this.brand.id).subscribe((deleted) => {
        this.btnDisabled = false;
        if (deleted) {
          this.modal.closeModal();
          this._toastrService.info('Marca borrada exitosamente!');
        } else {
          this._toastrService.error('No se pudo borrar la marca, intente nuevamente mas tarde');
        }
      });
    } else {
      this.firstConfirm = true;
    }
  }
  openModal(brand: Brand) {
    this.brand = brand;
    this.modal.openModal();
  }


}
