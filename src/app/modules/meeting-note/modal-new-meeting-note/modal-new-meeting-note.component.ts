import { Component, OnInit, Input, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { TIMEPICKER_CONFIG, DATEPICKER_CONFIG } from '../../../config/app.config';
import { MzModalComponent } from 'ngx-materialize';
import { NgForm } from '@angular/forms';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Feedback } from '../../../models/feedback/feedback';
import { Project } from '../../../models/projects/project';
import { Brand } from '../../../models/brands/brand';
import { BrandStrategyService } from '../../../services/brands/brand-strategy.service';
import { ProjectStrategyService } from '../../../services/projects/project-strategy.service';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { Router } from '@angular/router';
import { MeetingNote } from '../../../models/meeting-note/meeting-note';
import { UtilService } from '../../../services/utils/util.service';
import { MeetingNoteType } from '../../../models/meeting-note/meeting-note-type';
import { MeetingNoteStrategyService } from '../../../services/meeting-note/meeting-note-strategy.service';
import { CoreType } from 'src/app/models/cores/core-type';

@Component({
  selector: 'app-modal-new-meeting-note',
  templateUrl: './modal-new-meeting-note.component.html',
  styleUrls: ['./modal-new-meeting-note.component.scss']
})
export class ModalNewMeetingNoteComponent implements OnInit, AfterContentInit {
  public scheduledText = 'scheduled';
  public datePickerOptions: any = Object.assign({}, DATEPICKER_CONFIG);
  public timePickerOptions: any = Object.assign({}, TIMEPICKER_CONFIG);
  public modalOptions: Materialize.ModalOptions = {
    opacity: 0,
    endingTop: '50%',
    dismissible: false,
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
  public coreType = new CoreType();
  // New
  public newBrand = new Brand();
  public newProject = new Project();
  // Times
  public durationTimes = [];
  public titleChange = false;
  public btnDisabled = false;

  private _meetingNoteService;
  private _brandService;
  private _projectService;

  // Inputs
  @Input() meetingNote: MeetingNote;
  @Input() meetingNoteTypes: MeetingNoteType[];
  @Input() workspaceAccess: WorkspaceAccess;
  // View child
  @ViewChild('modal') public modal: MzModalComponent;
  @ViewChild('newCoreForm') public newCoreForm: NgForm;
  @ViewChild('inputTitle') inputTitle: ElementRef;
  constructor(
    private _brandStrategyService: BrandStrategyService,
    private _projectStrategyService: ProjectStrategyService,
    private _meetingNoteStrategyService: MeetingNoteStrategyService,
    private _coreStrategyService: CoreStrategyService,
    private _tostrService: ToastrService,
    private _authenticationService: AuthenticationService,
    private _utilService: UtilService,
    private _router: Router
  ) {
    // this.brand.id = '';
    // this.project.id = '';
    this.datePickerOptions.container = 'body';
    this.datePickerOptions.format = 'dd/mm/yy';
    this.datePickerOptions.min = new Date();
    this.durationTimes = this._utilService.getTimeArray(30);
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
    this._projectService = this._projectStrategyService.getService();
    this._brandService = this._brandStrategyService.getService();
    this.workspaceAccess = this._authenticationService.getAuthWorkspaceAccess();
    this.coreType.id = 3;
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
    // Meeting Types
    this._meetingNoteService.getMeetingNoteTypes().subscribe(types => {
      this.meetingNoteTypes = types;
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
  focusMeetingType() {
    let focus = false;
    if (this.brand.id === 'newBrand') {
      focus = (this.newBrand.name && this.newBrand.name.length > 0) &&
        (this.newProject.name && this.newProject.name.length > 0);
    } else if (this.project.id === 'newProject') {
      focus = this.newProject.name && this.newProject.name.length > 0;
    } else {
      focus = this.brand.id && this.project.id;
    }

    return focus;
  }
  // Select sync type
  selectSync(syncType) {
    this.meetingNote.syncType = syncType;
  }
  // Create
  create() {
    if (this.newCoreForm.valid) {
      this.btnDisabled = true;
      // Check if new brand
      const newCore = <MeetingNote>this.meetingNote;
      if (this.brand.id === 'newBrand') {
        this.newBrand.workspaceAccesses.push(this.workspaceAccess);
        this.newProject.brand = this.newBrand;
        newCore.project = this.newProject;
      } else if (this.project.id === 'newProject') {
        this.brand.workspaceAccesses.push(this.workspaceAccess);
        //console.log(this.brand);
        //console.log(this.newProject);
        this.newProject.brand = this.brands.filter((brand) => brand.id = this.brand.id)[0];
        newCore.project = this.newProject;
      } else {
        newCore.project = this.project;
      }
      newCore.workspace = this.workspaceAccess.workspace;
      newCore.owner = this._authenticationService.getAuthUser();
      newCore.type = this.coreType;

      this._meetingNoteService.create(newCore).subscribe(meetingNoteSaved => {
        this.modal.closeModal();
        setTimeout(() => {
          this._router.navigate(['/meeting-note', meetingNoteSaved.core.id],
            { queryParams: { create: true, type: meetingNoteSaved.meeting_type.key, withoutInvitations: true } });
          this.btnDisabled = false;
        }, 200);

      });

    } else {
      this._tostrService.error('Revise los campos');
    }
  }
}
