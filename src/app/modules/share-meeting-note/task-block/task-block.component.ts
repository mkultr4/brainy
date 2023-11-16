import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { Task } from 'src/app/models/meeting-note/task';

@Component({
  selector: '[app-task-block]',
  templateUrl: './task-block.component.html',
  styleUrls: ['./task-block.component.scss']
})
export class TaskBlockComponent implements OnInit {
  // public vars
  public isAlertOpen = false;
  // Inputs
  @Input() withTitle = true;
  @Input() task: Task;
  @Input() editable;
  @Input() draggable;
  // Remove task
  @Output() taskOnRemove = new EventEmitter();
  @Output() taskOnEdit = new EventEmitter();
  constructor(
    private _renderer2: Renderer2,
    public elementRef: ElementRef
  ) { }

  ngOnInit() {
  }

  removeTask() {
    this.taskOnRemove.emit(this.task);
  }

  alertOpen(isOpen) {
    this.isAlertOpen = isOpen;
    if (this.isAlertOpen) {
      this._renderer2.addClass(this.elementRef.nativeElement, 'focused-in');
    } else {
      this._renderer2.removeClass(this.elementRef.nativeElement, 'focused-in');
    }
  }
  editTask() {
    this.taskOnEdit.emit();
    
  }
}
