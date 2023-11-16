import { Component, OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { AccountStrategyService } from '../../../services/account/account-strategy.service';
import { User } from '../../../models/users/user';
import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { ProfileUserInvoiceComponent } from '../profile-user-invoice/profile-user-invoice.component';
 

@Component({
  selector: 'app-profile-user-billing-history',
  templateUrl: './profile-user-billing-history.component.html',
  styleUrls: ['./profile-user-billing-history.component.scss'],
})
export class ProfileUserBillingHistoryComponent implements OnInit {
  public currentUser: User;
  public downloadPdf: ProfileUserInvoiceComponent;
  
  billingHistory = [];
  billingHistoryFilter = [];
  filterHistory = [
    { text: 'Este mes', filter: 'current-month' },
    { text: 'Mes anterior', filter: 'last-month' },
    { text: 'Últimos 3 meses', filter: 'last-3-months' },
    { text: 'Este año', filter: 'current-year' },
    { text: 'Año anterior', filter: 'last-year' },
    { text: 'Todo el periodo', filter: 'all' },
  ];
  filterValue = this.filterHistory.filter(f => f.filter === 'all')[0];
  // Services
  private _accountService;

  private allItems: {};

  constructor(
  
    private _accountStrategyService: AccountStrategyService,
    private _authService: AuthenticationService
  ) {
    this.currentUser = this._authService.getAuthUser();
  this.downloadPdf = new ProfileUserInvoiceComponent();
    this._accountService = this._accountStrategyService.getService();
    this._accountService.getAccountBillingHistory(this.currentUser.originAccount).subscribe(history => {
      this.billingHistory = history;
      this.billingHistoryFilter = Object.assign([], this.billingHistory);
    });
  }

  ngOnInit() {
  }

  downloadPDF(){
    window.open('/assets/data/brainy-billing.pdf');
  }

  setFilter(filter) {
    this.filterValue = filter;
    if (this.filterValue.filter === 'last-year') {
      const lastYear = moment().subtract(1, 'year').year();
      this.billingHistoryFilter = this.billingHistory.filter(h => {
        return moment(h.date).year() === lastYear;
      });
    }
    if (this.filterValue.filter === 'current-year') {
      const lastYear = moment().year();
      this.billingHistoryFilter = this.billingHistory.filter(h => {
        return moment(h.date).year() === lastYear;
      });
    }
    if (this.filterValue.filter === 'last-3-months') {
      const last3Months = moment().subtract(3, 'month').format('YYYY-M-DD');

      this.billingHistoryFilter = this.billingHistory.filter(h => {
        return moment(h.date).isAfter(last3Months, 'month');
      });
    }
    if (this.filterValue.filter === 'last-month') {
      const lastMonth = moment().subtract(1, 'month').format('YYYY-M-DD');

      this.billingHistoryFilter = this.billingHistory.filter(h => {
        return moment(h.date).format('YYYY-M-DD') === lastMonth;
      })
    }
    if (this.filterValue.filter === 'current-month') {
      const currentMonth = moment().format('YYYY-M-DD');

      this.billingHistoryFilter = this.billingHistory.filter(h => {
        return moment(h.date).format('YYYY-M-DD') === currentMonth;
      });
    }
    if (this.filterValue.filter === 'all') {
      this.billingHistoryFilter = this.billingHistory;
    }
  }

}
