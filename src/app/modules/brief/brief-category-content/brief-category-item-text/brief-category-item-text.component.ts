import { Component, OnInit, ElementRef } from '@angular/core';
import { BriefCategoryItemDefaultComponent } from '../brief-category-item-default/brief-category-item-default.component';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';

@Component({
  selector: '[app-brief-category-item-text]',
  templateUrl: './brief-category-item-text.component.html',
  styleUrls: ['./brief-category-item-text.component.scss']
})
export class BriefCategoryItemTextComponent
  extends BriefCategoryItemDefaultComponent
  implements OnInit {
  // Public vars
  public focusText = false;
  // Service
  private _briefService;
  // constructor
  constructor(
    elementRef: ElementRef,
    private _briefServiceStrategy: BriefStrategyService
  ) {
    super(elementRef);
    // Strategy
    this._briefService = this._briefServiceStrategy.getService();
  }
  // Init
  ngOnInit() {
  }
  // On change text
  onChangeText(){
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
      setTimeout(()=>{
        $('.comment-thread-point-brief').trigger('resize');
      });
    });
  }
  // On focus
  onFocusText(focus) {
    this.focusText = focus;
    this.onFocusEdittable();
  }
}
