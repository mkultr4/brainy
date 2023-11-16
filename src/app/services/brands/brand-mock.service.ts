import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Brand } from '../../models/brands/brand';
import { BRANDS } from '../../data/mock-brands';
import { PROJECTS } from '../../data/mock-projects';
import { CORES } from '../../data/mock-cores';

@Injectable({
  providedIn: 'root'
})
export class BrandMockService extends BaseService {

  // Behavior subject
  private _brands: BehaviorSubject<Array<Brand>> = new BehaviorSubject<Array<Brand>>([]);
  public brands: Observable<Array<Brand>>;
  // Data store
  private dataStore = {
    brands: []
  };
  constructor() {
    super();
    this._brands = new BehaviorSubject<Array<Brand>>([]);
    this.brands = this._brands.asObservable();
  }
  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }


  public findAll(workspaceId?: string): Observable<Brand[]> {
    const observable: Observable<Brand[]> = new Observable(observer => {
      observer.next(BRANDS);
    });
    return observable;
  }

  /**
 * Load All
 * @param workspaceId
 * @param empty
 */
  public loadAll(workspaceId?: string, empty: boolean = false) {

    const observable = Observable.create((observer) => {
      if (empty) {
        this.dataStore.brands = Object.assign([], []);
      } else {
        this.dataStore.brands = Object.assign([], BRANDS);
      }

      if (this.dataStore.brands.length > 0) {
        this.dataStore.brands.forEach((b: Brand) => {
          b.projectsCount = PROJECTS.filter(p => p.brand.id === b.id).length;
          b.coresCount = CORES.filter(c => c.project.brand.id === b.id).length;
        });
      }

      this._brands.next(Object.assign([], this.dataStore).brands);
      setTimeout(() => {
        observer.next(this.dataStore.brands);
      }, 1500);
    });

    return observable;
  }


  /**
 * Update brand
 * @param brand
 */
  public updateBrand(brand: Brand, logo?: File) {
    const observable = Observable.create((observer) => {
      this.dataStore.brands.forEach((b, index) => {
        if (b.id === brand.id) {
          if (logo) {
            const url = window.URL.createObjectURL(logo);
            brand.logo = url;
          }
          this.dataStore.brands[index] = Object.assign(new Brand(), brand);
        }
      });

      setTimeout(() => {
        this._brands.next(Object.assign([], this.dataStore).brands);
        observer.next(brand);
      }, 1500);
    });

    return observable;
  }
  /**
   * Delete brand
   * @param id
   */
  public deleteBrand(id: String) {

    const observable = Observable.create((observer) => {
      let deleted = false;
      this.dataStore.brands.forEach((brand, index) => {
        if (brand.id === id) {
          deleted = true;
          this.dataStore.brands.splice(index, 1);
        }
      });

      setTimeout(() => {
        this._brands.next(Object.assign([], this.dataStore).brands);
        observer.next(deleted);
      }, 1500);

    });
    return observable;

  }
  /**
   * Get by id
   * @param id
   */
  public getBrand(id: string): Observable<Brand> {
    const observable: Observable<Brand> = Observable.create((observer) => {

      const brand = BRANDS.filter(
        b => b.id === id)[0];
      brand.projectsCount = PROJECTS.filter(p => p.brand.id === brand.id).length;
      brand.coresCount = CORES.filter(p => p.project.brand.id === brand.id).length;
      observer.next(brand);
    });
    return observable;


  }

}
