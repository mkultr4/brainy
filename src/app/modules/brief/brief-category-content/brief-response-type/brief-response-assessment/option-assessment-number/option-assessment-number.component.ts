import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-assessment-number',
  templateUrl: './option-assessment-number.component.html',
  styleUrls: ['./option-assessment-number.component.scss']
})
export class OptionAssessmentNumberComponent implements OnInit {

   // Inputs
   @Input() option: Option;
   @Input() checked = false;
   @Input() editable = false;
   @Input() refillable = false;
   @Input() focusResponse = false;
   @Input() number = 1;
   // Outpus
   @Output() onToggleSelection = new EventEmitter();
   @Output() onDelete = new EventEmitter();
   @Output() onChange = new EventEmitter();
  // Constructor
   constructor() { }
 
   ngOnInit() {
   }
   // Toogle selection
   toggleSelection($event){
    if (this.refillable) {
     if(this.editable){
       const target = $($event.target);
       if(target.closest('.brief-assessment-remove').length === 0){
         this.onToggleSelection.emit(this.option);
       }
     }else{
       this.onToggleSelection.emit(this.option);
     }
    }
   }
   // Delete option
   deleteOption($event){
     $event.preventDefault();
     $event.stopPropagation();
     this.onDelete.emit(this.option);
   }


}
