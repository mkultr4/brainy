import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Category } from '../../../models/categories/category';
import { CategoryStrategyService } from '../../../services/categories/category-strategy.service';

@Component({
  selector: 'app-brand-profile-members',
  templateUrl: './brand-profile-members.component.html',
  styleUrls: ['./brand-profile-members.component.scss']
})
export class BrandProfileMembersComponent implements OnInit, OnDestroy {
  public view = 'team';
  public category = new Category();
  // Subscription
  public subscriptionEvents: ISubscription;
  // Service
  private _categoryService;
  constructor(
    private _router: Router,
    private _categoryStrategyService: CategoryStrategyService
  ) {
    this._categoryService = this._categoryStrategyService.getService();
    this.subscriptionEvents = this._router.events.subscribe((event: Event) => {

      // Detect current view
      if (event instanceof NavigationEnd) {
        console.log(event);
        const url = event.url;
        const urlSplit = url.split('/');

        if (urlSplit[4] === 'group') {
          if (urlSplit.length > 5) {
            // console.log(urlSplit[5]);
            const idCategory = urlSplit[5];
            this.searchCategory(idCategory);
            this.view = 'group-inner';
          } else {
            this.view = 'group';
          }
        }
        if (urlSplit[4] === 'my') {
          this.view = 'team';
        }
      }
    });
  }

  ngOnInit() {

  }
  searchCategory(id) {
    console.log(this._categoryService);
    this._categoryService.getCategory(id).subscribe(category => {
      console.log(category);
      this.category = Object.assign({}, category);
    });
  }
  ngOnDestroy() {
    if (this.subscriptionEvents) {
      this.subscriptionEvents.unsubscribe();
    }
  }
}
