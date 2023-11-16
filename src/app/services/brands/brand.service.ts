import { Injectable } from '@angular/core';
import { Brand } from '../../models/brands/brand';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';


import { SocketService } from '../socket.service';

@Injectable()
export class BrandService extends SocketService   {

  // Behavior subject
  private _brands: BehaviorSubject<Array<Brand>>;
  public brands: Observable<Array<Brand>>;

  // Data store
  private dataStore;

  constructor() {
      super(environment.urlSocketFeedback);

      this.dataStore = {
        brands: []
      };
      this._brands = new BehaviorSubject<Array<Brand>>([]);
      this.brands = this._brands.asObservable();
   }

  public loadAll(workspaceId?: string, empty: boolean = false) {
    console.log(`empty value ${empty}`);

    const observable = Observable.create((observer) => {
      if (empty) {
        this.dataStore.brands = Object.assign([], []);
      } else {
          this.findAll(workspaceId).subscribe((obj) => {
            this.dataStore.brands = Object.assign([], obj);

            console.log(`brands length: ${this.dataStore.brands.length}`);

            if (this.dataStore.brands.length > 0) {
              this.dataStore.brands.forEach((b: Brand) => {
                this.countProjectByBrand(b.id).subscribe((cant) => {
                  b.projectsCount = cant.count;
                });

                this.countCoreByBrand(b.id).subscribe((cant) => {
                    b.coresCount = cant.count;
                  });
              });
            }

            this._brands.next(Object.assign([], this.dataStore).brands);
              setTimeout(() => {
                observer.next(this.dataStore.brands);
              }, 1500);
          });
      }
    });

    return observable;
}

  public findAll(workspaceId?: string): Observable<Brand[]> {
    const brands =  this.proccessRequest('findBrandByWorkspace', workspaceId);
    return brands;
  }

  public getBrand(brandID: number) {
    const observable: Observable<Brand> = Observable.create((observer) => {
      this.proccessRequest('getBrand', brandID).subscribe(async (brand: Brand) => {
        await this.countProjectByBrand(brand.id).subscribe((cant) => {
          brand.projectsCount = cant.count;
        });

        await this.countCoreByBrand(brand.id).subscribe((cant) => {
          brand.coresCount = cant.count;
        });
        setTimeout(() => {
          observer.next(brand);
        }, 1000);
      });
    });
    return observable;
  }

  public saveBrand(data: any) {
    const brands = this.proccessRequest('saveBrand', data);
    return brands;
  }

  public updateBrand(data: any, file?: any) {
    const brands =  this.proccessRequest('updateBrand', { id: data.id, data: data });
    return brands;
  }

  public deleteBrand(brandID: number) {
    const brands =  this.proccessRequest('deleteBrand', brandID);
    return brands;
  }

  private countProjectByBrand(brandId: any) {
    const cant =  this.proccessRequest('countProjectByBrand', brandId);
    return cant;
  }

  private countCoreByBrand(brandId: any) {
    const cant =  this.proccessRequest('countCoreByBrand', brandId);
    return cant;
  }

  private getWorkspacesAccessByBrand(brandId: any) {
    const brands =  this.proccessRequest('getWorkspacesAccessByBrand', brandId);
    return brands;
  }
}
