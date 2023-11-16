import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { FileUtilService } from 'src/app/services/utils/file-util.service';
import { ToastrService } from 'ngx-toastr';
import { ProposalFile } from 'src/app/models/brief/proposal-file';
import { Observable } from 'rxjs';
import { Proposal } from 'src/app/models/brief/proposal';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'app-proposal-upload',
  templateUrl: './proposal-upload.component.html',
  styleUrls: ['./proposal-upload.component.scss'],
  host: {
    'class': 'proposal-upload-wrapper'
  }
})
export class ProposalUploadComponent implements OnInit {
  // Services
  private _briefService;
  // Public vars
  @Input() proposal: Proposal = new Proposal();;
  // Constructor
  constructor(
    private _briefStrategyService: BriefStrategyService,
    private _fileUtilService: FileUtilService,
    private _toastrService: ToastrService
  ) {
    this._briefService = this._briefStrategyService.getService();
  }
  // Init
  ngOnInit() {
  }
  // Read file
  fileRead(file) {
    if (file) {
      const valid = this.validateImage(file);
      if (valid) {
        this.processImage(file).subscribe(proposalFile => {
          this.proposal.files.push(proposalFile);
          if (!this.proposal.id) {
            this._briefService.addProposal(this.proposal).subscribe(proposal => {
              this.proposal = proposal;
            });
          } else {
            this._briefService.updateProposal(this.proposal).subscribe(proposal => {
              this.proposal = proposal;
            });
          }

        });
      }
    }
  }
  // Validate image
  validateImage(file) {
    let valid = false;
    if (this._fileUtilService.validateFileExtension(file)) {
      valid = true;
    } else {
      this._toastrService.info('Solo se pueden subir imágenes')
    }

    if (this._fileUtilService.validateFileSize(file)) {
      valid = true;
    } else {
      this._toastrService.info('El tamaño máximo de imagen es de ' + this._fileUtilService.maxFileSizeImage + 'mb')
    }
    return valid;
  }
  // Process image
  processImage(file) {
    const observable = Observable.create((observer) => {
      const url = URL.createObjectURL(file);
      const img = document.createElement('img');
      img.src = url;
      img.onload = (event) => {
        // console.log(event);
        const w = img.width;
        const h = img.height;

        const proposalFile = new ProposalFile();
        proposalFile.id = uuid();
        proposalFile.url = url;
        proposalFile.setting = { naturalWidth: w, naturalHeight: h }
        proposalFile.name = file.name;
        proposalFile.created = new Date();
        img.remove();
        observer.next(proposalFile);
      };

    });
    return observable;
  }
  // Send message
  uploadMessage(){
    if (!this.proposal.id) {
      this._briefService.addProposal(this.proposal).subscribe(proposal => {
        this.proposal = proposal;
        this._toastrService.info('Mensaje enviado correctamente');
      });
    } else {
      this._briefService.updateProposal(this.proposal).subscribe(proposal => {
        this.proposal = proposal;
        this._toastrService.info('Mensaje actualizado correctamente');
      });
    }
  }
  deleteFile(file){
    const index = this.proposal.files.findIndex( f =>f.id === file.id);
    this.proposal.files.splice(index,1);
    if (!this.proposal.id) {
      this._briefService.addProposal(this.proposal).subscribe(proposal => {
        this.proposal = proposal;
        
      });
    } else {
      this._briefService.updateProposal(this.proposal).subscribe(proposal => {
        this.proposal = proposal;
        
      });
    }
  }
}
