
import * as moment from 'moment';
import * as uuid from 'uuid/v4';
import { Category } from '../models/categories/category';
import { WorkspaceAccess } from '../models/workspace/workspace-access';
import { User } from '../models/users/user';
import { Brand } from '../models/brands/brand';

let $today = new Date();
$today = moment($today).subtract(1, 'hour').toDate();
const $yesterday = moment().subtract(1, 'days').toDate();
const $beforeYesterday = moment().subtract(2, 'days').toDate();

export const CATEGORIES: Array<Category> = [
    <Category>{
        id: '1',
        name: 'Agencias',
        workspaceAccesses: [
            <WorkspaceAccess>{
                id: uuid(),
                user: <User>{
                    name: 'Eric',
                    lastName: 'Bates',
                    profilePicture: 'assets/img/avatar_4.jpg',
                }
            },
            <WorkspaceAccess>{
                id: uuid(),
                user: <User>{
                    name: 'Eric',
                    lastName: 'Bates',
                    profilePicture: 'assets/img/avatar_3.jpg',
                }
            },
            <WorkspaceAccess>{
                id: uuid(),
                user: <User>{
                    name: 'Eric',
                    lastName: 'Bates',
                    profilePicture: 'assets/img/avatar_2.jpg',
                }
            },
        ],
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        modified: $today
    },
    <Category>{
        id: '2', name: 'Empresas',
        workspaceAccesses: [
            <WorkspaceAccess>{
                id: uuid(),
                user: <User>{
                    name: 'Eric',
                    lastName: 'Bates',
                    profilePicture: 'assets/img/avatar_4.jpg',
                }
            },
            <WorkspaceAccess>{
                id: uuid(),
                user: <User>{
                    name: 'Eric',
                    lastName: 'Bates',
                    profilePicture: 'assets/img/avatar_3.jpg',
                }
            },
        ],
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            }
        ],
        modified: $yesterday
    },
    <Category>{
        id: '3',
        name: 'Freelancers',
        workspaceAccesses: [
            <WorkspaceAccess>{
                id: uuid(),
                user: <User>{
                    name: 'Eric',
                    lastName: 'Bates',
                    profilePicture: 'assets/img/avatar_4.jpg',
                }
            }
        ],
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            }
        ],
        modified: $beforeYesterday
    }
];
