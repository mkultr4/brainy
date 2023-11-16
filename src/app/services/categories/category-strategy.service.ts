import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { CategoryService } from './category.service';
import { CategoryMockService } from './category-mock.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryStrategyService {
  categoryService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.categoryService = new CategoryMockService();
    } else {
      this.categoryService = new CategoryService();
    }
  }

  getService() {
    return this.categoryService;
  }

}
