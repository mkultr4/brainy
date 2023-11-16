import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-response-text]',
  templateUrl: './category-item-close-response-text.component.html',
  styleUrls: ['./category-item-close-response-text.component.scss']
})
export class CategoryItemCloseResponseTextComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }

}
