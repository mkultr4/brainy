import { Workspace } from '../models/workspace/workspace';
import * as moment from 'moment';
const $today = moment().subtract(1, 'hour').toDate();
// Workspaces
export const WORKSPACES: Array<Workspace> = [
    Object.assign(new Workspace(), <Workspace>{
        id: '1',
        name: 'Brainy',
        thumbnail: '',
        messages: 10,
        ownerId: '1',
        deleted: false,
        account: undefined,
        modified: $today,
    }),
    Object.assign(new Workspace(), <Workspace>{
        id: '2',
        name: 'Ogilvy',
        messages: 10,
        ownerId: '1987',
        thumbnail: 'assets/img/workspace/logo_ogilvy.jpg',
        deleted: false,
        account: undefined,
        modified: moment().subtract(1, 'days').toDate(),
    }),
    Object.assign(new Workspace(), <Workspace>{
        id: '3',
        name: 'BBDO',
        messages: 0,
        ownerId: '444545',
        thumbnail: 'assets/img/workspace/logo_bbdo.jpg',
        deleted: false,
        account: undefined,
        modified: moment().subtract(2, 'days').toDate(),
    }),
    Object.assign(new Workspace(), <Workspace>{
        id: '4',
        name: 'Publicis',
        messages: 0,
        ownerId: '545454',
        thumbnail: 'assets/img/workspace/logo_publicis.jpg',
        deleted: false,
        account: undefined,
        modified: moment().subtract(3, 'days').toDate(),
    }),
    Object.assign(new Workspace(), <Workspace>{
        id: '5',
        messages: 0,
        ownerId: '545454',
        name: 'Spotify',
        thumbnail: 'assets/img/workspace/logo_spotify.jpg',
        deleted: false,
        account: undefined,
        modified: moment().subtract(5, 'days').toDate(),
    }),
    Object.assign(new Workspace(), <Workspace>{
        id: '6',
        name: 'Google',
        messages: 0,
        ownerId: '545454',
        thumbnail: 'assets/img/workspace/logo_google.jpg',
        deleted: false,
        account: undefined,
        modified: moment().subtract(6, 'days').toDate(),
        
    })
];
