import { TestBed, inject } from '@angular/core/testing';
import { MyTeamStrategyService } from './my-team-strategy.service';



describe('MyTeamStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTeamStrategyService]
    });
  });

  it('should be created', inject([MyTeamStrategyService], (service: MyTeamStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
