import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { BriefCategoryItemDefaultComponent } from '../brief-category-item-default/brief-category-item-default.component';
import { FileUtilService } from 'src/app/services/utils/file-util.service';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { ToastrService } from 'ngx-toastr';
import { CommentThread } from 'src/app/models/comments/comment-thread';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { ParticipantType } from 'src/app/models/participants/participant-type';

@Component({
  selector: '[app-brief-category-item-image]',
  templateUrl: './brief-category-item-image.component.html',
  styleUrls: ['./brief-category-item-image.component.scss']
})
export class BriefCategoryItemImageComponent 
extends BriefCategoryItemDefaultComponent
implements OnInit {
  // services
  private _briefService;
  // Inputs
  @Input() commentThreads: CommentThread[] = [];
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  // Output
  @Output() onChangeImage = new EventEmitter();
  
  constructor(
    elementRef: ElementRef,
    private _fileUtilService: FileUtilService,
    private _briefStrategyService: BriefStrategyService,
    private _toastrService: ToastrService
  ) { 
    super(elementRef);
    // Strategy
    this._briefService =  this._briefStrategyService.getService();
  }

  ngOnInit() {
  }

  private validateImage(file) {
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
    } else {
      valid = false;
    }

    return valid;
  }
    /**
   * On change image
   * @param data
   */
  async changeImage(file) {
    if (this.validateImage(file)) {
      this._briefService.updateImage(this.briefCategoryItem.content.file, file).subscribe((categoryItemFile) => {
          this.briefCategoryItem.content.file = categoryItemFile;
          this.onChangeImage.emit(this.briefCategoryItem);
      });
    }
  }
}
