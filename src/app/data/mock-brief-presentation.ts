
import * as uuid from 'uuid/v4';
import { BriefPresentationSlide } from '../models/brief-presentation/brief-presentation-slide';
import { BriefPresentationElement } from '../models/brief-presentation/brief-presentation-element';
import { SlideFile } from '../models/brief-presentation/slide-file';

export const BRIEF_PRESENTATION_SLIDES = [
    <BriefPresentationSlide>{
        id: '1',
        briefPresentationId: '15',
        order: 1,
        elements: [
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '1',
                type: 'text',
                content: { text:'Brief Nespreso'},
                styleFontSize: 48,
                styleBackground: '',
                styleColor: '#4F5C69',
                left: 246.877,
                top: 243.463,
                width: 317.56,
                height: 58,
                letterSpacing: 0.5
            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '1',
                type: 'text',
                content: { text:'Nestlé ( Proyecto Nespresso) / Brief estratégico de comunicación'},
                styleFontSize: 12,
                styleBackground: '',
                styleColor: 'rgb(173, 173, 173)',
                letterSpacing: -0.27,
                left: 230.971,
                top: 326.044,
                width: 349.016,
                height: 14

            },

            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '1',
                type: 'logo',
                content: { file:<SlideFile>{url:'assets/img/brief/presentation/logotipo.svg'}},
                width: 87,
                height: 84,
                top: 135,
                left: 365

            }

        ]

    },
    <BriefPresentationSlide>{
        id: '2',
        order: 2,
        briefPresentationId: '15',
        elements: [
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '2',
                type: 'image',
                content: { file:<SlideFile>{url:'assets/img/brief/presentation/brief_slide_2_background.PNG'}},
                left: 435.683,
                top: 27.9511,
                width: 353.447,
                height: 491
            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '2',
                type: 'text',
                content: { text:'Antecedentes'},
                styleFontSize: 48,
                styleBackground: '',
                styleColor: '#595A9C',
                left: 15.1359,
                top: 33.4016,
                width: 300,
                height: 58,
                letterSpacing: 0.5
            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '2',
                type: 'text',
                content: {text:'Descripción del proyecto'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: '#4F5C69',
                letterSpacing: -0.27,
                left: 14.9964,
                top: 121.075,
                width: 220,
                height: 24

            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '2',
                type: 'text',
                content:{ text: 'Descripción brevemente el proyecto en una o dos frases'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: 'rgb(173, 173, 173)',
                letterSpacing: -0.27,
                left: 17.15,
                top: 163.969,
                width: 377.094,
                height: 48

            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '2',
                type: 'text',
                content: {text:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos.'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: 'rgb(173, 173, 173)',
                letterSpacing: -0.27,
                left: 18.58,
                top: 235.105,
                width: 369.719,
                height: 170

            }
        ]

    },
    <BriefPresentationSlide>{
        id: '3',
        order: 3,
        briefPresentationId: '15',
        elements: [
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '3',
                type: 'image',
                content: { file:<SlideFile>{url:'assets/img/brief/presentation/brief_slide_2_background.PNG'}},
                left: 435.683,
                top: 27.9511,
                width: 353.447,
                height: 491
            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '3',
                type: 'text',
                content: {text:'Contexto'},
                styleFontSize: 48,
                styleBackground: '',
                styleColor: '#595A9C',
                left: 15.1359,
                top: 33.4016,
                width: 293,
                height: 58,
                letterSpacing: 0.5
            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '3',
                type: 'text',
                content: {text:'Descripción del proyecto'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: '#4F5C69',
                letterSpacing: -0.27,
                left: 14.9964,
                top: 121.075,
                width: 220,
                height: 24

            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '3',
                type: 'text',
                content: {text:'Descripción brevemente el proyecto en una o dos frases'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: 'rgb(173, 173, 173)',
                letterSpacing: -0.27,
                left: 17.15,
                top: 163.969,
                width: 377.094,
                height: 48

            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '3',
                type: 'text',
                content: {text:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos.'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: 'rgb(173, 173, 173)',
                letterSpacing: -0.27,
                left: 18.58,
                top: 235.105,
                width: 369.719,
                height: 170

            }
        ]

    },
    <BriefPresentationSlide>{
        id: '4',
        order: 4,
        briefPresentationId: '15',
        elements: [
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '4',
                type: 'image',
                content: { file:<SlideFile>{url:'assets/img/brief/presentation/brief_slide_2_background.PNG'}},
                left: 435.683,
                top: 27.9511,
                width: 353.447,
                height: 491
            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '4',
                type: 'text',
                content: {text:'Ventajas'},
                styleFontSize: 48,
                styleBackground: '',
                styleColor: '#595A9C',
                left: 15.1359,
                top: 33.4016,
                width: 293,
                height: 58,
                letterSpacing: 0.5
            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '4',
                type: 'text',
                content: {text:'Descripción del proyecto'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: '#4F5C69',
                letterSpacing: -0.27,
                left: 14.9964,
                top: 121.075,
                width: 220,
                height: 24

            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '4',
                type: 'text',
                content: {text:'Descripción brevemente el proyecto en una o dos frases'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: 'rgb(173, 173, 173)',
                letterSpacing: -0.27,
                left: 17.15,
                top: 163.969,
                width: 377.094,
                height: 48

            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '4',
                type: 'text',
                content: {text:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos.'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: 'rgb(173, 173, 173)',
                letterSpacing: -0.27,
                left: 18.58,
                top: 235.105,
                width: 369.719,
                height: 170

            }
        ]

    },
    <BriefPresentationSlide>{
        id: '5',
        order: 5,
        briefPresentationId: '15',
        elements: [
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '5',
                type: 'image',
                content: { file:<SlideFile>{url:'assets/img/brief/presentation/brief_slide_2_background.PNG'}},
                left: 435.683,
                top: 27.9511,
                width: 353.447,
                height: 491
            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '5',
                type: 'text',
                content: {text:'Público'},
                styleFontSize: 48,
                styleBackground: '',
                styleColor: '#595A9C',
                left: 15.1359,
                top: 33.4016,
                width: 293,
                height: 58,
                letterSpacing: 0.5
            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '5',
                type: 'text',
                content: {text: 'Descripción del proyecto'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: '#4F5C69',
                letterSpacing: -0.27,
                left: 14.9964,
                top: 121.075,
                width: 220,
                height: 24

            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '5',
                type: 'text',
                content: {text: 'Descripción brevemente el proyecto en una o dos frases'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: 'rgb(173, 173, 173)',
                letterSpacing: -0.27,
                left: 17.15,
                top: 163.969,
                width: 377.094,
                height: 48

            },
            <BriefPresentationElement>{
                id: uuid(),
                briefPresentationSlideId: '5',
                type: 'text',
                content: {text:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos.'},
                styleFontSize: 20,
                styleBackground: '',
                styleColor: 'rgb(173, 173, 173)',
                letterSpacing: -0.27,
                left: 18.58,
                top: 235.105,
                width: 369.719,
                height: 170

            }
        ]

    }

]

/** Slide dimensions*/
export const BRIEF_SLIDE_DIMENSIONS = {
    width: 800,
    height: 540,
    textDefaultWidth: 258,
    textDefaultHeight: 45
  };
  