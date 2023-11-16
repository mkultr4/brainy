import { Component, OnInit, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-category-item-close-response-assessment]',
  templateUrl: './category-item-close-response-assessment.component.html',
  styleUrls: ['./category-item-close-response-assessment.component.scss']
})
export class CategoryItemCloseResponseAssessmentComponent implements OnInit {
  // Input
  @Input() item: BriefCategoryItem;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }
}
