import { Component, OnInit, ViewChild, OnDestroy, Input, AfterContentInit } from '@angular/core';
import { DownloadProjectService } from '../services/download-project.service';
import { ISubscription } from 'rxjs/Subscription';
import { MzModalComponent } from 'ngx-materialize';
import { Core } from 'src/app/models/cores/core';


@Component({
  selector: 'app-modal-download-project,[app-modal-download-project]',
  templateUrl: './modal-download-project.component.html',
  styleUrls: ['./modal-download-project.component.scss'],
  providers: []
})
export class ModalDownloadProjectComponent implements OnInit, OnDestroy, AfterContentInit {
  public core;
  public fileName = '';
  public downloadComments = true;
  public generateExport = false;
  public exporting = false;
  public subscriptionShow: ISubscription;
  public export: any;
  // Input
  @Input() withComments = true;
  @Input() showWithSubscription = true;
  // Modal
  @ViewChild('modal') public modal: MzModalComponent;

  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    ready: (modal, trigger) => { },
    complete: () => {
      this.fileName = '';
      this.core = undefined;
      this.exporting = false;
      this.generateExport = false;
      this.export = undefined;
    }
  };
  constructor(private _downloadProjectService: DownloadProjectService) {

  }
  ngAfterContentInit() {
    if (this.showWithSubscription) {
      this.subscriptionShow = this._downloadProjectService.obsDownload.subscribe(core => {
        console.log(core);
        this.showModal(core);
      });
    }
  }
  showModal(core: Core) {
    this.core = core;
    if (this.core) {
      this.fileName = this._downloadProjectService.getDownloadName(core);
      this.openModal();
    }
  }
  ngOnInit() {
  }
  openModal() {
    this.modal.openModal();
  }
  closeModal() {
    if (!this.exporting) {
      this.modal.closeModal();
    }
  }
  generate() {
    this.generateExport = true;
    this.exporting = true;

    this._downloadProjectService.downloadProject(this.core).then(file => {
      this.exporting = false;
      this.export = file;
    });

  }
  download() {
    window.open(this.export);
    this.modal.closeModal();
  }
  ngOnDestroy() {
    if (this.subscriptionShow) {
      this.subscriptionShow.unsubscribe();
    }
  }
}
