import { User } from '../models/users/user';
import { ACCOUNTS } from './mock-account';

export const USER_CONNECTION_STATUSES = [
    'online',
    'offline',
    'absent',
    'bussy'
];

export const USERS: Array<User> = [
    Object.assign(new User(), <User>{
        id: '1',
        name: 'Ariel',
        lastName: 'López',
        acronym: 'AL',
        status: 'offline',
        profilePicture: 'assets/img/avatar_ariel.png',
        email: 'ariel@teamknowlogy.com',
        originAccount: '1'
    }),
    Object.assign(new User(), <User>{
        id: '2',
        name: 'Matthew',
        lastName: 'Bellamy',
        acronym: 'MB',
        status: 'online',
        profilePicture: 'assets/img/avatar_3.jpg',
        email: 'mathew@teamknowlogy.com',
        originAccount: '1'

    }),
    Object.assign(new User(), <User>{
        id: '3',
        name: 'Gustavo',
        lastName: 'Bracco',
        acronym: 'GB',
        status: 'online',
        profilePicture: null,
        email: 'gus@teamknowlogy.com',
        originAccount: '1'


    }),
    Object.assign(new User(), <User>{
        id: '4',
        name: 'Andres',
        lastName: 'Sanchez',
        acronym: 'AS',
        status: 'bussy',
        profilePicture: null,
        email: 'andres@teamknowlogy.com',
        originAccount: '1'

    }),
    Object.assign(new User(), <User>{
        id: '5',
        'name': 'Mario',
        lastName: 'Bejarano',
        acronym: 'MB',
        status: 'absent',
        profilePicture: null,
        email: 'marito@teamknowlogy.com',
        originAccount: '1'
    }),
    Object.assign(new User(), <User>{
        id: '6',
        name: 'Pablo',
        lastName: 'Escobar',
        acronym: 'PE',
        status: 'offline',
        profilePicture: null,
        email: 'elpatron@teamknowlogy.com',
        originAccount: '1'
    }),
    Object.assign(new User(), <User>{
        id: '7',
        name: 'Thom',
        lastName: 'Hanks',
        acronym: 'TY',
        status: 'bussy',
        profilePicture: null,
        email: 'tom@teamknowlogy.com',
        originAccount: '1'


    }),
    Object.assign(new User(), <User>{
        id: '8',
        name: 'Thom',
        lastName: 'Yorke',
        acronym: 'TY',
        status: 'offline',
        profilePicture: null,
        email: 'radiohead@teamknowlogy.com',
        originAccount: '1'
    }),
    Object.assign(new User(), <User>{
        id: '9',
        name: 'Osmar',
        lastName: 'Ferreyra',
        acronym: 'OF',
        status: 'bussy',
        profilePicture: null,
        email: 'malebo@teamknowlogy.com',
        originAccount: '1'
    }),
    Object.assign(new User(), <User>{
        id: '10',
        name: 'Franco',
        lastName: 'González',
        acronym: 'FG',
        status: 'absent',
        profilePicture: 'assets/img/avatar_2.jpg',
        email: 'fideo@teamknowlogy.com',
        originAccount: '1'
    }),
    Object.assign(new User(), <User>{
        id: '11',
        name: 'Matias',
        lastName: 'González',
        acronym: 'FG',
        status: 'absent',
        profilePicture: 'assets/img/avatar_2.jpg',
        email: 'matu@teamknowlogy.com',
        originAccount: '1'
    }),
    Object.assign(new User(), <User>{
        id: '12',
        name: 'Dorian',
        lastName: 'Grey',
        acronym: 'FG',
        status: 'absent',
        profilePicture: null,
        email: 'dorian@teamknowlogy.com',
    }),
    Object.assign(new User(), <User>{
        id: '13',
        name: 'Iohan',
        lastName: 'Mastropiedo',
        acronym: 'FG',
        status: 'absent',
        profilePicture: 'assets/img/avatar_2.jpg',
        email: 'sebastian@teamknowlogy.com',
        originAccount: '1'
    }),
    Object.assign(new User(), <User>{
        id: '14',
        name: 'Beto',
        lastName: 'Cuevas',
        acronym: 'FG',
        status: 'absent',
        profilePicture: null,
        email: 'laley@teamknowlogy.com',
        originAccount: '1'
    }),
    Object.assign(new User(), <User>{
        id: '15',
        name: 'Alejandra',
        lastName: 'Sabbatini',
        acronym: 'FG',
        status: 'absent',
        profilePicture: 'assets/img/avatar_2.jpg',
        email: 'aleja96@teamknowlogy.com',
        originAccount: '1'
    }),
    Object.assign(new User(), <User>{
        id: '16',
        name: 'Alejandro',
        lastName: 'Bento',
        acronym: 'FG',
        status: 'absent',
        profilePicture: null,
        email: 'alebento@teamknowlogy.com',
        originAccount: '1'
    }),
    Object.assign(new User(), <User>{
        id: '17',
        name: 'Franco',
        lastName: 'González',
        acronym: 'FG',
        status: 'absent',
        profilePicture: 'assets/img/avatar_2.jpg',
        email: 'fran@teamknowlogy.com',
        originAccount: '1'

    }),
    Object.assign(new User(), <User>{
        id: '18',
        name: 'Nacho',
        lastName: 'Scoco',
        acronym: 'FG',
        status: 'absent',
        profilePicture: null,
        email: 'nacho@teamknowlogy.com',
        originAccount: '1'

    })

];
