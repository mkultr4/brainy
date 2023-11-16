import { Component, OnInit, Input, AfterContentInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { Brand } from 'src/app/models/brands/brand';
import { Project } from 'src/app/models/projects/project';
import { ProjectStrategyService } from 'src/app/services/projects/project-strategy.service';
import { BrandStrategyService } from 'src/app/services/brands/brand-strategy.service';
import { NgForm } from '@angular/forms';
import { Core } from 'src/app/models/cores/core';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { User } from 'src/app/models/users/user';
import { ToastrService } from 'ngx-toastr';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { Brief } from 'src/app/models/brief/brief';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-brief-form',
  templateUrl: './new-brief-form.component.html',
  styleUrls: ['./new-brief-form.component.scss']
})
export class NewBriefFormComponent implements OnInit, AfterContentInit, AfterViewInit {
  public brief: Core = new Brief();
  public titleChange = false;
  public btnDisabled = false;
  public brands: Brand[];
  public projects: Project[];
  public brand: Brand = new Brand();
  public project: Project = new Project();
  public newBrand: Brand = new Brand();
  public newProject: Project = new Project();
  // Outupt
  @Output() onSave = new EventEmitter();
  // Inputs
  @Input() briefTemplate: BriefTemplate;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() currentUser: User;

  // View Child
  @ViewChild('inputTitle') inputTitle: ElementRef;
  @ViewChild('newCoreForm') public newCoreForm: NgForm;
  // Private 
  private _coreService;
  private _brandService;
  private _projectService;
  constructor(
    private _tostrService: ToastrService,
    private _coreStrategyService: CoreStrategyService,
    private _brandStrategyService: BrandStrategyService,
    private _projectStrategyService: ProjectStrategyService,
    private _router: Router

  ) {
    this._brandService = this._brandStrategyService.getService();
    this._coreService = this._coreStrategyService.getService();
    this._projectService = this._projectStrategyService.getService();

  }

  ngOnInit() {
  }
  ngAfterContentInit() {

    this._brandService.findAll(this.workspaceAccess.workspace.id).subscribe(brands => {

      const arrayBrands = new Array<Brand>();
      brands.forEach((element) => {
        const brand = new Brand();
        brand.id = element.id;
        brand.workspaceAccesses.push(this.workspaceAccess);
        brand.name = element.name;

        arrayBrands.push(brand);
      });

      this.brands = Object.assign([], arrayBrands);
    });
    // Projects
    this._projectService.findAll(this.workspaceAccess.workspace.id).subscribe(projects => {
      this.projects = this._projectService.castArrayObject(projects, this.workspaceAccess);
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
  onChangeBrand(brand) {
    if (this.brand.id && this.brand.id !== 'newBrand') {
      this._projectService.findAll(this.workspaceAccess.workspace.id).subscribe(projects => {
        this.projects = this._projectService.castArrayObject(projects, this.workspaceAccess);
        this.projects = this.projects.filter((project) => project.brand.id.toString() === this.brand.id);
        console.log(this.projects);
      });
    }

    setTimeout(() => {
      this.project.id = '';
      this.newBrand = new Brand();
      this.newProject = new Project();
    });

  }
  onChangeProject(project) {
    setTimeout(() => {
      this.newProject = new Project();
    });
  }


  create() {
    if (this.newCoreForm.valid) {
      this.btnDisabled = true;
      // Check if new brand
      const newCore = new Brief();
      if (this.brand.id === 'newBrand') {
        this.newBrand.workspaceAccesses.push(this.workspaceAccess);
        this.newProject.brand = this.newBrand;
        newCore.project = this.newProject;
      } else if (this.project.id === 'newProject') {
        this.brand.workspaceAccesses.push(this.workspaceAccess);

        this.newProject.brand = this.brands.filter((brand) => brand.id = this.brand.id)[0];
        newCore.project = this.newProject;
      } else {
        newCore.project = this.project;
      }
      newCore.template = this.briefTemplate;
      newCore.title = this.brief.title;
      newCore.workspace = this.workspaceAccess.workspace;
      newCore.owner = this.currentUser;
      this._coreService.create(newCore).subscribe(core => {
        // console.log(newCore);
        this.onSave.emit();
        setTimeout(() => {
          if (this.briefTemplate.typeTemplate.key === 'brief') {
            this._router.navigate(['/brief/project', core.id], { queryParams: { create: true, withoutInvitations: true, statusKey: 'process' } });
          } else if (this.briefTemplate.typeTemplate.key === 'pitch') {
            this._router.navigate(['/brief/project/pitch', core.id], { queryParams: { create: true, withoutInvitations: true, statusKey: 'process', autoFillResponse: true } });
          }

          this.btnDisabled = false;
        }, 200);

      });

    } else {
      this._tostrService.error('Revise los campos');
    }
  }

}
