import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { Category } from 'src/app/models/brief/category';
import { NgForm } from '@angular/forms';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TypeTemplate } from 'src/app/models/brief/type-template';

@Component({
  selector: 'app-edit-brief-template',
  templateUrl: './edit-brief-template.component.html',
  styleUrls: ['./edit-brief-template.component.scss']
})
export class EditBriefTemplateComponent implements OnInit {
  public briefTemplate: BriefTemplate = new BriefTemplate();
  public categories: Category[];
  public typesTemplate: TypeTemplate[];
  public titleChange = false;
  public btnDisabled = false;
  // Services 
  private _briefService;
  // Input
  @Input() briefTemplateCopy: BriefTemplate;
  // Outupt
  @Output() onSave = new EventEmitter();
  // View childs
  @ViewChild('newTemplateForm') public newTemplateForm: NgForm;
  @ViewChild('inputTitle') inputTitle: ElementRef;
  constructor(
    private _briefStrategyService: BriefStrategyService,
    private _tostrService: ToastrService,
    private _router: Router
  ) {
    this.briefTemplate.typeTemplate = undefined;
    this._briefService = this._briefStrategyService.getService();
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this._briefService.findCategories().subscribe(categories => {
      this.categories = categories;
    });
    this._briefService.findTypesTemplates().subscribe(types => {
      this.typesTemplate = types;
    });

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.inputTitle.nativeElement.focus();
    });
  }
  onChangeTitle(title) {
    this.titleChange = true;
  }
  

  create() {
    if (this.newTemplateForm.valid) {
      this.btnDisabled = true;
      this._briefService.createTemplate(this.briefTemplate).subscribe(briefTemplate => {
        this.onSave.emit();
        setTimeout(() => {
          if(this.briefTemplate.typeTemplate.key === 'pitch'){
            this._router.navigate(['/brief/template-pitch', briefTemplate.id], { queryParams: { create: false, statusKey: 'edit', withoutInvitations: true } });
          }else{
             this._router.navigate(['/brief/template', briefTemplate.id], { queryParams: { create: false, statusKey: 'edit', withoutInvitations: true } });
          }
          
          this.btnDisabled = false;
        }, 200);

      });

    } else {
      this._tostrService.error('Revise los campos');
    }
  }

}
