import { Component, OnInit, Renderer } from '@angular/core';
import { Brand } from '../../../models/brands/brand';
import { BrandStrategyService } from '../../../services/brands/brand-strategy.service';
import { ToastrService } from 'ngx-toastr';
import { modalFadeAnimation } from '../../../app.animations';

@Component({
  selector: 'app-modal-edit-brand',
  templateUrl: './modal-edit-brand.component.html',
  styleUrls: ['./modal-edit-brand.component.scss'],
  animations: [modalFadeAnimation]
})
export class ModalEditBrandComponent implements OnInit {

  public stateModal = 'hidden';
  public brand: Brand;
  public btnDisabled = true;
  public uploading = false;
  public file: File = null;
  // Services
  private _brandService;
  constructor(
    private renderer: Renderer,
    private _brandStrategyService: BrandStrategyService,
    private _toastrService: ToastrService
  ) {
    this._brandService = this._brandStrategyService.getService();
  }

  ngOnInit() {
  }
  /** Show modal*/
  showModal(brand: Brand) {
    this.renderer.setElementClass(document.body, 'overflow-hidden', true);
    this.brand = brand;
    this.stateModal = 'visible';

    setTimeout(() => {

    });
  }
  /**
   * Close modal
   * @param cleanList
   */
  closeModal(updated: boolean = false) {
    this.stateModal = 'hidden';

    setTimeout(() => {
      this.brand = undefined;
      this.btnDisabled = true;
      this.uploading = false;
      this.file = null;
      this.renderer.setElementClass(document.body, 'overflow-hidden', false);
      if (updated) {
        this._toastrService.info('Marca actualizada correctamente');
      }
    }, 400);
  }
  /**
   * Change model
   * @param $event
   */
  onChangeName($event) {

    this.btnDisabled = false;
  }
  /**
   * Set the file
   * @param file
   */
  onChangeImage(file: File) {
    this.file = file;
  }
  save() {
    this.uploading = true;
    this._brandService.updateBrand(this.brand, this.file).subscribe((brand) => {
      if (brand) {
        this.closeModal(true);
      }
    });
  }

}
