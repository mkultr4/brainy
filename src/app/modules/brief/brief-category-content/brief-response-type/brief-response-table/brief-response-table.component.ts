import { Component, OnInit, Output, Input, AfterViewInit, ViewChild, ElementRef ,EventEmitter} from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import * as uuid from 'uuid/v4';
import { TableCell } from 'src/app/models/brief/table-cell';
import { TableRow } from 'src/app/models/brief/table-row';
import { ToastrService } from 'ngx-toastr';
import { TableColumnResizeDirective } from 'src/app/modules/shared/table-column-resize/table-column-resize.directive';
import { TableColumn } from 'src/app/models/brief/table-column';
import { TableCellType } from 'src/app/models/brief/table-cell-type';
@Component({
  selector: '[app-brief-response-table]',
  templateUrl: './brief-response-table.component.html',
  styleUrls: ['./brief-response-table.component.scss']
})
export class BriefResponseTableComponent implements OnInit, AfterViewInit {
  // Public vars
  public isResizing = false;
  public $table;
  public addRowWidth = 'auto';
  // Inputs
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() editable = false;
  @Input() refillable = false;
  @Input() focusResponse = false;
  @Input() tableCellTypes: TableCellType[];
  // Outpus
  @Output() onSettingsChange = new EventEmitter();
  @Output() onContentChange = new EventEmitter();
  @Output() onContentFocus = new EventEmitter();
  // View Child
  @ViewChild('mainTable') mainTable: ElementRef;
  @ViewChild(TableColumnResizeDirective) tableResizable: TableColumnResizeDirective;
  // Constructor
  constructor(
    private elementRef: ElementRef,
    private _toastrService: ToastrService
  ) { }
  // On init
  ngOnInit() {
  }
  // After view init
  ngAfterViewInit() {
    setTimeout(() => {
      this.$table = $(this.mainTable.nativeElement);
      this.initEventsTable();
    });

  }
  //Events
  initEventsTable() {
    //Mouse Over
    this.$table.on('mouseover', '.delete-indicator-table', (event) => {
      if (this.editable && !this.isResizing) {
        var delEl = $(event.currentTarget);
        if (delEl.closest('.column-closest').length > 0) {
          var parent = delEl.closest('.column-closest');
          var deleteIndicator = $('<span class="delete-outiline-indicator"></span>');
          deleteIndicator.height(this.$table.height() + 'px');
          parent.append(deleteIndicator);
        }
        if (delEl.closest('.row-closest').length > 0) {
          var parent = delEl.closest('.row-closest');
          var deleteIndicator = $('<span class="delete-outiline-indicator"></span>');
          deleteIndicator.width(this.$table.width() + 'px');
          parent.append(deleteIndicator);
        }
      }
    })
    //Mouse Out
    this.$table.on('mouseout', '.delete-indicator-table', (event) => {
      if (this.editable && !this.isResizing) {
        const delEl = $(event.currentTarget);
        if (delEl.closest('.column-closest').length > 0) {
          var parent = delEl.closest('.column-closest');
          parent.find('.delete-outiline-indicator').remove();
        }
        if (delEl.closest('.row-closest').length > 0) {
          var parent = delEl.closest('.row-closest');
          parent.find('.delete-outiline-indicator').remove();
        }
      }
    })

    //On mouse enter
    this.$table.on("mouseenter", 'th,td', (event) => {
      if (this.editable && !this.isResizing) {
        const col = $(event.currentTarget).parent().children().index($(event.currentTarget));
        const row = $(event.currentTarget).parent().parent().children().index($(event.currentTarget).parent());
        this.$table.find(' > thead > tr > th:eq(' + col + ')').addClass('mouseover');
        if ($(event.target).closest('td').length > 0) {
          this.$table.find(' > tbody > tr:eq(' + row + ')').addClass('mouseover');
        }
      }
    })
    //On mouse leave
    this.$table.on("mouseleave", 'th,td', (event) => {
      const col = $(event.currentTarget).parent().children().index($(event.currentTarget));
      const row = $(event.currentTarget).parent().parent().children().index($(event.currentTarget).parent());
      //console.log('LeaveRow: ' + row + ', Column: ' + col);
      this.$table.find(' > thead > tr > th:eq(' + col + ')').removeClass('mouseover');
      this.$table.find(' > tbody > tr:eq(' + row + ')').removeClass('mouseover');
    })
  }
  //Destroy Events
  destroyEvents() {
    if (this.$table && this.$table.length > 0) {
      //Mouse Over
      this.$table.off('mouseover', '.delete-indicator-table', () => { });
      //Mouse Out
      this.$table.off('mouseout', '.delete-indicator-table', () => { });
      //On column resize
      this.$table.off('column-resize', () => { });
      //On mouse enter
      this.$table.off("mouseenter", 'th,td', (event) => { });
      //On mouse leave
      this.$table.off("mouseleave", 'th,td', (event) => { })
    }
  }
  //Add row
  addRow($event) {
    /*$event.preventDefault();
     $event.stopPropagation();*/
     const cellTypeText = this.tableCellTypes.filter( t => t.key === 'text')[0];
    if (this.briefCategoryItem.responseSettings.table.rows.length <= 10) {
      var row = { id: uuid(), label: 'Texto', cells: [] };
      if ((this.briefCategoryItem.responseSettings.table.columns.length - 1) > 0) {

        this.briefCategoryItem.responseSettings.table.columns.forEach((col, index) => {
          if (index > 0) {
            let newCell = <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true };
            row.cells.push(Object.assign(new TableCell(), newCell));
          }
        })


      }
      this.briefCategoryItem.responseSettings.table.rows.push(Object.assign(new TableRow(), row));
      setTimeout(() => {
        this.tableResizable.startResizer();
        // Update
        this.onSettingsChange.emit();
      })
    } else {
      this._toastrService.info('El límite es de 10 filas');
    }

  }
  // Remove row
  removeRow($event, $index) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.briefCategoryItem.responseSettings.table.rows.length > 0) {
      if (this.briefCategoryItem.responseSettings.table.rows[$index]) {
        this.briefCategoryItem.responseSettings.table.rows.splice($index, 1);
      }
      setTimeout(() => {
        this.tableResizable.startResizer();
        // Update
        this.onSettingsChange.emit();
      })

    }

  }
  // Add Column
  addColumn($event) {
    $event.preventDefault();
    $event.stopPropagation();
    const cellTypeText = this.tableCellTypes.filter( t => t.key === 'text')[0];
    let column = { id: uuid(), label: 'Texto', width: '' };
    if (this.briefCategoryItem.responseSettings.table.columns.length <= 4) {

      this.briefCategoryItem.responseSettings.table.columns.push(Object.assign(new TableColumn(), column));
      if (this.briefCategoryItem.responseSettings.table.rows.length > 0) {
        this.briefCategoryItem.responseSettings.table.rows.forEach((row, index) => {
          let newCell = <TableCell>{ id: uuid(), type: cellTypeText , value: "", options: [], isNew: true };
          row.cells.push(Object.assign(new TableCell(), newCell));
        })
      }
      setTimeout(() => {
        this.tableResizable.startResizable();
        this.onResizeFn();
        // Update
        this.onSettingsChange.emit();
      })
    }
  }
  // Remove column
  removeColumn($event, $index) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.briefCategoryItem.responseSettings.table.columns.length > 0) {
      if (this.briefCategoryItem.responseSettings.table.columns[$index]) {
        //$scope.categoryItem.table.rows.splice($index, 1);
        this.briefCategoryItem.responseSettings.table.rows.forEach((row, index) => {
          if (row.cells[$index - 1]) {
            row.cells.splice($index - 1, 1);
          }
        })

        this.briefCategoryItem.responseSettings.table.columns.splice($index, 1);

        setTimeout(() => {
          this.tableResizable.startResizable();
          this.onResizeFn();
          // Update
        this.onSettingsChange.emit();
        })
      }
    }

  }
  onResizeInit() {
    setTimeout(() => {
      this.onResizeFn();
        // Update
        this.onSettingsChange.emit();
    });
  }
  onResizing() {
    this.isResizing = true;
    // this.onResizeFn();
  }
  onResizeEnd() {
    this.isResizing = false;
    this.onResizeFn();
    setTimeout(()=>{
        // Update
        this.onSettingsChange.emit();
    });
  }

  onResizeFn() {
    let th = this.$table.find('thead th:not(.not-resizable)');

    var widthAmount = 0;
    th.each((index, el) => {
      var width = $(el).outerWidth();
      widthAmount += width;
      this.briefCategoryItem.responseSettings.table.columns[index].width = width;
    })
    this.addRowWidth = this.briefCategoryItem.responseSettings.table.columns[0].width + 'px';

    $(this.elementRef.nativeElement).find('.brief-table-add').css({ width: this.$table.outerWidth() + 'px' })
  }
  // Functions change
  onChangeInput(){
    this.onSettingsChange.emit();
  }

  ngOnDestroy() {
    this.destroyEvents();
  }

}
