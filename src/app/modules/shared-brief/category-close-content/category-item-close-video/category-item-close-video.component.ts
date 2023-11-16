import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-video]',
  templateUrl: './category-item-close-video.component.html',
  styleUrls: ['./category-item-close-video.component.scss']
})
export class CategoryItemCloseVideoComponent implements OnInit {

  // Public vars
  public calculatedWidth = 0;
  public calculatedHeight = 0;

  // Inputs  
  @Input() item: BriefCategoryItem;
  // View child
  @ViewChild('iframeVideo') iframeVideo: ElementRef;
  // Constructor
  constructor(){}
  // Init
  ngOnInit(){
    
  }
}
