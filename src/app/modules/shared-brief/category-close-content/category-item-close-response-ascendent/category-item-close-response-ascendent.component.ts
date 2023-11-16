import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-response-ascendent]',
  templateUrl: './category-item-close-response-ascendent.component.html',
  styleUrls: ['./category-item-close-response-ascendent.component.scss']
})
export class CategoryItemCloseResponseAscendentComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }

}
