import { Core } from '../cores/core';
import { BriefTemplate } from './brief-template';


export class Brief extends Core {

    public template: BriefTemplate;
    // Pitch dates
    public dateOfGivebacks: Date;
    public dateOfProposals: Date;
    public dateOfResults: Date;    
    constructor() {
        super();
    }
}
