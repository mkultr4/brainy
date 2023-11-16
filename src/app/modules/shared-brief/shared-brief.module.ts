import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CategoryCloseContentComponent } from './category-close-content/category-close-content.component';
import { CategoryItemCloseQuestionComponent } from './category-close-content/category-item-close-question/category-item-close-question.component';
import { CategoryItemCloseResponseComponent } from './category-close-content/category-item-close-response/category-item-close-response.component';
import { CategoryItemCloseResponseTextComponent } from './category-close-content/category-item-close-response-text/category-item-close-response-text.component';
import { CategoryItemCloseResponseCheckboxComponent } from './category-close-content/category-item-close-response-checkbox/category-item-close-response-checkbox.component';
import { OptionCheckboxCloseComponent } from './category-close-content/category-item-close-response-checkbox/option-checkbox-close/option-checkbox-close.component';
import { CategoryItemCloseResponseRadioComponent } from './category-close-content/category-item-close-response-radio/category-item-close-response-radio.component';
import { OptionRadioCloseComponent } from './category-close-content/category-item-close-response-radio/option-radio-close/option-radio-close.component';
import { CategoryItemCloseResponseSelectComponent } from './category-close-content/category-item-close-response-select/category-item-close-response-select.component';
import { MzSelectModule } from 'ngx-materialize';
import { CategoryItemCloseResponseListComponent } from './category-close-content/category-item-close-response-list/category-item-close-response-list.component';
import { OptionListCloseComponent } from './category-close-content/category-item-close-response-list/option-list-close/option-list-close.component';
import { CategoryItemCloseResponseYesNoComponent } from './category-close-content/category-item-close-response-yes-no/category-item-close-response-yes-no.component';
import { OptionYesNoCloseComponent } from './category-close-content/category-item-close-response-yes-no/option-yes-no-close/option-yes-no-close.component';
import { CategoryItemCloseResponseAscendentComponent } from './category-close-content/category-item-close-response-ascendent/category-item-close-response-ascendent.component';
import { OptionAscendentCloseComponent } from './category-close-content/category-item-close-response-ascendent/option-ascendent-close/option-ascendent-close.component';
import { CategoryItemCloseResponseDateComponent } from './category-close-content/category-item-close-response-date/category-item-close-response-date.component';
import { OptionDateCloseComponent } from './category-close-content/category-item-close-response-date/option-date-close/option-date-close.component';
import { CategoryItemCloseResponseQuantityComponent } from './category-close-content/category-item-close-response-quantity/category-item-close-response-quantity.component';
import { CategoryItemCloseResponseAssessmentComponent } from './category-close-content/category-item-close-response-assessment/category-item-close-response-assessment.component';
import { OptionAssessmentNumberCloseComponent } from './category-close-content/category-item-close-response-assessment/option-assessment-number-close/option-assessment-number-close.component';
import { OptionAssessmentTextCloseComponent } from './category-close-content/category-item-close-response-assessment/option-assessment-text-close/option-assessment-text-close.component';
import { CategoryItemCloseResponseTableComponent } from './category-close-content/category-item-close-response-table/category-item-close-response-table.component';
import { TableInputCloseComponent } from './category-close-content/category-item-close-response-table/table-input-close/table-input-close.component';
import { TableInputTextCloseComponent } from './category-close-content/category-item-close-response-table/table-input-text-close/table-input-text-close.component';
import { TableInputPercentageCloseComponent } from './category-close-content/category-item-close-response-table/table-input-percentage-close/table-input-percentage-close.component';
import { TableInputQuantityCloseComponent } from './category-close-content/category-item-close-response-table/table-input-quantity-close/table-input-quantity-close.component';
import { TableInputSelectCloseComponent } from './category-close-content/category-item-close-response-table/table-input-select-close/table-input-select-close.component';
import { TableInputDateCloseComponent } from './category-close-content/category-item-close-response-table/table-input-date-close/table-input-date-close.component';
import { CategoryItemCloseVideoComponent } from './category-close-content/category-item-close-video/category-item-close-video.component';
import { CategoryItemCloseDynamicContentComponent } from './category-close-content/category-item-close-dynamic-content/category-item-close-dynamic-content.component';
import { DynamicContentCloseIconComponent } from './category-close-content/category-item-close-dynamic-content/dynamic-content-close-icon/dynamic-content-close-icon.component';
import { DynamicContentCloseTextComponent } from './category-close-content/category-item-close-dynamic-content/dynamic-content-close-text/dynamic-content-close-text.component';


@NgModule({
  imports: [
    SharedModule,
    MzSelectModule
  ],
  declarations: [
    CategoryCloseContentComponent,
    CategoryItemCloseQuestionComponent,
    CategoryItemCloseResponseComponent,
    CategoryItemCloseVideoComponent,
    // Text Checkbox
    CategoryItemCloseResponseTextComponent,
    // Checkbox
    CategoryItemCloseResponseCheckboxComponent,
    OptionCheckboxCloseComponent,
    // Radio
    CategoryItemCloseResponseRadioComponent,
    OptionRadioCloseComponent,
    //Select
    CategoryItemCloseResponseSelectComponent,
    // List
    CategoryItemCloseResponseListComponent,
    OptionListCloseComponent,
    // Yes no
    CategoryItemCloseResponseYesNoComponent,
    OptionYesNoCloseComponent,
    // Ascendent
    CategoryItemCloseResponseAscendentComponent,
    OptionAscendentCloseComponent,
    // Date
    CategoryItemCloseResponseDateComponent,
    OptionDateCloseComponent,
    // Quantity
    CategoryItemCloseResponseQuantityComponent,
    // Assessment
    CategoryItemCloseResponseAssessmentComponent,
    OptionAssessmentNumberCloseComponent,
    OptionAssessmentTextCloseComponent,
    // Table
    CategoryItemCloseResponseTableComponent,
    TableInputCloseComponent,
    TableInputTextCloseComponent,
    TableInputDateCloseComponent,
    TableInputPercentageCloseComponent,
    TableInputQuantityCloseComponent,
    TableInputSelectCloseComponent,
    // Dynamic content
    CategoryItemCloseDynamicContentComponent,
    DynamicContentCloseTextComponent,
    DynamicContentCloseIconComponent
  ],
  exports:[
    CategoryCloseContentComponent,
    CategoryItemCloseQuestionComponent,
    CategoryItemCloseResponseComponent,
    CategoryItemCloseResponseTextComponent,
    CategoryItemCloseVideoComponent,
    // Checkbox
    CategoryItemCloseResponseCheckboxComponent,
    OptionCheckboxCloseComponent,
    // Radio
    CategoryItemCloseResponseRadioComponent,
    OptionRadioCloseComponent,
    // Select
    CategoryItemCloseResponseSelectComponent,
    // List
    CategoryItemCloseResponseListComponent,
    OptionListCloseComponent,
    // Yes no
    CategoryItemCloseResponseYesNoComponent,
    OptionYesNoCloseComponent,
    // Ascendent
    CategoryItemCloseResponseAscendentComponent,
    OptionAscendentCloseComponent,
    // Date
    CategoryItemCloseResponseDateComponent,
    OptionDateCloseComponent,
    // Quantity
    CategoryItemCloseResponseQuantityComponent,
    OptionAssessmentNumberCloseComponent,
    OptionAssessmentTextCloseComponent,
    // Table
    CategoryItemCloseResponseTableComponent,
    TableInputCloseComponent,
    TableInputTextCloseComponent,
    TableInputDateCloseComponent,
    TableInputPercentageCloseComponent,
    TableInputQuantityCloseComponent,
    TableInputSelectCloseComponent,
    // Dynamic content
    CategoryItemCloseDynamicContentComponent,
    DynamicContentCloseTextComponent,
    DynamicContentCloseIconComponent

    
  ]
})
export class SharedBriefModule { }
