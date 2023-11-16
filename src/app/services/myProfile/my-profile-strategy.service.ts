import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { environment } from "src/environments/environment";
import { MyProfileMockService } from "./my-profile-mock.service";
import { MyProfileService } from "./my-profile.service";

@Injectable()
  export class MyProfileStrategyService {

    userService: BaseService;

    constructor(){
        if(environment.envName === 'design'){
            this.userService = new MyProfileMockService();
        }else{
            this.userService = new MyProfileService();
        }
    }

    getService(){
        return this.userService;
    }
  }