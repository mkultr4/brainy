import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ResponseType } from 'src/app/models/brief/response-type';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import ResponseTypeSetting from 'src/app/interface/brief/ResponseTypeSetting';
import ResponseContent from 'src/app/interface/brief/ResponseContent';
import { Option } from 'src/app/models/brief/option';
import { Table } from 'src/app/models/brief/table';
import { TableColumn } from 'src/app/models/brief/table-column';
import { TableRow } from 'src/app/models/brief/table-row';
import { TableCell } from 'src/app/models/brief/table-cell';
import { TableCellType } from 'src/app/models/brief/table-cell-type';
import * as uuid from 'uuid/v4';
import { QUANTITY_TYPES } from 'src/app/data/mock-brief';

@Component({
  selector: 'app-brief-category-item-response-type',
  templateUrl: './brief-category-item-response-type.component.html',
  styleUrls: ['./brief-category-item-response-type.component.scss']
})
export class BriefCategoryItemResponseTypeComponent implements OnInit {
  // Public vars
  public contextualOpen = false;
  // Input
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() responseTypes: ResponseType[];
  @Input() tableCellTypes: TableCellType[];
  // Outpus
  @Output() onChangeResponseType = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  // On show contextutal
  onShowContextualResponse(show) {
    this.contextualOpen = show;
  }
  // On change response type
  changeResponseType(responseType: ResponseType) {
    const data = this.beforeResponseTypeChange(responseType);
    console.log(data);
    this.onChangeResponseType.emit({ type: responseType, settings: data.settings, content: data.content });
  }
  // Before response type change
  beforeResponseTypeChange(responseType: ResponseType) {
    let settings: ResponseTypeSetting;
    let content: ResponseContent;
    // Text
    if (responseType.key === 'text') {
      settings = { maxLength: 300 };
      content = { text: '' };
    }
    // Tex large
    else if (responseType.key === 'text-large') {
      settings = { maxLength: 500 };
      content = { text: '' };
    }
    else if (responseType.key === 'checkbox') {
      const optionsDefault = [
        Object.assign(new Option(), <Option>{ id: uuid(), label: 'Opción 1', type: 'checkbox', icon: undefined, order: 1 }),
        Object.assign(new Option(), <Option>{ id: uuid(), label: 'Opción 2', type: 'checkbox', icon: undefined, order: 2 })
      ];
      settings = { options: optionsDefault };
      content = { options: [] };
    } else if (responseType.key === 'radio') {
      const optionsDefault = [
        Object.assign(new Option(), <Option>{ id: uuid(), label: 'Opción 1', type: 'radio', icon: undefined, order: 1 }),
        Object.assign(new Option(), <Option>{ id: uuid(), label: 'Opción 2', type: 'radio', icon: undefined, order: 2 })
      ];
      settings = { options: optionsDefault };
      content = { options: [] };
    } else if (responseType.key === 'select') {
      const optionsDefault = [
        Object.assign(new Option(), <Option>{ id: uuid(), label: 'Opción 1', type: 'select', icon: undefined, order: 1 }),
        Object.assign(new Option(), <Option>{ id: uuid(), label: 'Opción 2', type: 'select', icon: undefined, order: 2 })
      ];
      settings = { options: optionsDefault };
      content = { options: [] };
    } else if (responseType.key === 'list') {
      const optionsDefault = [
        Object.assign(new Option(), <Option>{ id: uuid(), value: '', type: 'list', icon: undefined, order: 1 }),
        Object.assign(new Option(), <Option>{ id: uuid(), value: '', type: 'list', icon: undefined, order: 2 })
      ];
      settings = { options: optionsDefault };
      content = { options: [] };
    } else if (responseType.key === 'yes-no') {
      const optionsDefault = [
        Object.assign(new Option(), <Option>{ id: uuid(), label: 'Si', type: 'yes-no', icon: undefined, order: 1 }),
        Object.assign(new Option(), <Option>{ id: uuid(), label: 'No', type: 'yes-no', icon: undefined, order: 2 })
      ];
      settings = { options: optionsDefault };
      content = { options: [] };
    }
    else if (responseType.key === 'table') {
      const table = this.generateTableNew();
      settings = { table: table };
      content = {};
    }
    else if (responseType.key === 'ascendent') {
      const optionsDefault = [
        Object.assign(new Option(), <Option>{ id: uuid(), type: 'ascendent', icon: undefined, order: 1 }),
        Object.assign(new Option(), <Option>{ id: uuid(), type: 'ascendent', icon: undefined, order: 2 })
      ];
      settings = { options: optionsDefault };
      content = { options: [] };
    } else if (responseType.key === 'date') {
      const optionsDefault = [
        Object.assign(new Option(), <Option>{ id: uuid(), value: '', type: 'date', icon: undefined, order: 1 }),
        Object.assign(new Option(), <Option>{ id: uuid(), value: '', type: 'time', icon: undefined, order: 2 })
      ];
      settings = { options: optionsDefault };
      content = { options: [] };
    }
    else if (responseType.key === 'quantity') {
      settings = { quantity: QUANTITY_TYPES[0] };
      content = { quantity: '' };
    } else if (responseType.key === 'assessment') {
      settings = { options: this.generateOptionsAssessment(), assessment: { type: 'number' } };
      content = { options: [] };
    }
    // Accept files
    settings.acceptFiles = { video: false, file: false, audio: false, link: false, image: false };
    // Content files
    content.files = { video: undefined, file: undefined, image: undefined, audio: undefined, link: undefined };
    // All conf
    return { settings: settings, content: content };
  }
  // Generate table new
  public generateTableNew() {
    const cellTypeText = this.tableCellTypes.filter(t => t.key === 'text')[0];
    //Table Default
    const tableDefault: Table = {
      id: uuid(),
      isNew: true,
      columns: <TableColumn[]>[
        <TableColumn>{ id: uuid(), label: 'Texto', width: 0 },
        <TableColumn>{ id: uuid(), label: 'Texto', width: 0 },
        <TableColumn>{ id: uuid(), label: 'Texto', width: 0 },
        <TableColumn>{ id: uuid(), label: 'Texto', width: 0 }
      ],
      rows: <TableRow[]>[
        <TableRow>{
          id: uuid(), label: 'Texto',
          cells: <TableCell[]>[
            <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true },
            <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true },
            <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true }
          ]
        },
        <TableRow>{
          id: uuid(), label: 'Texto',
          cells: <TableCell[]>[
            <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true },
            <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true },
            <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true }
          ]
        }
      ]
    };
    return tableDefault;
  }
  public generateOptionsAssessment() {
    let options: Option[] = [];
    for (let i = 0; i < 10; i++) {
      const option = Object.assign(new Option(), <Option>{ id: uuid(), type: 'assessment-number', icon: undefined, order: i + 1 })
      options.push(option);
    }
    return options;
  }

}
