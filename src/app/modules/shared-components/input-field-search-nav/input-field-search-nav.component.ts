import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-field-search-nav',
  templateUrl: './input-field-search-nav.component.html',
  styleUrls: ['./input-field-search-nav.component.scss']
})
export class InputFieldSearchNavComponent implements OnInit {
  public searchFocus = false;
  @Input() search = '';
  @Input() closBtn  = true;
  @Input() searchPlaceholder = 'Busca por nombre';
  @Output() inputOnClose = new EventEmitter();
  @Output() inputOnChangeSearch = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  closeSearch() {
    this.inputOnClose.emit();
  }
  fnMainSearchFocus(focus) {
    this.searchFocus = focus;
  }

  changeSearch() {
    this.inputOnChangeSearch.emit(this.search);
  }



}
