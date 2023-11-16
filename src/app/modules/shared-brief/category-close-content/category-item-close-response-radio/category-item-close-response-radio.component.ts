import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-response-radio]',
  templateUrl: './category-item-close-response-radio.component.html',
  styleUrls: ['./category-item-close-response-radio.component.scss']
})
export class CategoryItemCloseResponseRadioComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }
}
