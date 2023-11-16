import { Injectable } from '@angular/core';
declare var rangy: any;

export class SelectionRange {
  public range: any;
  public div: any;
  public empty = true;
  public plainText = '';
  constructor() { }

}
@Injectable()
export class RangyService {

  public self;
  constructor() {
    this.self = rangy;
  }

  getHTMLOfSelection() {
    let range;
    const selectionRange = new SelectionRange();
    if (window.getSelection) {
      const selection = rangy.getSelection();
      const selectedText = selection.toString();

      if (selection.rangeCount > 0 && !(selectedText.length === 0)) {


        range = selection.getRangeAt(0);
        // console.log(range.getBoundingClientRect())
        // var rect = range.getBoundingClientRect();
        const clonedSelection = range.cloneContents();
        const div = document.createElement('div');
        div.appendChild(clonedSelection);
        selectionRange.empty = false;
        selectionRange.range = range;
        selectionRange.div = div;
        selectionRange.plainText = selectedText;
      }
    }
    return selectionRange;
  }

  clearSelection() {
    if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
    }
  }

}
