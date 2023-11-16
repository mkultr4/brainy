import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class MyTeamMockService extends BaseService {
    
    constructor() {
      super();
    }

    proccessRequest(event: string, data: any): Observable<any> {
        throw new Error("Method not implemented.");
    }

  getMyAllTeam(){
      return of();
  }

}