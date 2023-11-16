import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TourComponent } from './tour/tour.component';
import { TourPopupComponent } from './tour/tour-popup/tour-popup.component';
import { NguCarouselModule } from '@ngu/carousel';
import { TourCarouselComponent } from './tour-carousel/tour-carousel.component';



@NgModule({
  imports: [
    SharedModule,
    NguCarouselModule
  ],
  declarations: [
    TourComponent,
    TourPopupComponent,
    TourCarouselComponent
  ],
  exports: [
    TourComponent,
    TourPopupComponent,
    TourCarouselComponent
  ],
})
export class TourModule { }
