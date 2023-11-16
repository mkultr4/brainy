import { ParticipantType } from '../models/participants/participant-type';

export const PARTICIPANTS_TYPES: Array<ParticipantType> = [
    new ParticipantType('1', 'all', 'Todos', 'assets/img/participants/ico_participants_all.svg'),
    new ParticipantType('2', 'team', 'Mi equipo', 'assets/img/participants/ico_participants_my_team.svg'),
    new ParticipantType('3', 'private', 'Privados', 'assets/img/participants/ico_participants_private.svg'),
    new ParticipantType('4', 'just-me', 'Solo yo', 'assets/img/participants/ico_participants_just_me.svg')
];

