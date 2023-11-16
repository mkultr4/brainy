import { Component, OnInit, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import * as uuid from 'uuid/v4';
import { RangyService } from 'src/app/services/utils/rangy.service';
@Component({
  selector: 'app-topic-editable-toolbar',
  templateUrl: './topic-editable-toolbar.component.html',
  styleUrls: ['./topic-editable-toolbar.component.scss']
})
export class TopicEditableToolbarComponent implements OnInit, AfterViewInit, OnDestroy {
  // Public vars
  public dropdownColorId = 'dropdown-color-' + uuid();
  public show = false;
  // Inputs
  @Input() contentEditableId: string;

  constructor(
    private _rangy: RangyService
  ) { }

  ngOnInit() {
  }
  // After view init
  ngAfterViewInit() {
    setTimeout(() => {

    });
  }

  // Get selection start
  getSelectionStart() {
    var node = document.getSelection().anchorNode;

    return (node && node.nodeType == 3 ? node.parentNode : node);


  }
  // Execute
  execute($event, command: string, commandValue?: string) {
    console.log('execute');
    $event.preventDefault();
    $event.stopPropagation();
    if (command) {
      if (command === 'bold') {
        this.createBoldStyle();
      }
      else if (command === 'italic') {
        this.createItalicStyle();
      }
      else if (command === 'underline') {
        this.crecreateUnderLineStyle();
      }
      else if (command === 'justifyLeft') {
        document.execCommand(command, false, null);
      }
      else if (command === 'justifyRight') {
        document.execCommand(command, false, null);
      }
      else if (command === 'insertUnorderedList') {
        document.execCommand(command, false, null);

      }
      else if (command === 'insertOrderedList') {
        document.execCommand(command, false, null);
      }
      const selection = this._rangy.self.getSelection();
      const contentEditable = $(selection.focusNode).closest('[contenteditable]');
      contentEditable.trigger('content-change');
    }
  }
  // Bold
  createBoldStyle() {
    const bold = this._rangy.self.
      createClassApplier('bold', {
        tagNames: ['*'],
        normalize: true,
        elementProperties: {
          style: {
            fontWeight: 'bold'
          }
        }
      });

    bold.toggleSelection();
  }
  // Italic
  createItalicStyle() {
    const italic = this._rangy.self.
      createClassApplier('italic', {
        tagNames: ['*'],
        normalize: true,
        elementProperties: {
          style: {
            fontStyle: 'italic'
          }
        }
      });

    italic.toggleSelection();
  }
  // Underline
  crecreateUnderLineStyle() {
    const italic = this._rangy.self.
      createClassApplier('underline', {
        tagNames: ['*'],
        normalize: true,
        elementProperties: {
          style: {
            textDecoration: 'underline'
          }
        }
      });

    italic.toggleSelection();
  }

  @HostListener('document:mouseup', ['$event']) windowOnMouseUp($event) {
    

    const contenEditableString = $(`#${this.contentEditableId}`).attr('contenteditable');
    const contenEditable = contenEditableString === 'true' ? true : false;
    const target = $($event.target);
    if (contenEditable) {
      const selection = this._rangy.self.getSelection()
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      const selectedText = selection.toString();

      // First check selection
      if (range && selectedText.length > 0) {
        const parentEl = $(range.commonAncestorContainer).closest(`#${this.contentEditableId}`);
        if (parentEl.length > 0) {
          const innerHTML = range.toHtml();
          const div = document.createElement('div');
          div.innerHTML = innerHTML;
          const lineTextLength = $(div).find('.topic-line-text').length;
          const children = div.childElementCount;
          if (lineTextLength === children) {
            this.show = true;
          } else {
            this.show = false;
          }
        } else {
          this.show = false;
        }
      } else {
        if (target.closest(`#${this.contentEditableId}`).length > 0) {
          // Check click
          const node = this.getSelectionStart();
          const topicLine = $(node).closest('.topic-line-text');
          if (topicLine.length > 0) {
            this.show = true;
          } else {
            this.show = false;
          }
        } else {
          if (target.closest('.topic-editable-toolbar').length === 0) {
            this.show = false;
          }
        }
      }

    } else {
      if (target.closest('.topic-editable-toolbar').length === 0) {
        this.show = false;
      }

    }


  }
  // Destroy
  ngOnDestroy() {

  }
}
