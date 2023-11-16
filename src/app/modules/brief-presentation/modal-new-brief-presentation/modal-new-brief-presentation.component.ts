import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Brief } from 'src/app/models/brief/brief';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { MzModalComponent } from 'ngx-materialize';
import { NgForm } from '@angular/forms';
import { BriefPresentation } from 'src/app/models/brief-presentation/brief-presentation';
import { Core } from 'src/app/models/cores/core';
import { User } from 'src/app/models/users/user';
import { ToastrService } from 'ngx-toastr';
import { CoreType } from 'src/app/models/cores/core-type';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-new-brief-presentation',
  templateUrl: './modal-new-brief-presentation.component.html',
  styleUrls: ['./modal-new-brief-presentation.component.scss']
})
export class ModalNewBriefPresentationComponent implements OnInit {
  public briefPresentation = new BriefPresentation();
  public btnDisabled = false;
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
  // Services
  private _coreService;
  // Inputs
  @Input() brief: Brief;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() owner: User;
  @Input() coreTypes: CoreType[];
  // View child
  @ViewChild('modal') public modal: MzModalComponent;
  @ViewChild('newCoreForm') public newCoreForm: NgForm;
  @ViewChild('inputTitle') inputTitle: ElementRef;
  constructor(
    private _router: Router,
    private _toastrService: ToastrService,
    private _coreStrategService: CoreStrategyService
  ) { 
    this._coreService = this._coreStrategService.getService();
  }

  ngOnInit() {
  }

  openModal(){
    this.modal.openModal();
  }

  create() {
    if (this.newCoreForm.valid) {
      this.btnDisabled = true;
      // Check if new brand
      const newCore = new Core();

      newCore.title = this.briefPresentation.title;
      newCore.workspace = this.workspaceAccess.workspace;
      newCore.owner = this.owner;
      newCore.type = this.coreTypes.filter(t => t.key === 'brief-presentation')[0];
      newCore.project = this.brief.project;

       this._coreService.create(newCore).subscribe(core => {
        this.modal.closeModal();
        setTimeout(() => {
          this._router.navigate(['/brief/presentation', core.id], { queryParams: { create: true, withoutInvitations: true } });
          this.btnDisabled = false;
        }, 200);

      });

    } else {
      this._toastrService.error('Revise los campos');
    }
  }

}
