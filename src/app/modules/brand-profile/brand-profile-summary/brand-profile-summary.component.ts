import { Component, OnInit, Input } from '@angular/core';
import { Brand } from '../../../models/brands/brand';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-profile-summary',
  templateUrl: './brand-profile-summary.component.html',
  styleUrls: ['./brand-profile-summary.component.scss']
})
export class BrandProfileSummaryComponent implements OnInit {

  // Inputs
  @Input() view = 'members';
  @Input() brand: Brand;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  viewParticipants() {
    this._router.navigate(['members'], { relativeTo: this._activatedRoute });
  }

}
