import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { TourOptions } from '../../tour/tour/tour-options';
import { TourCarousel } from '../../tour/tour-carousel/tour-carousel-model';
import { TourCarouselOptions } from '../../tour/tour-carousel/tour-carousel-options';
import { Tour } from '../../tour/tour/tour';
import { TourComponent } from '../../tour/tour/tour.component';

@Component({
  selector: 'app-dashboard-tutorial',
  templateUrl: './dashboard-tutorial.component.html',
  styleUrls: ['./dashboard-tutorial.component.scss']
})
export class DashboardTutorialComponent implements OnInit, AfterContentInit {

  // show carousel

  public scaleSlide = 1;
  // Tour
  tourOptions: TourOptions = {
    autoStart: false,
    finishMessage: 'Cancelar',
    nextMessage: 'Siguiente',
    popupClass: 'tour-popup-blue tour-popup-no-close',
    popupBtnClass: 'btn-outline-white',
    popupArrow: true
  };
  // Tour Carousel Items
  public tourCarouselItems: Array<TourCarousel> = [
    Object.assign(new TourCarousel(), <TourCarousel>{
      image: 'assets/img/tutorial/dashboard/tuto_1.svg',
      title: 'Gracias por probar Brainy',
      description: 'Disfruta de los beneficios gratis por 30 días,<br> crea proyectos y compártelos.'
    }),
    Object.assign(new TourCarousel(), <TourCarousel>{
      image: 'assets/img/tutorial/dashboard/tuto_2.svg',
      title: 'Conoce Brainy',
      description: `Una nueva herramienta de trabajo que integra<br>feedback, minutas, briefs y notas en un solo espacio. `
    }),
    Object.assign(new TourCarousel(), <TourCarousel>{
      image: 'assets/img/tutorial/dashboard/tuto_3.svg',
      title: 'Trabaja colaborativamente',
      description: `Tu equipo será más ágil con los proyectos que realicen, gracias<br> a la integración de nuestras herramientas.`
    }),
    Object.assign(new TourCarousel(), <TourCarousel>{
      image: 'assets/img/tutorial/dashboard/tuto_4.svg',
      title: 'Necesitas más beneficios',
      description: `<span style="max-width:401px;display:block;margin:0 auto;">Quieres utilizar Brainy en tu empresa
       <a href="javascript:void(0)">conoce nuestros planes.</a></span>`
    }),
    Object.assign(new TourCarousel(), <TourCarousel>{
      image: 'assets/img/tutorial/dashboard/tuto_5.svg',
      title: 'Crear un proyecto es muy fácil.',
    }),
  ];
  public tourCarouselOptions: TourCarouselOptions = {
    btnEndText: 'Comienza ahora',
    btnEndClass: 'btn btn-medium-large btn-light btn-center'
  };

  // Tour items
  public tour: Array<Tour> = [
    Object.assign(new Tour(), <Tour>{
      message: 'Desde aquí puesdes crea un feedback, minuta o brief.',
      target: '#main-button-add',
      align: 'center'
    })
  ];
  // Inputs
  @Input() emptyMessage = false;
  @Input() showCarousel = false;
  // Tour component
  @ViewChild('tourComp') tourComp: TourComponent;
  @Output() dashboardOnTourEnd = new EventEmitter();
  constructor() { }
  // Init
  ngOnInit() {
    //   this.calculateScaleSlide();

  }
  ngAfterContentInit() {
    setTimeout(() => {
      // this.showCarousel = true;
      if (this.emptyMessage && this.showCarousel) {
        // this.tourComp.startTour();
      }
      if (this.showCarousel) {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('overflow-hidden');
      }
    });
  }

  // On load carousel
  carouselLoad() { }
  // Begin now
  onCarouselClose() {
    setTimeout(() => {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('overflow-hidden');
      this.tourComp.startTour();
      this.tourEnd();
    }, 300);
  }
  // Tour events
  tourStart() {

  }
  tourEnd() {
    if (this.showCarousel) {
      this.dashboardOnTourEnd.emit();
    }
  }
  onNextStep(step) {

  }
}
