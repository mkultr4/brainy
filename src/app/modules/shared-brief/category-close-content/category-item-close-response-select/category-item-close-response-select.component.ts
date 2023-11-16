import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-response-select]',
  templateUrl: './category-item-close-response-select.component.html',
  styleUrls: ['./category-item-close-response-select.component.scss']
})
export class CategoryItemCloseResponseSelectComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  public prueba;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {}
}
