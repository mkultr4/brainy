import { Core } from '../cores/core';
import { Piece } from './piece';

export class Feedback extends Core {
    public pieces: Array<Piece> = new Array<Piece>();
    constructor() {
        super();
    }
}
