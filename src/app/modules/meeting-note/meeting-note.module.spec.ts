import { MeetingNoteModule } from './meeting-note.module';

describe('MeetingNoteModule', () => {
  let meetingNoteModule: MeetingNoteModule;

  beforeEach(() => {
    meetingNoteModule = new MeetingNoteModule();
  });

  it('should create an instance', () => {
    expect(meetingNoteModule).toBeTruthy();
  });
});
