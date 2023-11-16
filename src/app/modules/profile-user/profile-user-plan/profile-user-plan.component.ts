import { Component, OnInit } from '@angular/core';
import { UserStrategyService } from '../../../services/users/user-strategy.service';
import { PlanStrategyService } from '../../../services/plans/plan-strategy.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { User } from '../../../models/users/user';
import { Plan } from '../../../models/plan/plan';
import { Account } from '../../../models/account/account';
import { AccountStrategyService } from '../../../services/account/account-strategy.service';

@Component({
  selector: 'app-profile-user-plan',
  templateUrl: './profile-user-plan.component.html',
  styleUrls: ['./profile-user-plan.component.scss']
})
export class ProfileUserPlanComponent implements OnInit {
  public currentUser: User;
  public plans: Plan[];
  public account: Account;
  public recurly: string;

  private _planService;
  private _userService;
private _accountService;
  constructor(
    private _authService: AuthenticationService,
    private _userStrategyService: UserStrategyService,
    private _planStrategyService: PlanStrategyService,
    private _accountStrategyService: AccountStrategyService,
  ) {
    this._accountService = this._accountStrategyService.getService();
    this._planService = this._planStrategyService.getService();
    this._userService = this._userStrategyService.getService();
    this.currentUser = this._authService.getAuthUser();
  }

  ngOnInit() {
    this.getPlans();
    this.getAccount();
    
  }
  getPlans(){
    this._planService.getPlans()
    .subscribe(plans => {
      this.plans = plans;
      console.log('Plans:'+' '+plans);
    });
  }
  getAccount(){
    this._accountService.getAccount(this.currentUser.originAccount)
    .subscribe(account => {
      // console.log(account);
       this.account = account;
       this.recurly = this.account.subscription.recurly;
     });
  }


  selectType(type: string) {

    this.recurly = type;
  }


}
