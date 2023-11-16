import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { environment } from "src/environments/environment";
import { MyTeamService } from "./my-team.service";
import { MyTeamMockService } from "./my-team-mock.service";

@Injectable({
    providedIn: 'root'
  })
  export class MyTeamStrategyService {

    userService: BaseService;

    constructor(){
        console.log('ENVNAME DE MY TEAM '+ environment.envName);
        if(environment.envName === 'design'){ 
            this.userService = new MyTeamMockService();
        }else{
            this.userService = new MyTeamService();
        }
    }

    getService(){
        return this.userService;
    }
  }