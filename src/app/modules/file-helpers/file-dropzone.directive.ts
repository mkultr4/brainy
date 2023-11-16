import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
  HostBinding
} from '@angular/core';

import { ReadFile } from './read-file';
import { ReadFileImpl } from './read-file-impl';
import { ReadMode } from './read-mode.enum';

@Directive({
  selector: '[appFileDropzone]'
})
export class FileDropzoneDirective {

  @Input() readMode: ReadMode;
  @Input() limit = 1;
  @Output() public fileDrop = new EventEmitter<ReadFile>();
  @Output() public readStart = new EventEmitter<number>();
  @Output() public readEnd = new EventEmitter<number>();
  // Binding
  @HostBinding('class.dragOver') dragOver = false;

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event) {
    event.stopPropagation();
    event.preventDefault();
    this.dragOver = true;
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    this.dragOver = true;
  }
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event) {
    event.stopPropagation();
    event.preventDefault();
    this.dragOver = false;
  }

  @HostListener('drop', ['$event'])
  public onDrop(event) {
    this.dragOver = false;
    event.stopPropagation();
    event.preventDefault();

    const dt = event.dataTransfer;
    const files = dt.files;
    this.readStart.emit(files.length);
    if (files.length <= this.limit) {
      for (let i = 0; i < files.length; i++) {
        this.fileDrop.emit(files[i]);
      }
      this.readEnd.emit(files.length);
    }
  }



  private readFile(file: File) {
    const reader = new FileReader();

    reader.onload = (loaded: ProgressEvent) => {
      const fileReader = loaded.target as FileReader;
      const readFile = new ReadFileImpl(file, this.readMode, fileReader.result);

      this.fileDrop.emit(readFile);
    };

    switch (this.readMode) {
      case ReadMode.arrayBuffer:
        reader.readAsArrayBuffer(file);
        break;
      case ReadMode.binaryString:
        reader.readAsBinaryString(file);
        break;
      case ReadMode.text:
        reader.readAsText(file);
        break;
      case ReadMode.dataURL:
      default:
        reader.readAsDataURL(file);
        break;
    }
  }
}
