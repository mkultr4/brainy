import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-question]',
  templateUrl: './category-item-close-question.component.html',
  styleUrls: ['./category-item-close-question.component.scss']
})
export class CategoryItemCloseQuestionComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }

}
