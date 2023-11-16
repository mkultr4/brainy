import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-yes-no',
  templateUrl: './option-yes-no.component.html',
  styleUrls: ['./option-yes-no.component.scss']
})
export class OptionYesNoComponent implements OnInit {

  // Inputs
  @Input() option: Option;
  @Input() checked = false;
  @Input() editable = false;
  @Input() yesNoDefault = true;
  @Input() refillable = false;
  @Input() focusResponse = false;
  @Input() contextualResponseIconShow = false;
  // Outpus
  @Output() onToggleSelection = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onChange = new EventEmitter();
  // View Childs
  @ViewChild('editor') editor: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  // Toogle selection
  toggleSelection($event){
    if(this.editable && !this.yesNoDefault){
      const target = $($event.target);
      if(target.closest('.brief-yes-no-option-editor').length === 0){
        this.onToggleSelection.emit(this.option);
      }
    }else{
      this.onToggleSelection.emit(this.option);
    }
    
  }
  // Delete option
  deleteOption($event){
    $event.preventDefault();
    $event.stopPropagation();
    this.onDelete.emit(this.option);
  }
  // Label change
  labelChange(){
    this.onChange.emit();
  }
  
 

}
