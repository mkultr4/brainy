import { Component, OnInit, Input } from '@angular/core';
import ResponseContent from 'src/app/interface/brief/ResponseContent';

@Component({
  selector: 'app-brief-category-item-files-content',
  templateUrl: './brief-category-item-files-content.component.html',
  styleUrls: ['./brief-category-item-files-content.component.scss']
})
export class BriefCategoryItemFilesContentComponent implements OnInit {
  // Inputs
  @Input() responseContent: ResponseContent;
  // Constructor
  constructor() { }

  ngOnInit() {
  }
  // Has files
  hasFiles(){
    return this.responseContent.files.audio || 
    this.responseContent.files.file || 
    this.responseContent.files.image || 
    this.responseContent.files.link || 
    this.responseContent.files.video;
  }

}
