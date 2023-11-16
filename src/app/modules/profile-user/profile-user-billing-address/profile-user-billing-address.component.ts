import { Component, OnInit } from '@angular/core';
import { UserStrategyService } from '../../../services/users/user-strategy.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { User } from '../../../models/users/user';
import { Account } from '../../../models/account/account';
import { LocationStrategyService } from '../../../services/location/location-strategy.service';
import { AccountStrategyService } from '../../../services/account/account-strategy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-user-billing-address',
  templateUrl: './profile-user-billing-address.component.html',
  styleUrls: ['./profile-user-billing-address.component.scss']
})
export class ProfileUserBillingAddressComponent implements OnInit {
  public currentUser: User;
  public account: Account;
  public countries;
  public cities;
  public localities;
  // Services
  private _userService;
  private _locationService;
  private _accountService;

  constructor(
    private _authService: AuthenticationService,
    private _accountStrategyService: AccountStrategyService,
    private _userStrategyService: UserStrategyService,
    private _locationStrategyStrategy: LocationStrategyService,
    private _toastrService: ToastrService

  ) {
    this._accountService = this._accountStrategyService.getService();
    console.log(this._accountService );
    this._userService = this._userStrategyService.getService();
    this.currentUser = this._authService.getAuthUser();
    this._locationService = this._locationStrategyStrategy.getService();

    this._locationService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this._locationService.getLocalities().subscribe(localities => {
      this.localities = localities;
    });
    this._locationService.getCities().subscribe(cities => {
      this.cities = cities;
    });
  }

  ngOnInit() {
    this._accountService.getAccount(this.currentUser.originAccount).subscribe(account => {
      this.account = account;
    });
  }

  save() {
    this._accountService.updateAccount(this.account).subscribe((account) => {
      this._toastrService.info('Informacion actualizada correctamente');
    });
  }

}
