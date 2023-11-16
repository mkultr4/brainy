import { Observable } from 'rxjs';

export abstract class BaseService {

  constructor() { }

  abstract proccessRequest(event: string, data: any): Observable<any>;

}
