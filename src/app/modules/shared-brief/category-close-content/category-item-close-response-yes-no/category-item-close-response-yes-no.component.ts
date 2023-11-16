import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-response-yes-no]',
  templateUrl: './category-item-close-response-yes-no.component.html',
  styleUrls: ['./category-item-close-response-yes-no.component.scss']
})
export class CategoryItemCloseResponseYesNoComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }

}
