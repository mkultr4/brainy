import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import ResponseTypeSetting from 'src/app/interface/brief/ResponseTypeSetting';
import { UtilService } from 'src/app/services/utils/util.service';
import { ToastrService } from 'ngx-toastr';
import ResponseContent from 'src/app/interface/brief/ResponseContent';
import { FileUtilService } from 'src/app/services/utils/file-util.service';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { CategoryItemFile } from 'src/app/models/brief/category-item-file';

@Component({
  selector: 'app-brief-category-item-files',
  templateUrl: './brief-category-item-files.component.html',
  styleUrls: ['./brief-category-item-files.component.scss']
})
export class BriefCategoryItemFilesComponent implements OnInit {
  // Input
  @Input() briefCategoryItemId: string;
  @Input() responseSettings: ResponseTypeSetting;
  @Input() responseContent: ResponseContent;
  // Output
  @Output() onUpdateContent = new EventEmitter();
  // Services
  private _briefService;
  constructor(
    private _briefStrategyService: BriefStrategyService,
    private _utilService: UtilService,
    private _toastrService: ToastrService,
    private _fileUtilService: FileUtilService
  ) {
    this._briefService = this._briefStrategyService.getService();
  }

  ngOnInit() {
  }
  // Upload video
  uploadVideo() {
    const url = prompt('Ingresa el vínculo del video de youtube: ', '');
    if (url) {
      const videoId = this._utilService.matchYoutubeUrl(url);
      if (videoId) {
        const urlVideo = "https://www.youtube.com/embed/" + videoId + "?amp;start=0&amp;rel=0";
        const shortUrl = "https://youtu.be/" + videoId;
        this.responseContent.files.video = { url: urlVideo, shortUrl: shortUrl }
        // Emit
        this.onUpdateContent.emit(this.responseContent);

      } else {
        this._toastrService.info('Link de youtube inválido');
      }
    }
  }
  // Upload link
  uploadLink() {
    let url = prompt('Enter the link here: ', '');
    if (url && this._utilService.validateUrl(url)) {
      if (!/^(?:http(s)?:\/\/)/.test(url)) {
        url = 'http://' + url;
      }
      this.responseContent.files.link = url;
      // Emit
      this.onUpdateContent.emit(this.responseContent);
    } else {
      this._toastrService.info('Url no válida');
    }
  }
  /**
 * Choose Image
 * @param file
 */
  chooseImage(file: File) {
    let valid = true;
    if (file && file.size > 0) {
      if (!this._fileUtilService.validateFileExtension(file, 'image')) {
        this._toastrService.info('Formato de archivo no aceptado');
        valid = false;
      }
      if (!this._fileUtilService.validateFileSize(file, 'image')) {
        this._toastrService.info('Tamaño de archivo muy grande');
        valid = false;
      }
      if (valid) {

        this._briefService.uploadImage(file, this.briefCategoryItemId).subscribe((file: CategoryItemFile) => {
          this.responseContent.files.image = file;
          // Emit
          this.onUpdateContent.emit(this.responseContent);
        });
      }
    }
  }
  /**
   * Choose FIle
   * @param file
   */
  chooseFile(file: File) {
    let valid = true;
    if (file && file.size > 0) {
      if (!this._fileUtilService.validateFileSize(file, 'image', 50)) {
        this._toastrService.info('Tamaño de archivo muy grande');
        valid = false;
      }
      if (valid) {
        this._briefService.uploadFile(file, this.briefCategoryItemId).subscribe((file: CategoryItemFile) => {
          this.responseContent.files.file = file;
          // Emit
          this.onUpdateContent.emit(this.responseContent);
        });
      }
    }
  }
  /**
   * On accept audio
   * @param audio 
   */
  onAcceptAudio(audio) {
    this.responseContent.files.audio = audio;
    // Emit
    this.onUpdateContent.emit(this.responseContent);
  }
}
