import { Component, OnInit, Input, ViewChildren, QueryList, HostListener, OnDestroy } from '@angular/core';
import { BriefPresentationSlide } from 'src/app/models/brief-presentation/brief-presentation-slide';
import { BriefPresentationStrategyService } from 'src/app/services/brief-presentation/brief-presentation-strategy.service';
import { BriefPresentationElement } from 'src/app/models/brief-presentation/brief-presentation-element';
import { BriefPresentationElementComponent } from './brief-presentation-element/brief-presentation-element.component';
import { ISubscription } from 'rxjs/Subscription';
import { BriefPresentationToolbarService } from '../services/brief-presentation-toolbar.service';
import * as uuid from 'uuid/v4';
import { BRIEF_SLIDE_DIMENSIONS } from 'src/app/data/mock-brief-presentation';
import { SlideFile } from 'src/app/models/brief-presentation/slide-file';
import Content from 'src/app/interface/brief-template/Content';
import { SlideTextComponent } from './slide-text/slide-text.component';

@Component({
  selector: '[app-brief-presentation-slide]',
  templateUrl: './brief-presentation-slide.component.html',
  styleUrls: ['./brief-presentation-slide.component.scss']
})
export class BriefPresentationSlideComponent implements OnInit, OnDestroy {
  public _slideToShow: BriefPresentationSlide;
  public elements = [];
  public focusedElement: BriefPresentationElement;
  // Services
  private _briefPresentationService;
  // Subscription
  public subscriptionElements: ISubscription;
  public subscriptionAddElement: ISubscription;
  public subscriptionAddStyle: ISubscription;
  public subscriptionFocusedElement: ISubscription;
  // Inputs
  @Input() slide: BriefPresentationSlide = new BriefPresentationSlide();
  @Input() index: string;
  @Input() slideScale = 1;
  @Input() set slideToShow(slide: BriefPresentationSlide) {
    this._slideToShow = Object.assign({}, slide);
    this.findSlideElements();
  }
  // Children
  @ViewChildren('slideElements') slideElements: QueryList<BriefPresentationElementComponent>;
  constructor(
    private _briefPresentationStrategyService: BriefPresentationStrategyService,
    private _briefPresentationToolbarService: BriefPresentationToolbarService
  ) {
    this._briefPresentationService = this._briefPresentationStrategyService.getService();
  }
  // Init
  ngOnInit() {
  }
  ngAfterContentInit() {

    this.subscriptionElements = this._briefPresentationService.elements.subscribe(elements => {
      // Update datastore general
      this._briefPresentationService.updateStoreSlides(this.slide, elements);
    });
    // Toolbar add element
    this.subscriptionAddElement = this._briefPresentationToolbarService.toolbarAction.subscribe(action => {
      if (action.type === 'text') {
        this.addText();
      }
      else if (action.type === 'circle') {
        this.addShape(action.type);
      }
      else if (action.type === 'rectangle') {
        this.addShape(action.type);
      }
      else if (action.type === 'image') {
        this.addImage(action.args);
      }
    });
    // Subscription Style
    this.subscriptionAddStyle = this._briefPresentationToolbarService.addStyle.subscribe(style => {
      const elementFocus = this.slideElements.filter(el => el.focused)[0];
      if (elementFocus) {
        // If text
        if (elementFocus.element.type === 'text') {
          //Text color
          if (style.style === 'forecolor') {
            elementFocus.element.styleColor = style.color;
            this._briefPresentationService.updateElement(elementFocus.element).subscribe();
          }
          //Back color
          else if (style.style === 'backcolor') {
            elementFocus.element.styleBackground = style.color;
            this._briefPresentationService.updateElement(elementFocus.element).subscribe();
          }
          else if (style.style === 'fontsize') {
            this.setFontSizeText(elementFocus, style.fontsize);
          } else if (style.style === 'removeformat') {
            if (style.arg === 'forecolor') {
              elementFocus.element.styleColor = '';
            }
            else if (style.arg === 'backcolor') {
              elementFocus.element.styleBackground = '';
            }
            this._briefPresentationService.updateElement(elementFocus.element).subscribe();
          }
        }
        else if (elementFocus.element.type === 'circle' ||
          elementFocus.element.type === 'rectangle') {
          if (style.style === 'backcolor') {
            elementFocus.element.styleBackground = style.color;
            this._briefPresentationService.updateElement(elementFocus.element).subscribe();
          } else if (style.style === 'removeformat') {
            if (style.arg === 'forecolor') {
              elementFocus.element.styleColor = '';
            }
            else if (style.arg === 'backcolor') {
              elementFocus.element.styleBackground = '';
            }
            this._briefPresentationService.updateElement(elementFocus.element).subscribe();
          }
        }
      }
    });
    // Subscritpion focused
    this.subscriptionFocusedElement = this._briefPresentationToolbarService.focusedElement.subscribe(element => {
      this.focusedElement = element;
    });

  }
  // Find elements
  findSlideElements() {
    this._briefPresentationService.getSlideById(this._slideToShow.id).subscribe((slide) => {
      console.log(slide);
      this.slide = slide;
      this._briefPresentationService.loadElements(this._slideToShow.id, this.slide.elements).subscribe(elements => {
        this.elements = Object.assign([], elements);
      });
    });

  }
  // Add text
  addText() {
    // Create
    let text = new BriefPresentationElement();
    text.type = 'text';
    text.content = <Content>{ text: '' }
    text.id = uuid();
    text.styleFontSize = 36;
    text.width = BRIEF_SLIDE_DIMENSIONS.textDefaultWidth;
    text.height = BRIEF_SLIDE_DIMENSIONS.textDefaultHeight;
    text.left = (BRIEF_SLIDE_DIMENSIONS.width - text.width) / 2;
    text.top = (BRIEF_SLIDE_DIMENSIONS.height - text.height) / 2;
    // Add slide elemnt
    this.addSlideElement(text);
  }
  // Set font size
  setFontSizeText(elementFocus: BriefPresentationElementComponent, fontSize) {
    //Old font size
    const element = elementFocus.element;
    const elementText = <SlideTextComponent>elementFocus;
    let oldFontsize = element.styleFontSize;
    let oldWidth = element.width;
    let oldHeight = element.height;
    //Set the font size
    element.styleFontSize = fontSize;
    //Set auto size
    $(elementText.textElement.nativeElement).css({ width: 'auto', height: 'auto' });
    setTimeout(() => {
      //Sizes
      element.width = Math.min($(elementText.textElement.nativeElement).width(), BRIEF_SLIDE_DIMENSIONS.width);
      element.height = Math.min($(elementText.textElement.nativeElement).height(), BRIEF_SLIDE_DIMENSIONS.height);
      //Set new position
      let newLeft = 0, newTop = 0;
      //Calculate new position left
      if (element.width > oldWidth) {
        let diff = (element.width - oldWidth) / 2;
        newLeft = element.left - diff;
      } else {
        let diff = (oldWidth - element.width) / 2;
        newLeft = element.left + diff;
      }
      //Calculate new position top
      if (element.height > oldHeight) {
        let diff = (element.height - oldHeight) / 2;
        newTop = element.top - diff;
      } else {
        let diff = (oldHeight - element.height) / 2;
        newTop = element.top + diff;
      }

      if (newLeft < 0) {
        newLeft = 0;
      }
      if (newTop < 0) {
        newTop = 0;
      }
      //New position
      element.left = newLeft;
      //  this.element.top = newTop;
      this._briefPresentationService.updateElement(element).subscribe();
    })
  }
  // Add shape
  addShape(shapeType) {
    let shape = new BriefPresentationElement();
    shape.id = uuid();
    shape.type = shapeType;
    if (shapeType === 'circle') {
      shape.width = 166;
      shape.height = 166;

    }
    if (shapeType === 'rectangle') {
      shape.width = 200;
      shape.height = 200;

    }
    shape.left = (BRIEF_SLIDE_DIMENSIONS.width - shape.width) / 2
    shape.top = (BRIEF_SLIDE_DIMENSIONS.height - shape.height) / 2
    // Add slide elemnt
    this.addSlideElement(shape);
  }
  // Add image
  addImage(file: File) {
    this._briefPresentationService.uploadImage(file, this.slide.id).subscribe((slideFile: SlideFile) => {
      let image = new BriefPresentationElement();
      image.type = 'image';
      image.content = <Content>{ file: slideFile };
      image.id = uuid();
      const sizes = this.proccessSlideImage(slideFile);
      image.width = sizes.width;
      image.height = sizes.height;
      image.left = sizes.left;
      image.top = sizes.top;
      // Add slide element
      this.addSlideElement(image);
    });
  }
  // Proccess slide image
  proccessSlideImage(file: SlideFile) {
    let width = file.setting.naturalWidth
    let height = file.setting.naturalHeight;
    let widthPadding = width + 20;
    let heightPadding = height + 20;
    //Check if image is bigger the slide
    if (widthPadding > BRIEF_SLIDE_DIMENSIONS.width || heightPadding > BRIEF_SLIDE_DIMENSIONS.height) {
      let scaleWidth = 1, scaleHeight = 1;
      if (widthPadding > BRIEF_SLIDE_DIMENSIONS.width) {
        scaleWidth = BRIEF_SLIDE_DIMENSIONS.width / widthPadding;
      }

      if (heightPadding + 20 > BRIEF_SLIDE_DIMENSIONS.height) {
        scaleHeight = BRIEF_SLIDE_DIMENSIONS.height / heightPadding;
      }
      let scale = scaleWidth;

      if (scaleHeight < scaleWidth) {
        scale = scaleHeight;
      }

      width = width * scale;
      height = height * scale;
    }

    //Set sizes
    const sizes = { width: 0, height: 0, left: 0, top: 0 };
    sizes.width = width;
    sizes.height = height;
    sizes.left = (BRIEF_SLIDE_DIMENSIONS.width - width) / 2;
    sizes.top = (BRIEF_SLIDE_DIMENSIONS.height - height) / 2;
    return sizes;
  }
  // Add slide element
  addSlideElement(element: BriefPresentationElement) {
    this._briefPresentationService.addElement(element).subscribe(el => {
      console.log(el);
      this.elements.push(el);
      console.log(this.elements);
      setTimeout(() => {
        $('#brief-presentation-element-' + el.id).click();
      });
    });
  }
  // Update
  onUpdateElement(element: BriefPresentationElement) {

    this._briefPresentationService.updateElement(element).subscribe();
  }
  // Change file
  onChangeImage(element: BriefPresentationElement) {
    // If update element is image

    const sizes = this.proccessSlideImage(element.content.file);
    element.width = sizes.width;
    element.height = sizes.height;
    element.left = sizes.left;
    element.top = sizes.top;

    this._briefPresentationService.updateElement(element).subscribe();
  }
  // Focus
  onFocusElement(element: BriefPresentationElement) {
    // Blur another elements
    this.slideElements.filter(i => i.element.id !== element.id).forEach(el => {
      el.focused = false;
    });
    // Set global focus
    this._briefPresentationToolbarService.setFocusedElement(element);
    // Toolbar
    setTimeout(() => {

    });

  }
  // Delete
  onDeleteElement(element: BriefPresentationElement) {
    console.log('delete', element);
    this._briefPresentationService.removeElement(element).subscribe(element => {
      const index = this.elements.findIndex(el => el.id === element.id);
      this.elements.splice(index, 1);
    });
  }
  // Host click window
  @HostListener('window:click', ['$event']) onWindowClick(event) {
    const target = $(event.target);
    if (
      target.closest('.brief-presentation-slide').length === 0 &&
      target.closest('.brief-presentation-toolbar-actions').length === 0

    ) {
      // Blur 
      this.slideElements.forEach(el => {
        el.focused = false;
      });

      this._briefPresentationToolbarService.setFocusedElement(undefined);

    }

    setTimeout(() => {
      $('.comment-thread-point-brief').trigger('resize');
    });
  }
  @HostListener('window:keyup', ['$event']) onKeyUp(event) {
    if (this.focusedElement) {
      //Delete key
      if (event.keyCode == 46) {
        if (this.focusedElement.type === 'text') {
          const text = <SlideTextComponent>this.slideElements.filter(el => el.element.id === this.focusedElement.id)[0];
          if(!text.editing){
            this.onDeleteElement(this.focusedElement);  
          }
        } else {
          //Remove
          this.onDeleteElement(this.focusedElement);
        }


      }

    }
  }
  // On destroy
  ngOnDestroy() {
    if (this.subscriptionElements) {
      this.subscriptionElements.unsubscribe();
    }
    if (this.subscriptionAddStyle) {
      this.subscriptionAddStyle.unsubscribe();
    }
    if (this.subscriptionElements) {
      this.subscriptionElements.unsubscribe();
    }
    if (this.subscriptionFocusedElement) {
      this.subscriptionFocusedElement.unsubscribe();
    }
  }
}
