import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Note } from 'src/app/models/notes/note';
import { FloatingNoteWorkflowService } from '../services/floating-note-workflow.service';

@Component({
  selector: 'app-floating-note-box',
  templateUrl: './floating-note-box.component.html',
  styleUrls: ['./floating-note-box.component.scss']
})
export class FloatingNoteBoxComponent implements OnInit {
  // Public vars
  public overflow = false;
  public dropdownVisible = false;
  // Inputs
  @Input() note: Note;
  @Input() first;
  // Outputs
  @Output() onClickEdit = new EventEmitter();
  @Output() onClickDelete = new EventEmitter();
  @Output() onClickShareParticipants = new EventEmitter();
  @Output() onClickShareMails = new EventEmitter();
  // View childs
  @ViewChild('content') content: ElementRef;

  constructor(private _floatingNoteWorkflowService: FloatingNoteWorkflowService) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.content) {
        this.overflow = $(this.content.nativeElement).height() > 32;
      }
    })
  }
  // Edit note
  edit(event) {
    const target = $(event.target);
    if (target.closest('.note-box-menu').length === 0) {
      this.onClickEdit.emit(this.note);
    }

  }
  /**
   * On show dropdown
   * @param dropdownVisible 
   */
  onShowDropdown(dropdownVisible) {
    this.dropdownVisible = dropdownVisible;
  }
  delete() {

    this.onClickDelete.emit(this.note);
  }
  // Share with participants
  shareWithParticipants() {
     this.onClickShareParticipants.emit(this.note);
  }
  // Share with emails
  shareWithEmails() {
    this.onClickShareMails.emit(this.note);
  }
  //On mouse leave
  onMouseLeave() {
    //this.menu.close();
  }

}
