import { FloatingNoteModule } from './floating-note.module';

describe('FloatingNoteModule', () => {
  let floatingNoteModule: FloatingNoteModule;

  beforeEach(() => {
    floatingNoteModule = new FloatingNoteModule();
  });

  it('should create an instance', () => {
    expect(floatingNoteModule).toBeTruthy();
  });
});
