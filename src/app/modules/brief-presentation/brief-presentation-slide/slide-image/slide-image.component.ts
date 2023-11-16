import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { BriefPresentationElementComponent } from '../brief-presentation-element/brief-presentation-element.component';
import { FileUtilService } from 'src/app/services/utils/file-util.service';
import { ToastrService } from 'ngx-toastr';
import { BriefPresentationStrategyService } from 'src/app/services/brief-presentation/brief-presentation-strategy.service';

@Component({
  selector: 'app-slide-image',
  templateUrl: './slide-image.component.html',
  styleUrls: ['./slide-image.component.scss']
})
export class SlideImageComponent
  extends BriefPresentationElementComponent
  implements OnInit {
  // Services
  private _briefPresentationService;
  // Outputs
  @Output() onChangeImage = new EventEmitter();
  // View child
  @ViewChild('image') image: ElementRef;
  constructor(
    private _briefPresentationStrategyService: BriefPresentationStrategyService,
    private _fileUtilService: FileUtilService,
    private _toastrService: ToastrService
  ) {
    super();
    this._briefPresentationService = this._briefPresentationStrategyService.getService();
  }

  ngOnInit() {
  }

  // On resizing
  onResizing(interactEvent) {
    // console.log(interactEvent);
    super.onResizing(interactEvent);

    $(this.image.nativeElement)
      .css({
        width: interactEvent.sizing.width,
        height: interactEvent.sizing.height
      })
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
      this._briefPresentationService.updateImage(this.element.content.file, file).subscribe((slideFile) => {
        this.element.content.file = slideFile;
        this.onChangeImage.emit(this.element);
      });
    }
  }

}
