import { ShareMeetingNoteModule } from './share-meeting-note.module';

describe('ShareMeetingNoteModule', () => {
  let shareMeetingNoteModule: ShareMeetingNoteModule;

  beforeEach(() => {
    shareMeetingNoteModule = new ShareMeetingNoteModule();
  });

  it('should create an instance', () => {
    expect(shareMeetingNoteModule).toBeTruthy();
  });
});
