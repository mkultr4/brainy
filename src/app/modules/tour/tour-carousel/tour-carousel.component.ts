import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { tourCarouselAnimation } from '../../../app.animations';
import { TourCarouselOptions } from './tour-carousel-options';
import { TourCarousel } from './tour-carousel-model';
import { NGU_CAROUSEL_POINT } from '../../../config/app.config';

@Component({
  selector: 'app-tour-carousel,[app-tour-carousel]',
  templateUrl: './tour-carousel.component.html',
  styleUrls: ['./tour-carousel.component.scss'],
  animations: [tourCarouselAnimation]
})
export class TourCarouselComponent implements OnInit {
  private carouselOptionsDefault = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    speed: 600,

    point: NGU_CAROUSEL_POINT,
    load: 1,
    loop: false,
    touch: true,
    easing: 'ease',

  };
  @Input() showCarousel: boolean;
  @Input() tourCarouselOptions: TourCarouselOptions;
  @Input() items: Array<TourCarousel>;
  // Outpus
  @Output() carosuelOnLoad = new EventEmitter();
  @Output() carosuelOnClose = new EventEmitter();
  constructor() {

  }

  ngOnInit() {
    console.log(this.tourCarouselOptions);
    if (!this.tourCarouselOptions.carouselOptions) {
      this.tourCarouselOptions.carouselOptions = this.carouselOptionsDefault;
    }
    if (!this.tourCarouselOptions.btnEndText) {
      this.tourCarouselOptions.btnEndText = 'Comienza ahora';
    }
    if (!this.tourCarouselOptions.btnEndClass) {
      this.tourCarouselOptions.btnEndClass = 'btn btn-medium-large btn-light';
    }
    if (!this.tourCarouselOptions.tileClass) {
      this.tourCarouselOptions.tileClass = '';
    }
  }
  carouselLoad() {
    this.carosuelOnLoad.emit();
  }
  closeCarousel() {
    this.carosuelOnClose.emit();
    this.showCarousel = false;
  }

}
