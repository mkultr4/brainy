import { Component, OnInit } from '@angular/core';
import { UserStrategyService } from '../../../services/users/user-strategy.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { User } from '../../../models/users/user';

@Component({
  selector: 'app-profile-user-benefits',
  templateUrl: './profile-user-benefits.component.html',
  styleUrls: ['./profile-user-benefits.component.scss']
})
export class ProfileUserBenefitsComponent implements OnInit {
  public recommendations;
  public currentUser: User;
  private _userService;
  constructor(
    private _authService: AuthenticationService,
    private _userStrategyService: UserStrategyService,
  ) {
    this._userService = this._userStrategyService.getService();
    this.currentUser = this._authService.getAuthUser();
  }

  ngOnInit() {
    this._userService
      .getRecommendations(this.currentUser.id)
      .subscribe(recommemdations => {
        this.recommendations = recommemdations;
      });
  }

}
