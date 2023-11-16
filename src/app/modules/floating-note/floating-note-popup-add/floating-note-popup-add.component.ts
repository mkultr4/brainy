import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Note } from 'src/app/models/notes/note';
import { Project } from 'src/app/models/projects/project';
import { Brand } from 'src/app/models/brands/brand';
import { BrandStrategyService } from 'src/app/services/brands/brand-strategy.service';
import { ProjectStrategyService } from 'src/app/services/projects/project-strategy.service';
import { NoteStrategyService } from 'src/app/services/notes/note-strategy.service';


@Component({
  selector: 'app-floating-note-popup-add',
  templateUrl: './floating-note-popup-add.component.html',
  styleUrls: ['./floating-note-popup-add.component.scss']
})
export class FloatingNotePopupAddComponent implements OnInit {
  // Public vars
  public note: Note = new Note();
  public brands;
  public projects;
  public brandSelected: Brand = new Brand();
  public projectSelected: Project = new Project();
  // Services
  private _brandService;
  private _projectService;
  private _noteService;
  // Workflow
  public titleChange = false;
  public btnDisabled = false;
  // Inputs
  @Input() coreTypes;
  // Output
  @Output() onAdd = new EventEmitter();
  // View child
  @ViewChild('inputTitle') inputTitle: ElementRef;
  // Constructor
  constructor(
    private _brandStrategyService: BrandStrategyService,
    private _projectStrategyService: ProjectStrategyService,
    private _noteStrategyService: NoteStrategyService
  ) {
    this._noteService = this._noteStrategyService.getService();
    this._projectService = this._projectStrategyService.getService();
    this._brandService = this._brandStrategyService.getService();
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    setTimeout(()=>{
      this.inputTitle.nativeElement.focus();
    });
    this._brandService.findAll().subscribe(brands => {
      this.brands = Object.assign([], brands);
    });
    this._projectService.findAll().subscribe(projects => {
      this.projects = Object.assign([], projects);
    });
  }

  onChangeTitle(title) {
    this.titleChange = true;
  }
  onChangeBrand($event) {
    this.projectSelected = new Project();


  }
  onChangeProject($event) {

  }

  createNote() {
    
    this.note.content = '';
    this.note.type = this.coreTypes.filter(t => t.key === 'note')[0];
    this.note.project = this.projectSelected;
    this._noteService.create(this.note).subscribe();
    this.onAdd.emit(this.note);
  }

}
