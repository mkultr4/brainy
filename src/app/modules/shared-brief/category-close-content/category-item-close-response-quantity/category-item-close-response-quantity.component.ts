import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-response-quantity]',
  templateUrl: './category-item-close-response-quantity.component.html',
  styleUrls: ['./category-item-close-response-quantity.component.scss']
})
export class CategoryItemCloseResponseQuantityComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }

}
