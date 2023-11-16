import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AccountStatus } from '../../../models/workspace/account-status';
import { DropdownOrderEvent } from '../../shared-filters/dropdown-order/dropdown-order.component';

@Injectable()
export class TeamFilterService {
    // Status
    private teamStatusFilterBehavior: BehaviorSubject<AccountStatus>;
    public teamStatusFilter: Observable<AccountStatus>;

    // Order Alph
    private teamOrdeFilterBehavior: BehaviorSubject<any> = new BehaviorSubject({ column: 'modified', direction: -1 });
    public teamOrderFilter: Observable<any>;

    // Filter text
    private teamQueryFilterBehavior: BehaviorSubject<string> = new BehaviorSubject('');
    public teamQueryFilter: Observable<string>;

    constructor() {
        this.teamStatusFilterBehavior = new BehaviorSubject({ id: undefined, key: 'all', text: 'Todos' });
        this.teamStatusFilter = this.teamStatusFilterBehavior.asObservable();

        this.teamOrdeFilterBehavior =
            new BehaviorSubject(new DropdownOrderEvent('modified', -1));
        this.teamOrderFilter = this.teamOrdeFilterBehavior.asObservable();

        this.teamQueryFilterBehavior = new BehaviorSubject('');
        this.teamQueryFilter = this.teamQueryFilterBehavior.asObservable();
    }
    /**
     * Set filter status
     * @param status 
     */
    public setStatusFilter(status: AccountStatus) {
        this.teamStatusFilterBehavior.next(status);
    }
    /**
     * Set order
     * @param order
     */
    public setOrderFilter(order: DropdownOrderEvent) {
        this.teamOrdeFilterBehavior.next(new DropdownOrderEvent(order.column, order.direction));
    }
    /**
     * Query
     * @param query 
     */
    public setQueryFilter(query: string) {
        this.teamQueryFilterBehavior.next(query);
    }



}