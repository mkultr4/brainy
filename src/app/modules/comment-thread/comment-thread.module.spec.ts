import { CommentThreadModule } from './comment-thread.module';

describe('CommentThreadModule', () => {
  let commentThreadModule: CommentThreadModule;

  beforeEach(() => {
    commentThreadModule = new CommentThreadModule();
  });

  it('should create an instance', () => {
    expect(commentThreadModule).toBeTruthy();
  });
});
