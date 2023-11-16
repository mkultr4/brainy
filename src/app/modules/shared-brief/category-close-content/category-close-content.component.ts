import { Component, OnInit, Input } from '@angular/core';
import { BriefCategory } from 'src/app/models/brief/brief-category';

@Component({
  selector: '[app-category-close-content]',
  templateUrl: './category-close-content.component.html',
  styleUrls: ['./category-close-content.component.scss']
})
export class CategoryCloseContentComponent implements OnInit {
  // Inputs
  @Input() category: BriefCategory;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }

}
