import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Brand } from '../../../models/brands/brand';
import { ToastrService } from 'ngx-toastr';
import { FileUtilService } from '../../../services/utils/file-util.service';

@Component({
  selector: 'app-brand-logo,[app-brand-logo]',
  templateUrl: './brand-logo.component.html',
  styleUrls: ['./brand-logo.component.scss']
})
export class BrandLogoComponent implements OnInit {
  public urlImage = '';
  public hasUpload = false;
  public _brand;
  @Input() set brand(brand: Brand) {
    this._brand = brand;
    this.hasUpload = false;
  }
  @Input() overlay = false;
  @Output() public logoOnChangeImage = new EventEmitter();

  constructor(
    private _toastrService: ToastrService,
    private _filteUtilService: FileUtilService
  ) {

  }

  ngOnInit() {
  }
  chooseFile(readFile: File) {

    if (readFile) {
      let valid = true;
      const file = readFile;
      if (!this._filteUtilService.validateFileExtension(file, 'image')) {
        valid = false;
        this._toastrService.info('Solo puedes subir archivos SVG, JPG, PNG y TIFF.');
      }
      if (!this._filteUtilService.validateFileSize(file, 'image', '30')) {
        valid = false;
        this._toastrService.info('El tamaño maximo de imagen es de ' + this._filteUtilService.maxFileSizeImage + 'MB');
      }
      if (valid) {
        const url = window.URL.createObjectURL(file);
        this.hasUpload = true;
        this.urlImage = url;
        this.logoOnChangeImage.emit(file);
      }

    }



  }



}
