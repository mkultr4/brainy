import { Component, OnInit } from '@angular/core';
import { TourCarousel } from '../../tour/tour-carousel/tour-carousel-model';
import { TourCarouselOptions } from '../../tour/tour-carousel/tour-carousel-options';

@Component({
  selector: 'app-team-tutorial',
  templateUrl: './team-tutorial.component.html',
  styleUrls: ['./team-tutorial.component.scss']
})
export class TeamTutorialComponent implements OnInit {
  public showCarousel = true;
  // Tour Carousel Items
  public tourCarouselItems: Array<TourCarousel> = [
    Object.assign(new TourCarousel(), <TourCarousel>{
      image: 'assets/img/team/tutorial/tuto_1.png',
      title: 'Invita personas',
      description: `Para invitar a un participante para colaborar en tus proyectos
      <br> dirígete al botón invitar.`
    }),
    Object.assign(new TourCarousel(), <TourCarousel>{
      image: 'assets/img/team/tutorial/tuto_2.png',
      title: 'Agrega un correo electrónico',
      description: `Ingresa un correo electrónico y asignale un rol en el sistema`
    }),
    Object.assign(new TourCarousel(), <TourCarousel>{
      image: 'assets/img/team/tutorial/tuto_3.png',
      title: 'Crea grupos',
      description: `Para crear un grupos solo haz click en el mas y asígnale <br> un nombre.`
    })

  ];
  public tourCarouselOptions: TourCarouselOptions = {
    btnEndText: 'Listo',
    tileClass: 'bg-grey',
    btnEndClass: 'btn btn-semi-medium btn-right'

  };

  constructor() { }

  ngOnInit() {
  }
  // on load carousel
  carouselLoad() {

  }
  onCarouselClose() {

  }

}
