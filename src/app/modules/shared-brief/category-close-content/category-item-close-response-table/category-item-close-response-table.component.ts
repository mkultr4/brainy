import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-response-table]',
  templateUrl: './category-item-close-response-table.component.html',
  styleUrls: ['./category-item-close-response-table.component.scss']
})
export class CategoryItemCloseResponseTableComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }
}
