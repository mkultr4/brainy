import { Component, OnInit, Output, Input, EventEmitter, AfterContentInit, ViewChild } from '@angular/core';
import { User } from '../../../models/users/user';
import { MzDropdownBrainyComponent } from '../mz-dropdown-brainy/mz-dropdown-brainy.component';
import { FileUtilService } from '../../../services/utils/file-util.service';
import { ToastrService } from 'ngx-toastr';
import { ReadFile } from '../../file-helpers/read-file';
import * as uuid from 'uuid/v4';
@Component({
  selector: 'app-avatar,[app-avatar]',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, AfterContentInit {
  public acceptExtensions: ['jpg', 'jpeg', 'png', 'svg', 'PNG', 'JPG', 'JPEG', 'SVG'];
  public buttonId = uuid();
  // Inputs
  @Input() public user: User;
  @Input() public showStatus: boolean;
  @Input() public dropdownStatuses = false;
  @Input() public showAccountStatus = false;
  @Input() public accountStatus: string;
  @Input() public invitation = false;
  @Input() public overlay: boolean;
  @Input() public specialRol;
  @Input() public userConnectionStatuses = [];
  // Outputs
  @Output() public avatarOnChangeImage = new EventEmitter();
  @Output() public avatarOnChangeStatus = new EventEmitter();
  // View Child
  @ViewChild('dropdownStatusesEl') dropdownStatusesEl: MzDropdownBrainyComponent;
  constructor(
    private _filteUtilService: FileUtilService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
  }
  ngAfterContentInit() {
  }

  setStatus($event, status) {
    $event.preventDefault();
    $event.stopPropagation();
    this.avatarOnChangeStatus.emit(status);
    this.dropdownStatusesEl.close();
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
        //          this.briefImage = url;
        this.user.profilePicture = url;
        this.avatarOnChangeImage.emit(file);
      }

    }



  }

}
