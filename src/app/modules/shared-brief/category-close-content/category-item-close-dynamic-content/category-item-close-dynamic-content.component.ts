import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-dynamic-content]',
  templateUrl: './category-item-close-dynamic-content.component.html',
  styleUrls: ['./category-item-close-dynamic-content.component.scss']
})
export class CategoryItemCloseDynamicContentComponent implements OnInit {
// Inputs  
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }

}
