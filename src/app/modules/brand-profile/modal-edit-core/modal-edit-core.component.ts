import { Component, OnInit, AfterContentInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Core } from '../../../models/cores/core';
import { Brand } from '../../../models/brands/brand';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { MzModalComponent } from 'ngx-materialize';
import { BrandStrategyService } from '../../../services/brands/brand-strategy.service';
import { ToastrService } from 'ngx-toastr';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';

@Component({
  selector: 'app-modal-edit-core',
  templateUrl: './modal-edit-core.component.html',
  styleUrls: ['./modal-edit-core.component.scss']
})
export class ModalEditCoreComponent implements OnInit, AfterContentInit {
  public core: Core;
  public brands: Array<Brand>;
  public btnDisabled = false;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    complete: () => {
      this.core = undefined;
    }
  };
  // Services
  private _brandService;
  private _coreService;
  // Input
  @Input() workspaceAccess: WorkspaceAccess;
  // View childs
  @ViewChild('modal') public modal: MzModalComponent;
  @ViewChild('projectTitleInput') public projectTitleInput: ElementRef;

  constructor(
    private _brandStrategyService: BrandStrategyService,
    private _coreStrategyService: CoreStrategyService,
    private _toastrService: ToastrService
  ) {
    this._brandService = this._brandStrategyService.getService();
    this._coreService = this._coreStrategyService.getService();
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this._brandService.findAll(this.workspaceAccess.workspace.id).subscribe((brands) => {
      this.brands = brands;
    });
  }

  openModal(core: Core) {
    this.core = Object.assign(new Core(), core);
    this.modal.openModal();
    setTimeout(() => {
      this.projectTitleInput.nativeElement.focus();
    });
  }

  updateProject() {
    this.btnDisabled = true;
    this._coreService.updateCore(this.core).subscribe(update => {
      this.btnDisabled = false;
      if (update) {
        this._toastrService.info('Se edito correctamente el proyecto');
        this.modal.closeModal();
      } else {
        this._toastrService.error('No se pudo editar el proyecto');
      }
    });
  }
}
