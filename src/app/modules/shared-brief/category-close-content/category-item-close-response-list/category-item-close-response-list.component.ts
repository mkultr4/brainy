import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-response-list]',
  templateUrl: './category-item-close-response-list.component.html',
  styleUrls: ['./category-item-close-response-list.component.scss']
})
export class CategoryItemCloseResponseListComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }

}
