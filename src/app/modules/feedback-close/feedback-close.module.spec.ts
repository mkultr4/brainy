import { FeedbackCloseModule } from './feedback-close.module';

describe('FeedbackCloseModule', () => {
  let feedbackCloseModule: FeedbackCloseModule;

  beforeEach(() => {
    feedbackCloseModule = new FeedbackCloseModule();
  });

  it('should create an instance', () => {
    expect(feedbackCloseModule).toBeTruthy();
  });
});
