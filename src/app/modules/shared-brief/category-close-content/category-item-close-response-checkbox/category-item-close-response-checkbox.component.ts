import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-response-checkbox]',
  templateUrl: './category-item-close-response-checkbox.component.html',
  styleUrls: ['./category-item-close-response-checkbox.component.scss']
})
export class CategoryItemCloseResponseCheckboxComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }
}
