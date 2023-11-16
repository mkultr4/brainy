import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: 'app-category-item-close-response',
  templateUrl: './category-item-close-response.component.html',
  styleUrls: ['./category-item-close-response.component.scss']
})
export class CategoryItemCloseResponseComponent implements OnInit {
  @Input() item: BriefCategoryItem;
  constructor() { }

  ngOnInit() {
  }

}
