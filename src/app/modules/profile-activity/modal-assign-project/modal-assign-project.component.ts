import { Component, OnInit, Output, EventEmitter, ViewChild, AfterContentInit, Input } from '@angular/core';
import { Brand } from '../../../models/brands/brand';
import { Project } from '../../../models/projects/project';
import { MzModalComponent } from 'ngx-materialize';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { ProjectStrategyService } from '../../../services/projects/project-strategy.service';
import { BrandStrategyService } from '../../../services/brands/brand-strategy.service';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';

@Component({
  selector: 'app-modal-assign-project',
  templateUrl: './modal-assign-project.component.html',
  styleUrls: ['./modal-assign-project.component.scss']
})
export class ModalAssignProjectComponent implements OnInit {

  // Public vars
  public brands: Array<Brand> = new Array<Brand>();
  public projects: Array<Project> = new Array<Project>();
  public brandSelected: Brand = new Brand();
  public projectSelected: Project = new Project();
  public btnDisabled = false;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    // ready: (modal, trigger) => },
    complete: () => {
      this.brandSelected = new Brand();
      this.projectSelected = new Project();
      this.brandSelected.id = '';
    }
  };
  // services
  private _brandService;
  private _projectService;
  private _workspaceAccessService;
  // Inputs
  public workspaceAccess: WorkspaceAccess;
  // Outputs
  @Output() modalOnAssign = new EventEmitter();
  // View childs
  @ViewChild('profileAssignForm') newFeedForm: NgForm;
  @ViewChild('modal') public modal: MzModalComponent;

  constructor(
    private _toastrService: ToastrService,
    private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
    private _projectStrategyService: ProjectStrategyService,
    private _brandSelectedStrategyService: BrandStrategyService,
  ) {
    this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
    this._projectService = this._projectStrategyService.getService();
    this._brandService = this._brandSelectedStrategyService.getService();

  }
  onChangeBrand($event) {
    this.projectSelected.id = '';
    // this.projects = Object.assign([], this._projectsService.findAll());

  }
  ngOnInit() {
  }
  openModal() {
    this.modal.openModal();
  }
  initModalData(workspaceAccess: WorkspaceAccess) {
    this.workspaceAccess = workspaceAccess;
    console.log('init modal', this.workspaceAccess);
    // Brands
    this._brandService.findAll(workspaceAccess.workspace.id).subscribe(brands => {

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
    this._projectService.findAll(workspaceAccess.workspace.id).subscribe(projects => {
      this.projects = this._projectService.castArrayObject(projects, this.workspaceAccess);
    });

  }
  // Assign
  assign() {
    let brand = null; let project = null;
    if (this.brandSelected.id) {
      brand = this.brands.filter(b => b.id === this.brandSelected.id)[0];
    }
    if (this.projectSelected.id) {
      if (this.projectSelected.id !== 'all') {
        project = this.projects.filter(p => p.id === this.projectSelected.id)[0];
      } else {
        project = new Project();
        project.id = 'all';
      }

    }
    this.btnDisabled = true;
    this._workspaceAccessService.assignBrandAndProject(brand, project).subscribe(result => {
      this.btnDisabled = false;
      if (result) {
        this._toastrService.info('Marca y proyecto asignada correctamente');
        this.modalOnAssign.emit({ brand: result.brand, project: result.project });
        this.modal.closeModal();
      } else {
        this._toastrService.error('No se pudo asignar la marca y el proyecto');
      }
    });

  }


}
