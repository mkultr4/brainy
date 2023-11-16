import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-response-date]',
  templateUrl: './category-item-close-response-date.component.html',
  styleUrls: ['./category-item-close-response-date.component.scss']
})
export class CategoryItemCloseResponseDateComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }

}
