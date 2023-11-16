import { Component, OnInit, Input } from '@angular/core';
import { Core } from 'src/app/models/cores/core';
import { Invitation } from 'src/app/models/invitations/invitation';

@Component({
  selector: 'app-core-close-participants',
  templateUrl: './core-close-participants.component.html',
  styleUrls: ['./core-close-participants.component.scss']
})
export class CoreCloseParticipantsComponent implements OnInit {
  @Input() core: Core;
  @Input() invitations: Invitation[];
  @Input() withoutBorder =  false;
  @Input() showBrand = false;
  constructor() { }

  ngOnInit() {
  }

}
