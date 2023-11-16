import { Component, OnInit, ViewChild, Input, EventEmitter, Output, ElementRef, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Piece } from '../../../models/feedback/piece';
import { MzModalComponent } from 'ngx-materialize';
import { CONF_FILES } from '../../../config/app.config';
import { FeedbackStrategyService } from '../../../services/feedback/feedback-strategy.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';


@Component({
  selector: 'app-modal-change-feedback-piece, [app-modal-change-feedback-piece]',
  templateUrl: './modal-change-feedback-piece.component.html',
  styleUrls: ['./modal-change-feedback-piece.component.scss']
})
export class ModalChangeFeedbackPieceComponent implements OnInit, AfterViewInit {
  // Modal options
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    ready: (modal, trigger) => { },
    complete: () => {
      this.mantainComments = true;
      this.showAlertError = false;
      this.removeFile();
      this.resetModalElement();
    }
  };
  // Btn disabled
  public showAlertError = false;
  public btnDisabled = true;
  public changingImage = false;
  public mantainComments = true;
  public barProgress = 10;
  public titleMessageVideo = 'Remplazar video';
  public titleMessageImage = 'Remplazar imagen';
  public uploadMessageVideo = 'Suelte el video para adjuntar<br><span class="font-weight-medium">o explorar</span>';
  public uploadMessageImage = 'Suelte la imagen para adjuntar<br><span class="font-weight-medium">o explorar</span>';
  public commentsMessageVideo = 'Mantener los comentarios del video.';
  public commentsMessageImage = 'Mantener los comentarios de la imagen.';
  // File
  private intervalUpload;
  public uploading = false;
  public file = undefined;
  public previewUrl = undefined;
  public imageExtensions = CONF_FILES.imageExtensions;
  public videoExtensions = CONF_FILES.videoExtensions;
  public maxFileSizeImage = CONF_FILES.maxFileSizeImage;
  public maxFileSizeVideo = CONF_FILES.maxFileSizeVideo;
  public $modal;
  // Services
  private _feedbackService;
  // Inputs
  @Input() piece: Piece;
  @Input() forceError = true;
  // Outputs
  @Output() modalOnChangeImage = new EventEmitter();
  @Output() replacePieceWarningFormat = new EventEmitter();
  // View child
  @ViewChild('modal') public modal: MzModalComponent;
  // Constructor
  constructor(
    private _feedbackStartegyService: FeedbackStrategyService,
    private elementRef: ElementRef,
    private _toastrService: ToastrService,
    private _authService: AuthenticationService,
    private _domSanitizer: DomSanitizer
  ) {

    this._feedbackService = this._feedbackStartegyService.getService();

  }

  // Open modal
  openModal() {

    this.modal.openModal();
  }
  ngAfterViewInit() {
    this.$modal = $(this.elementRef.nativeElement).find('.modal');
  }
  ngOnInit() {
  }
  /**
   * Remove file
   * @param $event
   */
  removeFile($event = null) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.changingImage = false;
    this.btnDisabled = true;
    this.file = undefined;
    this.previewUrl = undefined;
  }

  /**
 * On select file
 * @param file
 */
  fileRead(file) {
    if (file) {
      let valid = false;
      if (this.piece.type === 'image') {
        valid = this.validateFileImage(file);
      } else if (this.piece.type === 'video') {
        valid = this.validateFileVideo(file);
      }
      if (file && valid) {
        if (this.piece.type === 'image') {
          this.uploadImage(file);
        } else if (this.piece.type === 'video') {
          this.uploadVideo(file);
        }
      }
    }
  }
  /**
   * Validate file image
   * @param file
   */
  private validateFileImage(file: File) {
    let valid = true;
    const extension = file.name.split('.').pop().toLowerCase();
    const sizeMB = file.size / 1024 / 1024;
    if (this.imageExtensions.indexOf(extension) === -1) {
      const title = 'Sube archivos del mismo formato';
      const description = 'Solo puedes subir archivos JPG, SVG, PNG y TIFF'
      this.replacePieceWarningFormat.emit({ title: title, description: description });
      valid = false;
      return valid;
    }
    if (sizeMB > this.maxFileSizeImage) {
      const title = 'Sube archivos con un tamaño máximo';
      const description = 'El tamaño maximo de imagen es de ' + this.maxFileSizeImage + 'MB';
      this.replacePieceWarningFormat.emit({ title: title, description: description });
      valid = false;
      return valid;
    }

    return valid;
  }
  /**
   * Validate file video
   * @param file 
   */
  private validateFileVideo(file: File) {
    let valid = true;
    const extension = file.name.split('.').pop().toLowerCase();
    const sizeMB = file.size / 1024 / 1024;
    if (this.videoExtensions.indexOf(extension) === -1) {
      const title = 'Sube archivos del mismo formato';
      const description = 'Solo puedes subir archivos WEBM, OGG, MP4'
      this.replacePieceWarningFormat.emit({ title: title, description: description });
      valid = false;
      return valid;
    }
    if (sizeMB > this.maxFileSizeVideo) {
      const title = 'Sube archivos con un tamaño máximo';
      const description = 'El tamaño maximo de video es de ' + this.maxFileSizeVideo + 'MB';
      this.replacePieceWarningFormat.emit({ title: title, description: description });
      valid = false;
      return valid;
    }

    return valid;
  }
  /**
   * Upload first before replace
   * @param file 
   */
  private uploadImage(file) {
    this.file = file;
    const url = window.URL.createObjectURL(this.file);
    const safeUrlBg = this._domSanitizer.bypassSecurityTrustStyle('url(' + url + ')');
    this.previewUrl = safeUrlBg;
    this.barProgress = 0;
    this.uploading = true;
    this.btnDisabled = true;
    this.modalOptions.dismissible = false;
    setTimeout(() => {
      this._feedbackService.uploadReplacePiece(this.piece, this.file, this.forceError).subscribe(response => {
        this.uploading = false;
        this.barProgress = 100;
        if (response.valid) {
          this.btnDisabled = false;
        } else {
          this.removeFile();
          this.showAlertErrorFn();
        }
      });
      this.intervalUpload = setInterval(() => { this.simulateUpload(); }, 30);
    });
  }
  /**
   * Upload first before replace
   * @param file 
   */
  private uploadVideo(file) {
    this.file = file;
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');

    // set src
    video.src = url;
    // Piece
    video.load();
    // on load
    video.onloadeddata = (event) => {
      const w = video.videoWidth;
      const h = video.videoHeight;
      const scale = 60 / w;
      const wScale = w * scale;
      const hScale = h * scale;
      const canvas = document.createElement('canvas');
      canvas.width = wScale;
      canvas.height = hScale;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, w, h);
      // Set frame
      const bgUrl = canvas.toDataURL('image/jpeg');
      const safeUrlBg = this._domSanitizer.bypassSecurityTrustStyle('url(' + bgUrl + ')');
      this.previewUrl = safeUrlBg;
    };
    this.barProgress = 0;
    this.uploading = true;
    this.btnDisabled = true;
    this.modalOptions.dismissible = false;
    this._feedbackService.uploadReplacePiece(this.piece, this.file, this.forceError).subscribe(response => {
      this.uploading = false;
      this.barProgress = 100;
      if (response.valid) {
        this.btnDisabled = false;
      } else {
        this.removeFile();
        this.showAlertErrorFn();
      }
    });
    this.intervalUpload = setInterval(() => { this.simulateUpload(); }, 30);
  }

  /**
  * Simulated upload with interval
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
  /**
   * Change piece accept
   */
  change() {
    this.changingImage = true;
    this.modalOptions.dismissible = false;
    if (this.piece.type === 'image') {
      const user = this._authService.getAuthUser;
      this._feedbackService.changePieceImage(this.piece, this.file, user ,this.mantainComments).subscribe(piece => {
        this.changingImage = false;
        this.modalOnChangeImage.emit(piece);
        this.modal.closeModal();
        this.modalOptions.dismissible = true;
      });
    } else {
      const user = this._authService.getAuthUser;
      this._feedbackService.changePieceVideo(this.piece, user, this.file, false).subscribe(piece => {
        this.changingImage = false;
        this.modalOnChangeImage.emit(piece);
        this.modal.closeModal();
        this.modalOptions.dismissible = true;
      });
    }
  }
  showAlertErrorFn() {
    this.showAlertError = true;
    this.$modal.addClass('modal-alert-error');
  }
  resetModalElement() {
    this.showAlertError = false;
    if (this.$modal) {
      this.$modal.removeClass('modal-alert-error');
    }
  }
  retry() {
    this.resetModalElement();
  }
}
