import { Component, OnInit, ViewChild, Input, AfterContentInit, ElementRef } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';
import { Feedback } from '../../../models/feedback/feedback';
import { Brand } from '../../../models/brands/brand';
import { Project } from '../../../models/projects/project';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Core } from '../../../models/cores/core';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { BrandStrategyService } from '../../../services/brands/brand-strategy.service';
import { ProjectStrategyService } from '../../../services/projects/project-strategy.service';
import { CoreType } from 'src/app/models/cores/core-type';

@Component({
  selector: 'app-modal-new-feedback',
  templateUrl: './modal-new-feedback.component.html',
  styleUrls: ['./modal-new-feedback.component.scss']
})
export class ModalNewFeedbackComponent implements OnInit, AfterContentInit {
  public modalOptions: Materialize.ModalOptions = {
    opacity: 0,
    endingTop: '50%',
    dismissible: false,
    inDuration: 0,
    ready: () => {
      this.inputTitle.nativeElement.focus();
    },
    complete: () => { }
  };
  public brands: Brand[];
  public projects: Project[];
  // Brand & Project chooses
  public brand = new Brand();
  public project = new Project();
  // New
  public newBrand = new Brand();
  public newProject = new Project();
  //Core type
  public coreType = new CoreType();

  public titleChange = false;
  public btnDisabled = false;

  private _coreService;
  private _brandService;
  private _projectService;

  // Inputs
  @Input() feedback: Feedback;
  @Input() workspaceAccess: WorkspaceAccess;
  // View child
  @ViewChild('modal') public modal: MzModalComponent;
  @ViewChild('newCoreForm') public newCoreForm: NgForm;
  @ViewChild('inputTitle') inputTitle: ElementRef;
  constructor(
    private _brandStrategyService: BrandStrategyService,
    private _projectStrategyService: ProjectStrategyService,
    private _coreStrategyService: CoreStrategyService,
    private _tostrService: ToastrService,
    private _authenticationService: AuthenticationService,
    private _authService: AuthenticationService,
    private _router: Router
  ) {

    this._coreService = _coreStrategyService.getService();
    this._projectService = _projectStrategyService.getService();
    this._brandService = _brandStrategyService.getService();
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    this.coreType.id = 1;
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    // Brands
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


  openModal() {
    this.modal.openModal();
  }
  onChangeTitle(title) {
    this.titleChange = true;
  }
  onChangeBrand(brand) {
    console.log(this.brand.id);
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
      const newCore = new Core();
      if (this.brand.id === 'newBrand') {
        this.newBrand.workspaceAccesses.push(this.workspaceAccess);
        this.newProject.brand = this.newBrand;
        newCore.project = this.newProject;
      } else if (this.project.id === 'newProject') {
        this.brand.workspaceAccesses.push(this.workspaceAccess);
        console.log(this.brand);
        console.log(this.newProject);
        this.newProject.brand = this.brands.filter((brand) => brand.id = this.brand.id)[0];
        newCore.project = this.newProject;
      } else {
        newCore.project = this.project;
      }
      newCore.title = this.feedback.title;
      newCore.workspace = this.workspaceAccess.workspace;
      newCore.owner = this._authenticationService.getAuthUser();
      newCore.type = this.coreType;
      this._coreService.create(newCore).subscribe(core => {
        this.modal.closeModal();
        setTimeout(() => {
          this._router.navigate(['/feedback', core.id], { queryParams: { create: true, withoutInvitations: true } });
          this.btnDisabled = false;
        }, 200);

      });

    } else {
      this._tostrService.error('Revise los campos');
    }
  }

}
