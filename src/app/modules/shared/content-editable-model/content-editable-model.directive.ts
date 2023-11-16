import { Directive, HostListener, Input, Output, OnChanges, Renderer2, ElementRef, SimpleChanges, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[contentEditableModel]'
})
export class ContentEditableModelDirective implements AfterViewInit, OnChanges, OnDestroy {



  @Input() contentEditableModel: any;
  @Input() singleLine = true;
  @Input() checkIfEmpty = true;
  @Input() maxLength: number;
  @Input() sanitizeHTML = true;
  @Output() contentEditableModelChange = new EventEmitter();

  private lastViewModel: any;

  constructor(private elRef: ElementRef, private renderer2: Renderer2) {
  }
  ngAfterViewInit() {
    $(this.elRef.nativeElement).on('content-change', () => {
      this.read(null);
    });
  }
  ngOnChanges(changes: SimpleChanges) {

    if (changes.contentEditableModel.currentValue.length !== ''
      && changes.contentEditableModel.currentValue !== this.lastViewModel) {
      if (this.sanitizeHTML) {
        setTimeout(() => {
          this.elRef.nativeElement.innerText = this.contentEditableModel || '';
          this.read(null);
        });
      } else {
        setTimeout(() => {
          this.elRef.nativeElement.innerHTML = this.contentEditableModel || '';
          this.read(null);
        });
      }
    } else if (changes.contentEditableModel.firstChange) {
      setTimeout(() => {
        // this.read(null);
      });
    }



  }

  read(event) {
    // view -> model
    let html = '';

    if (this.sanitizeHTML) {
      html = this.elRef.nativeElement.innerText;
      html = html.replace(/&nbsp;/g, '\u00a0');
    } else {
      html = this.elRef.nativeElement.innerHTML;
    }

    if (this.checkIfEmpty) {
      // Firefox issued adding <br> end line
      if (!html || html.length === 0 || html === '<br>' || html === '<span><br></span>') {
        this.renderer2.addClass(this.elRef.nativeElement, 'empty');
      } else {
        this.renderer2.removeClass(this.elRef.nativeElement, 'empty');
      }
    }
    this.lastViewModel = html;

    this.contentEditableModelChange.emit(html);
  }
  validateKeyDelete(event) {
    let isKeyDelete = false;
    const keyCode = event.keyCode;
    // let key = event.key;

    if (
      // Delete
      (keyCode === 8 || keyCode === 46) ||
      // Select
      (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40 || keyCode === 35 || keyCode === 36) ||
      (event.ctrlKey && (keyCode === 65 || keyCode === 88))
    ) {
      isKeyDelete = true;
    }

    return isKeyDelete;
  }
  maxLengthPrevent(event) {
    let isOveflow = false;
    if (this.maxLength) {
      const textLength = this.elRef.nativeElement.textContent || this.elRef.nativeElement.innerText;

      if (textLength.length > this.maxLength) {
        /*delete*/
        if (!this.validateKeyDelete(event)) {
          isOveflow = true;
        }
      }
    }
    return isOveflow;
  }
  @HostListener('blur')
  onBlur() {
    const value = this.elRef.nativeElement.innerText;
    this.lastViewModel = value;

  }
  @HostListener('input', ['$event'])
  onInput($event: Event) {
    if (this.maxLengthPrevent($event)) {
      $event.preventDefault();
    } else {
      this.read($event);
    }
  }
  @HostListener('keydown', ['$event'])
  onKeydown($event) {
    if (this.singleLine && $event.which === 13) {
      $event.preventDefault();
    }
    if (this.maxLengthPrevent($event)) {
      $event.preventDefault();
    }
  }
  @HostListener('dragover', ['$event'])
  onDragover($event) {
    $event.preventDefault();
  }
  @HostListener('drop', ['$event'])
  onDrop($event) {
    $event.preventDefault();
  }
  @HostListener('paste', ['$event'])
  onPaste($event) {
    $event.preventDefault();
    let text = ($event.originalEvent || $event).clipboardData.getData('text/plain');
    if (this.maxLength) {
      const textLength = this.elRef.nativeElement.textContent || this.elRef.nativeElement.innerText;
      if ((textLength.length + text.length) >= this.maxLength) {
        const diffTextCurr = this.maxLength - textLength;
        if (diffTextCurr > 0) {
          text = text.slice(0, diffTextCurr);
        }

      }
    }
    document.execCommand('insertHTML', false, text);
    this.read(null);
  }
  ngOnDestroy(){
    $(this.elRef.nativeElement).off('content-change', () => {
    });
  }
}
