import { Site } from '../models/seo/site';

export const SITES: Site[] = [
    <Site>{
        id: '1',
        favico: 'assets/img/logos/favicon/apple.png',
        url: 'www.apple.com'
    },
    <Site>{
        id: '2',
        favico: 'assets/img/logos/favicon/angular.png',
        url: 'www.angular.com',
    },
    <Site>{
        id: '3',
        favico: 'assets/img/logos/favicon/samsung.png',
        url: 'www.samsung.com',
    },
    <Site>{
        id: '4',
        favico: 'assets/img/logos/favicon/samsung.png',
        url: 'www.samsung.com.ar',
    },
    <Site>{
        id: '5',
        favico: 'assets/img/logos/favicon/dell.png',
        url: 'www.dell.com',
    },
    <Site>{
        id: '6',
        favico: null,
        url: 'www.ariel.com',
    }
];

