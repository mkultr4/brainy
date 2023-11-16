import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { Category } from 'src/app/models/brief/category';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/brief/area';
import { TypeTemplate } from 'src/app/models/brief/type-template';

@Component({
  selector: 'app-new-brief-template',
  templateUrl: './new-brief-template.component.html',
  styleUrls: ['./new-brief-template.component.scss']
})
export class NewBriefTemplateComponent implements OnInit, AfterContentInit, AfterViewInit {
  public briefTemplate: BriefTemplate = new BriefTemplate();
  public categories: Category[];
  public areas: Area[];
  public titleChange = false;
  public btnDisabled = false;
  public areaSelected: Area = new Area();
  public categorySelected: Category = new Category();
  public newCategory: Category = new Category();
  public typesTemplate: TypeTemplate[];
  // Services 
  private _briefService;
  // Input
  @Input() briefTemplateCopy: BriefTemplate;
  @Input() pitch = false;
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
    this._briefService = this._briefStrategyService.getService();
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this._briefService.findCategories().subscribe(categories => {
      this.categories = categories;
    });
    this._briefService.findAreas().subscribe(areas => {
      this.areas = areas;
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
  onChangeArea(value) {
    this.categorySelected = new Category();
  }
  onChangeCategory(value) {
    this.newCategory = new Category();
  }
  create() {
    if (this.newTemplateForm.valid) {
      this.btnDisabled = true;
      if (this.categorySelected.id === 'newCategory') {
        this.briefTemplate.category = this.newCategory;
      } else {
        this.briefTemplate.category = this.categorySelected;
      }
      if (this.pitch) {
        this.briefTemplate.typeTemplate =this.typesTemplate.filter(t => t.key === 'pitch')[0];
      }
      this._briefService.createTemplate(this.briefTemplate).subscribe(briefTemplate => {
        this.onSave.emit();
        setTimeout(() => {
          if (this.pitch) {
            
              this._router.navigate(['/brief/template-pitch', briefTemplate.id], { queryParams: { create: true, statusKey: 'edit', withoutInvitations: true } });
            
          } else {        
              this._router.navigate(['/brief/template', briefTemplate.id], { queryParams: { create: true, statusKey: 'edit', withoutInvitations: true } });   
          }

          this.btnDisabled = false;
        }, 200);

      });

    } else {
      this._tostrService.error('Revise los campos');
    }
  }
}
