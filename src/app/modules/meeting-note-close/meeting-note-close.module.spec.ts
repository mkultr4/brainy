import { MeetingNoteCloseModule } from './meeting-note-close.module';

describe('MeetingNoteCloseModule', () => {
  let meetingNoteCloseModule: MeetingNoteCloseModule;

  beforeEach(() => {
    meetingNoteCloseModule = new MeetingNoteCloseModule();
  });

  it('should create an instance', () => {
    expect(meetingNoteCloseModule).toBeTruthy();
  });
});
