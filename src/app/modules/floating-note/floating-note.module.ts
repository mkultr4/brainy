import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FloatingNoteComponent } from './floating-note/floating-note.component';
import { FloatingNotePopupComponent } from './floating-note-popup/floating-note-popup.component';
import { FloatingNoteWorkflowService } from './services/floating-note-workflow.service';
import { FloatingNoteBoxComponent } from './floating-note-box/floating-note-box.component';
import { FloatingNotePopupListComponent } from './floating-note-popup-list/floating-note-popup-list.component';
import { NoteStrategyService } from 'src/app/services/notes/note-strategy.service';
import { FloatingNotePopupAddComponent } from './floating-note-popup-add/floating-note-popup-add.component';
import { MzInputModule, MzSelectModule, MzTimepickerModule, MzDatepickerModule } from 'ngx-materialize';
import { FloatingNotePopupEditComponent } from './floating-note-popup-edit/floating-note-popup-edit.component';
import { ToolbarFloatingNoteComponent } from './toolbar-floating-note/toolbar-floating-note.component';
import { FloatingNotePopupReminderComponent } from './floating-note-popup-reminder/floating-note-popup-reminder.component';
import { FloatingNotePopupReminderListComponent } from './floating-note-popup-reminder-list/floating-note-popup-reminder-list.component';
import { SharedParticipantsModule } from '../shared-participants/shared-participants.module';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
import { SharedCoreModule } from '../shared-core/shared-core.module';

@NgModule({
  imports: [
    SharedModule,
    MzSelectModule,
    MzInputModule,
    MzDatepickerModule,
    MzTimepickerModule,
    SharedParticipantsModule,
    SharedCoreModule
  ],
  providers: [
    FloatingNoteWorkflowService
    
  ],
  declarations: [
    FloatingNoteComponent,
    // Popup
    FloatingNotePopupComponent,
    FloatingNotePopupListComponent,
    FloatingNoteBoxComponent,
    FloatingNotePopupAddComponent,
    FloatingNotePopupAddComponent,
    FloatingNotePopupEditComponent,
    ToolbarFloatingNoteComponent,
    // Reminders
    FloatingNotePopupReminderComponent,
    FloatingNotePopupReminderListComponent
  ],
  exports: [
    FloatingNoteComponent,
    // Popup
    FloatingNotePopupComponent,
    FloatingNotePopupListComponent,
    FloatingNoteBoxComponent,
    FloatingNotePopupAddComponent,
    FloatingNotePopupAddComponent,
    FloatingNotePopupEditComponent,
    ToolbarFloatingNoteComponent,
    // Reminders
    FloatingNotePopupReminderComponent,
    FloatingNotePopupReminderListComponent
  ]
})
export class FloatingNoteModule { }
