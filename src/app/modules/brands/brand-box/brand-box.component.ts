import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MzDropdownBrainyComponent } from '../../shared/mz-dropdown-brainy/mz-dropdown-brainy.component';
import { Brand } from '../../../models/brands/brand';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-box',
  templateUrl: './brand-box.component.html',
  styleUrls: ['./brand-box.component.scss']
})
export class BrandBoxComponent implements OnInit {
  @Input() brand: Brand;
  // Outputs
  @Output() boxOnDelete = new EventEmitter();
  @Output() boxOnEdit = new EventEmitter();
  // View chidls
  @ViewChild('menu', { read: MzDropdownBrainyComponent }) menu: MzDropdownBrainyComponent;
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  mouseleave() {
    this.menu.close();
  }

  delete() {
    this.boxOnDelete.emit(this.brand);
  }
  edit() {
    this.boxOnEdit.emit(this.brand);
  }
  viewProfile() {
    this._router.navigate(['/brands/' + this.brand.id]);
  }

}
