import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { environment } from "src/environments/environment";
import { ActivityService } from "./activity.service";
import { ActivityMockService } from "./activity-mock.service";

@Injectable({
    providedIn: 'root'
  })

  export class ActivityStrategyService {
    userService: BaseService;


    constructor(){
        if(environment.envName === 'design'){ //desing
            this.userService = new ActivityMockService();
        }else{
            this.userService = new ActivityService();
        }
    }

    getService(){
        return this.userService;
    }
  }