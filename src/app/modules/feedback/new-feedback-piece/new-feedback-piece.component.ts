import { Component, OnInit, ViewChild, Output, Input, EventEmitter, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import { CONF_FILES } from '../../../config/app.config';
import { NgForm } from '@angular/forms';
import { Piece } from '../../../models/feedback/piece';
import { FilePickerDirective } from '../../file-helpers/file-picker.directive';
import { FileDropzoneDirective } from '../../file-helpers/file-dropzone.directive';
import { ToastrService } from 'ngx-toastr';
import { FeedbackStrategyService } from '../../../services/feedback/feedback-strategy.service';
import { SeoStrategyService } from '../../../services/seo/seo-strategy.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Site } from '../../../models/seo/site';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service';
@Component({
  selector: 'app-new-feedback-piece',
  templateUrl: './new-feedback-piece.component.html',
  styleUrls: ['./new-feedback-piece.component.scss']
})
export class NewFeedbackPieceComponent implements OnInit, AfterContentInit {
  // Public vars
  public uploading = false;
  public barProgress = 10;
  public intervalUpload;
  public urlQuery = '';
  public maxFiles = 10;
  public maxFileSizeImage = CONF_FILES.maxFileSizeImage;
  public maxFileSizeVideo = CONF_FILES.maxFileSizeVideo;
  public maxFileSizeDocument = CONF_FILES.maxFileSizeDocument;
  public uploadType = 'image';
  public imageExtensions = CONF_FILES.imageExtensions;
  public videoExtensions = CONF_FILES.videoExtensions;
  public documentExtensions = CONF_FILES.documentExtensions;
  public filesSelect = [];
  public sites = [];
  public dataSourceSites: Observable<any>;
  public typeaheadLoading = false;
  public typeaheadNoResults = false;
  // Feedback service
  private _feedbackService;
  private _seoService;
  private subscriptionRouterParmas;
  private coreId;
  // Inputs
  @Input() leftSidenavCompressed: boolean;
  @Input() piece: Piece;
  @Input() canAddVideo: boolean;
  // Output
  @Output() newPieceOnUpload = new EventEmitter();
  @Output() newPieceWarningFormat = new EventEmitter();
  // View childs
  @ViewChild('formSearch') formSearch: NgForm;
  @ViewChild(FilePickerDirective) private filePicker: FilePickerDirective;
  @ViewChild(FileDropzoneDirective) private fileDropZone: FileDropzoneDirective;

  constructor(
    private _toastrService: ToastrService,
    private _feedbackStrategyService: FeedbackStrategyService,
    private _seoStrategyService: SeoStrategyService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
  ) {
    this._feedbackService = this._feedbackStrategyService.getService();
    this._seoService = this._seoStrategyService.getService();
    this.dataSourceSites = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.urlQuery);
    }).mergeMap(token => this._seoService.findSite(token));

    this.subscriptionRouterParmas = this._activatedRoute.params.subscribe(params => {
      this.coreId = (params['id']);
    });
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
  }
  // #region TYPEHEAD
  // Typehead loading
  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
  // When dont have results
  changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;

  }
  // Typehead select
  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.urlQuery = '';
    const site = <Site>e.item;
    this.sites.push(site);
  }

  /**
   * Remove site
   * @param site
   */
  removeSite(site: Site) {
    const index = this.sites.indexOf(site);
    this.sites.splice(index, 1);
  }
  // #region Sites
  /**
   * Upload the sites
   */
  uploadSites() {
    this.uploadType = 'html';
    this.piece.coreId = this.coreId;
    const user = this._authService.getAuthUser();
    console.log('uploadSites', this.piece.coreId);
    if (this.sites.length > 0) {
      this.uploading = true;
      this._feedbackService.uploadSites(this.piece, this.sites, user).subscribe(result => {
        this.barProgress = 100;
        this.uploading = false;
        this.newPieceOnUpload.emit(this.piece.id);
      });
      this.intervalUpload = setInterval(() => { this.simulateUpload(); }, 30);
    }
  }
  // #endregion

  // #region TYPEHEAD

  // #region FILES
  fileRead(file) {
    this.filesSelect.push(file);
  }
  readStart(count) {
    this.filesSelect = [];
    if (count > 10) {
      this.filePicker.reset();
      const title = 'Sube archivos del mismo formato';
      const description = 'La cantidad máxima de archivos simultaneos es de 10.'
      this.newPieceWarningFormat.emit({ title: title, description: description });
    }
  }
  readEnd(count) {
    console.log('end', count);
    if (this.filesSelect.length > 0) {
      this.uploadFiles(this.filesSelect);
    }
  }
  /**
   * Upload files
   * @param files
   */
  uploadFiles(files) {
    const valid = this.validateFiles(files);
    this.piece.coreId = this.coreId
    const user = this._authService.getAuthUser();
    if (valid) {
      this.uploading = true;
      // Upload images
      if (this.uploadType === 'image') {
        this._feedbackService.uploadImages(this.piece, files, user).subscribe(results => {
          this.uploading = false;
          this.barProgress = 100;
          this.newPieceOnUpload.emit(this.piece.id);
        });
        this.intervalUpload = setInterval(() => { this.simulateUpload(); }, 30);
      } else if (this.uploadType === 'document') {
        this._feedbackService.uploadDocument(this.piece, files[0], user).subscribe(results => {
          this.uploading = false;
          this.barProgress = 100;
          this.newPieceOnUpload.emit(this.piece.id);
        });
        this.intervalUpload = setInterval(() => { this.simulateUpload(); }, 30);
      } else if (this.uploadType === 'video') {
        this._feedbackService.uploadVideo(this.piece, files[0], user).subscribe(results => {
          this.uploading = false;
          this.barProgress = 100;
          this.newPieceOnUpload.emit(this.piece.id);
        });
        this.intervalUpload = setInterval(() => { this.simulateUpload(); }, 30);
      }

    }

  }
  /**
   * Validate files
   * @param files
   */
  private validateFiles(files) {
    let valid = true;
    if (!files || files.length === 0) {
      valid = false;
      const title = 'Sube archivos';
      const description = 'Debes seleccionar un archivo'
      this.newPieceWarningFormat.emit({ title: title, description: description });
    }
    else if (files.length <= 10) {
      if (files.length > 1) {
        files.forEach(file => {
          const extension = file.name.split('.').pop().toLowerCase();
          const sizeMB = file.size / 1024 / 1024;
          if (this.imageExtensions.indexOf(extension) === -1) {
            // this._toastrService.info('Solo puedes subir archivos SVG, JPG, PNG y TIFF juntos.');
            const title = 'Sube archivos del mismo formato';
            const description = 'Solo puedes subir archivos JPG, SVG, PNG y TIFF juntos.<br>Los formatos de video y PDF se suben de manera individual.'
            this.newPieceWarningFormat.emit({ title: title, description: description });
            valid = false;
            return valid;
          }
          if (sizeMB > this.maxFileSizeImage) {
            // this._toastrService.info('El tamaño maximo de imagen es de ' + this.maxFileSizeImage + 'MB');
            const title = 'Sube archivos con un tamaño máximo';
            const description = 'El tamaño maximo de imagen es de ' + this.maxFileSizeImage + 'MB';
            this.newPieceWarningFormat.emit({ title: title, description: description });
            valid = false;
            return valid;
          }

          this.uploadType = 'image';

        });
      } else {
        const extension = files[0].name.split('.').pop().toLowerCase();
        const isImage = this.imageExtensions.indexOf(extension) >= 0;
        const isVideo = this.videoExtensions.indexOf(extension) >= 0;
        const isDocument = this.documentExtensions.indexOf(extension) >= 0;
        const sizeMB = files[0].size / 1024 / 1024;
        if (isImage || isVideo || isDocument) {
          if (isImage) {
            this.uploadType = 'image';
            if (sizeMB > this.maxFileSizeImage) {
              // this._toastrService.info('El tamaño maximo de imagen es de ' + this.maxFileSizeImage + 'MB');
              const title = 'Sube archivos con un tamaño máximo';
              const description = 'El tamaño maximo de imagen es de ' + this.maxFileSizeImage + 'MB';
              this.newPieceWarningFormat.emit({ title: title, description: description });
              valid = false;
            }
          } else if (isVideo) {
            if (this.canAddVideo) {
              this.uploadType = 'video';
              if (sizeMB > this.maxFileSizeVideo) {
                // this._toastrService.info('El tamaño maximo de video es de ' + this.maxFileSizeVideo + 'MB');
                const title = 'Sube archivos con un tamaño máximo';
                const description = 'El tamaño maximo de video es de ' + this.maxFileSizeImage + 'MB';
                this.newPieceWarningFormat.emit({ title: title, description: description });
                valid = false;
              }
            } else {
              // this._toastrService.info('No puede agregar un video en un feedback de imagenes');
              const title = 'Sube archivos de video';
              const description = 'No puede agregar un video en un feedback de imagenes';
              this.newPieceWarningFormat.emit({ title: title, description: description });
              valid = false;

            }
          } else if (isDocument) {
            this.uploadType = 'document';
            if (sizeMB > this.maxFileSizeDocument) {
              // this._toastrService.info('El tamaño maximo para documento es de ' + this.maxFileSizeDocument + 'MB');
              const title = 'Sube archivos con un tamaño máximo';
              const description = 'El tamaño maximo para documento es de ' + this.maxFileSizeDocument + 'MB';
              this.newPieceWarningFormat.emit({ title: title, description: description });
              valid = false;
            }
          }
        } else {
          const title = 'Sube archivos del mismo formato';
          const description = 'Solo puedes subir archivos JPG, SVG, PNG y TIFF juntos.<br>Los formatos de video y PDF se suben de manera individual.'
          this.newPieceWarningFormat.emit({ title: title, description: description });
          // this._toastrService.info('Solo se permite subir videos, imagenes o documentos');
          valid = false;
        }
      }
    } else {
      valid = false;
      const title = 'Sube archivos del mismo formato';
      const description = 'La cantidad máxima de archivos simultaneos es de 10.'
      this.newPieceWarningFormat.emit({ title: title, description: description });
    }
    return valid;
  }

  /**
   * Simulate upload
   */
  simulateUpload() {
    const maxValue = 100;
    if (!this.uploading && this.barProgress >= 100) {
      this.uploading = false;
      clearInterval(this.intervalUpload);
    } else {
      let barProgressAux = this.barProgress;
      barProgressAux++;
      this.barProgress = Math.min(barProgressAux, maxValue);
    }
  }
  //#endregion




}
