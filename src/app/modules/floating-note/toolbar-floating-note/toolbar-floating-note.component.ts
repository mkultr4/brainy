import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterContentInit } from '@angular/core';
import { FloatingNoteWorkflowService } from '../services/floating-note-workflow.service';
import { ISubscription } from 'rxjs/Subscription';
import { Note } from 'src/app/models/notes/note';
import { Core } from 'src/app/models/cores/core';
import { CommentThread } from 'src/app/models/comments/comment-thread';
@Component({
  selector: 'app-toolbar-floating-note',
  templateUrl: './toolbar-floating-note.component.html',
  styleUrls: ['./toolbar-floating-note.component.scss']
})
export class ToolbarFloatingNoteComponent implements OnInit, AfterContentInit, OnDestroy {
  // Public var
  public note: Note = null;
  public core: Core;
  public commentThread: CommentThread;
  public plainText: string;
  public event = {
    visible: false,
    creatingNote: false,
    type: '',
    core: undefined,
    commentThread: undefined,
    top: 0,
    left: 0,
    plainText: ''
  };
  // Subscription show
  public subscriptionShow: ISubscription;

  // Outputs
  @Output() onCreateNote = new EventEmitter();

  constructor(
    private _floatingNoteWorkflowService: FloatingNoteWorkflowService
  ) { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.subscriptionShow = this._floatingNoteWorkflowService.showToolbar.subscribe(event => {
      console.log(event);
      this.event = event;
      if (this.event.visible) {
        if (this.event.type === 'commentThread') {
          // Event
          this.core = event.core;
          this.commentThread = event.commentThread;
          this.plainText = event.plainText;
          // New note
          this.note = new Note();
          this.note.project = this.core.project;
          this.note.title = this.commentThread.title;
          this.note.content = this.plainText;
        }
      } else {
        this.note = null;
      }
    });

  }
  restartToolbar() {

  }
  /**
   * Create Note
   * @param $event 
   */
  createFloatingNote($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.event.creatingNote = true;
    setTimeout(() => {
      console.log(this.note);
      this.onCreateNote.emit(this.note);
      this.event.visible = false;
      this.event.creatingNote = false;
      this.unwrapSelection();
      this.clearSelection();

    }, 900);



  }
  private unwrapSelection() {
    const selectionWrapper = $('.floating-note-selection-wrapper');
    selectionWrapper.contents().unwrap();
  }

  private clearSelection() {

    if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
    }
  }
  ngOnDestroy() {
    if (this.subscriptionShow) {
      this.subscriptionShow.unsubscribe();
    }
  }
}
