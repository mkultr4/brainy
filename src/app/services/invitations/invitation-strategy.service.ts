import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { InvitationMockService } from './invitation-mock.service';
import { InvitationService } from './invitation.service';

@Injectable()
export class InvitationStrategyService {

  invitationService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.invitationService = new InvitationMockService();
    } else {
      this.invitationService = new InvitationService();
    }
  }

  getService() {
    return this.invitationService;
  }
}
