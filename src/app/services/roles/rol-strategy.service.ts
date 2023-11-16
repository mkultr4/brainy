import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { RolMockService } from './rol-mock.service';
import { RolService } from './rol.service';

@Injectable({
  providedIn: 'root'
})
export class RolStrategyService {


  rolService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.rolService = new RolMockService();
    } else {
      this.rolService = new RolService();
    }
  }

  getService() {
    return this.rolService;
  }

}
