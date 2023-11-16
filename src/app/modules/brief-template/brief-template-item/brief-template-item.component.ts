import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BriefTemplate } from 'src/app/models/brief/brief-template';

@Component({
  selector: 'app-brief-template-item',
  templateUrl: './brief-template-item.component.html',
  styleUrls: ['./brief-template-item.component.scss']
})
export class BriefTemplateItemComponent implements OnInit, OnDestroy {
  // Public vars
  public showHidePreview: boolean;
  public preview = 'assets/img/dashboard/ico_ilus_brief.svg';
  // Inputs
  @Input() briefTemplate: BriefTemplate;
  @Input() index;
  @Input() canEdit = false;
  // Outputs
  @Output() onMakeLibrary = new EventEmitter();
  @Output() onPreviewTemplate = new EventEmitter();
  @Output() onEditTemplate = new EventEmitter();
  // Constructor
  constructor(
    private _router: Router) {
    this.showHidePreview = false;

  }
  ngOnInit() {
  }

  public createBriefAction() {
    this._router.navigate(['/brief/project'], { queryParams: { templateId: this.briefTemplate.id } });
  }

  public viewBriefAction() {
    this.onPreviewTemplate.emit(this.briefTemplate);
  }
  public edit(){
    this.onEditTemplate.emit(this.briefTemplate);
  }

  /**
   * mouseOver
   */
  public mouseOver(val) {
    this.showHidePreview = val;
  }

  public makeLibrary() {
    this.onMakeLibrary.emit(this.briefTemplate);
  }

  ngOnDestroy() {

  }
}
