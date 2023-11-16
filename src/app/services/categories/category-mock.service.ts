import { Injectable } from '@angular/core';
import { Category } from '../../models/categories/category';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CATEGORIES } from '../../data/mock-categories';
import * as uuid from 'uuid/v4';
import { BaseService } from '../base.service';
@Injectable({
  providedIn: 'root'
})
export class CategoryMockService extends BaseService {


  public categories: Observable<Category[]>;
  private _categories: BehaviorSubject<Category[]>;

  private dataStore: {
    categories: Category[]
  };
  constructor() {
    super();
    this.dataStore = { categories: [] };
    this._categories = new BehaviorSubject([]);
    this.categories = this._categories.asObservable();
    this.dataStore.categories = [];
  }

  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  loadAll(workspaceId?: string, empty: boolean = false) {

    const observable = new Observable((observer) => {
      if (!empty) {
        const categories = CATEGORIES;
        this.dataStore.categories = Object.assign(new Array<Category>(), categories);
        this._categories.next(Object.assign({}, this.dataStore).categories);
      } else {
        this.dataStore.categories = [];
        this._categories.next(Object.assign({}, this.dataStore).categories);
      }
      observer.next(this.dataStore.categories);
    });
    return observable;

  }
  loadAllBrand(workspaceId?: string, brandId?: string, empty: boolean = false) {

    const observable = new Observable((observer) => {
      if (!empty) {
        const categories = CATEGORIES;
        this.dataStore.categories = Object.assign(new Array<Category>(), categories);
        this._categories.next(Object.assign({}, this.dataStore).categories);
      } else {
        this.dataStore.categories = [];
        this._categories.next(Object.assign({}, this.dataStore).categories);
      }
      observer.next(this.dataStore.categories);
    });
    return observable;

  }
  loadAllProject(workspaceId?: string, projectId?: string, empty: boolean = false) {
    const observable = new Observable((observer) => {
      if (!empty) {
        const categories = CATEGORIES;
        this.dataStore.categories = Object.assign(new Array<Category>(), categories);
        this._categories.next(Object.assign({}, this.dataStore).categories);
      } else {
        this.dataStore.categories = [];
        this._categories.next(Object.assign({}, this.dataStore).categories);
      }
      observer.next(this.dataStore.categories);
    });

    return observable;

  }
  getAllCategories(workspaceId?: string) {

    return of(CATEGORIES);

  }

  getCategory(id): Observable<Category> {
    console.log(id);
    return of(CATEGORIES.filter(c => c.id === id)[0]);
  }
  create(category: Category) {

    const observable = new Observable((observer) => {
      category.id = uuid();
      category.workspaceAccesses = [];
      category.brands = [];
      category.modified = new Date();
      this.dataStore.categories.push(Object.assign(new Category(), category));
      this._categories.next(Object.assign({}, this.dataStore).categories);
      observer.next(category);
    });
    return observable;
  }

  delete(id: string) {

    const observable = new Observable((observer) => {
      this.dataStore.categories.forEach((c, index) => {
        if (c.id === id) {
          const userWithoutCat = c.workspaceAccesses;
          this.dataStore.categories.splice(index, 1);
          const cateWithout = this.dataStore.categories.filter(cat => cat.id === 'without-categroy');
          if (cateWithout.length === 0) {
            const newCat = new Category();
            newCat.id = 'without-categroy';
            newCat.name = '(Sin categoría)';
            newCat.modified = new Date();
            newCat.workspaceAccesses = userWithoutCat;
            this.dataStore.categories.push(newCat);

          } else {
            const indexCat = this.dataStore.categories.indexOf(cateWithout[0]);
            this.dataStore.categories[indexCat].workspaceAccesses =
              this.dataStore.categories[indexCat].workspaceAccesses.concat(userWithoutCat);
          }
        }
      });
      setTimeout(() => {
        this._categories.next(Object.assign([], this.dataStore).categories);
        observer.next(true);
      }, 1500);

    });
    return observable;

  }
  update(category: Category) {

    const observable = new Observable((observer) => {

      this.dataStore.categories.forEach((c, index) => {
        if (category.id === c.id) {
          this.dataStore.categories[index] = category;
        }
      });
      setTimeout(() => {
        this._categories.next(Object.assign([], this.dataStore).categories);
        observer.next(category);
      }, 1500);

    });
    return observable;

  }
}
