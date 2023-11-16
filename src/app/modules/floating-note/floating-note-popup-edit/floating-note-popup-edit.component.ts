import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/models/notes/note';
import { User } from 'src/app/models/users/user';
import { FloatingNoteWorkflowService } from '../services/floating-note-workflow.service';
import { NoteStrategyService } from 'src/app/services/notes/note-strategy.service';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';

@Component({
    selector: 'app-floating-note-popup-edit',
    templateUrl: './floating-note-popup-edit.component.html',
    styleUrls: ['./floating-note-popup-edit.component.scss']
})
export class FloatingNotePopupEditComponent implements OnInit {
    // Public vars
    public isShowDeleteAlert = false;
    // Services
    public _noteService;
    // Inputs
    @Input() note: Note = new Note();
    @Input() currentUser: User;
    @Input() workspaceAccess: WorkspaceAccess;
    @Input() maximize = false;
    // Outputs
    @Output() onDeleteNoteEdit = new EventEmitter();
    @Output() onCreateReminder = new EventEmitter();
    @Output() onShareWithParticipants = new EventEmitter();
    @Output() onShareWithEmails = new EventEmitter();
    @Output() onExport = new EventEmitter();

    constructor(
        private _noteStrategyService: NoteStrategyService,
        private _floatingNoteWorkflowService: FloatingNoteWorkflowService
    ) {
        // Service
        this._noteService = this._noteStrategyService.getService();
    }

    ngOnInit() {
    }
    /**
     * Put style
     * @param  
     * @param command 
     * @param commandValue 
     */
    executeCommand($event, command: string, commandValue?: string) {


        $event.preventDefault();
        $event.stopPropagation();

        if (command === 'h1' || command === 'h2' || command === 'p') {
            document.execCommand('formatBlock', false, command);
        } else if (command === 'forecolor' || command === 'backcolor') {
            document.execCommand(command, false, commandValue);
        } else if (command === 'createlink' || command === 'insertimage') {
            const url = prompt('Enter the link here: ', 'http:\/\/');
            if (url) {
                document.execCommand(command, false, url);
            }
        } else if (command === 'insertyoutubevideo') {

        } else if (command === 'removeFormat') {
            const formatRemove = $(this).data('value');
            document.execCommand(command, false, formatRemove);

        } else {
            document.execCommand(command, false, null);
        }
    }
    delete() {
        this.isShowDeleteAlert = true;
    }
    /**
     * Share with participants
     * @param  
     */
    shareWithParticipants() {
        this.onShareWithParticipants.emit(this.note)
    }
    /**
    * Share email
    */
    shareEmail($event) {
        this.onShareWithEmails.emit(this.note);
    }
    // Accept deletete
    acceptDelete() {
        this._noteService.remove(this.note).subscribe();
        this.isShowDeleteAlert = false;
        setTimeout(() => {
            this.onDeleteNoteEdit.emit();
        }, 100)
    }
    // Cancel delete
    cancelDelete() {
        this.isShowDeleteAlert = false;

    }
    //Export to pdf
    export() {
        this.onExport.emit(this.note);
    }

    //Create Reminder
    createReminder() {
        this.onCreateReminder.emit(this.note);
    }

    ngOnDestroy() {
        this.note.modified = new Date();
        this._noteService.update(this.note).subscribe();
    }

}
