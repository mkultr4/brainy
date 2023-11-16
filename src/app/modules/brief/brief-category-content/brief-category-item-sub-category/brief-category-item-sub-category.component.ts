import { Component, OnInit, ElementRef } from '@angular/core';
import { BriefCategoryItemDefaultComponent } from '../brief-category-item-default/brief-category-item-default.component';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';

@Component({
  selector: '[app-brief-category-item-sub-category]',
  templateUrl: './brief-category-item-sub-category.component.html',
  styleUrls: ['./brief-category-item-sub-category.component.scss']
})
export class BriefCategoryItemSubCategoryComponent
  extends BriefCategoryItemDefaultComponent
  implements OnInit {
  // Services
  private _briefService;
  // Constructor
  constructor(
    elementRef: ElementRef,
    private _briefServiceStrategy: BriefStrategyService
  ) {
    super(elementRef);
    this._briefService = this._briefServiceStrategy.getService();
  }

  ngOnInit() {
  }

  changeSubTopic() {
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
      // Put on text can be change
      setTimeout(()=>{
        $('.comment-thread-point-brief').trigger('resize');
      });
    });
  }
}
