import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { BriefPresentationSlide } from 'src/app/models/brief-presentation/brief-presentation-slide';
import { BRIEF_PRESENTATION_SLIDES } from 'src/app/data/mock-brief-presentation';
import * as _ from 'lodash';
import { BriefPresentationElement } from 'src/app/models/brief-presentation/brief-presentation-element';
import { SlideFile } from 'src/app/models/brief-presentation/slide-file';
import * as uuid from 'uuid/v4';
@Injectable()
export class BriefPresentationMockService extends BaseService {
  // Store
  private dataStore;
  // Slide Show
  private _slideshow;
  public slideshow: Observable<BriefPresentationSlide[]>;
  // Elements
  public _elements;
  public elements: Observable<BriefPresentationElement[]>;
  // Constructor
  constructor() {
    super();
    // Data store
    this.dataStore = {
      slideshow: [],
      elements: []
    };

    // Slideshow
    this._slideshow = new BehaviorSubject<BriefPresentationSlide[]>([]);
    this.slideshow = this._slideshow.asObservable();
    // Elements
    this._elements = new BehaviorSubject<BriefPresentationElement[]>([]);
    this.elements = this._elements.asObservable();
  }
  // Inherit
  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  // Load slideshow
  loadSlideshow(id: any, empty = false) {
    const observable = new Observable(observer => {
      this.dataStore.slideshow = [];

      this.dataStore.slideshow = _.cloneDeep(BRIEF_PRESENTATION_SLIDES);
      // Not empty
      if (this.dataStore.slideshow.length === 0) {
        const slide = new BriefPresentationSlide();
        slide.id = uuid();
        slide.elements = [];
        slide.order = this.dataStore.slideshow.length + 1;
        this.dataStore.slideshow.push(slide);
      }
      this._slideshow.next(Object.assign([], this.dataStore).slideshow);
      observer.next(this.dataStore.slideshow);
    });
    return observable;
  }
  /**
   * Add slide
   * @param slide 
   */
  addSlide(slide: BriefPresentationSlide) {
    const observable = new Observable(observer => {
      slide.id = uuid();
      slide.elements = [];
      slide.order = this.dataStore.slideshow.length + 1;
      this.dataStore.slideshow.push(slide);
      this._slideshow.next(Object.assign([], this.dataStore).slideshow);
      observer.next(slide);
    });
    return observable;
  }
  /**
   * Remove slide
   * @param slide 
   */
  removeSlide(slide: BriefPresentationSlide) {
    const observable = new Observable((observer) => {
      let itemRemove;
      this.dataStore.slideshow.forEach((s, index) => {
        if (s.id === slide.id) {
          itemRemove = s;
          this.dataStore.slideshow.splice(index, 1);
        }
      });
      this._slideshow.next(Object.assign([], this.dataStore).slideshow);
      observer.next(itemRemove);
    });
    return observable;
  }
  // Get slide by id
  getSlideById(id: any) {
    const observable = new Observable(observer => {
      const slide = this.dataStore.slideshow.filter(s => s.id === id)[0];
      observer.next(slide);
    });
    return observable;
  }
  // Load slideshow
  loadElements(id: any, elements = []) {
    const observable = new Observable(observer => {
      this.dataStore.elements = elements;
      this._elements.next(Object.assign([], this.dataStore).elements);
      observer.next(this.dataStore.elements);
    });
    return observable;
  }
  /**
 * Update store to make functional layout
 * @param briedCategory 
 * @param items 
 */
  updateStoreSlides(slide: BriefPresentationSlide, elements: BriefPresentationElement[]) {
    this.dataStore.slideshow.forEach((s, index) => {
      if (s.id === slide.id) {
        this.dataStore.slideshow[index].elements = Object.assign([], elements);
      }
    });
    this._slideshow.next(Object.assign([], this.dataStore).slideshow);
  }
  /**
   * Add element
   * @param element 
   */
  addElement(element: BriefPresentationElement) {
    const observable = new Observable((observer) => {
      this.dataStore.elements.push(element);
      this._elements.next(Object.assign([], this.dataStore).elements);
      observer.next(element);
    });
    return observable;
  }
  /**
   * Remove element
   * @param element 
   */
  removeElement(element: BriefPresentationElement) {
    const observable = new Observable((observer) => {
      let itemRemove;
      this.dataStore.elements.forEach((el, index) => {
        if (el.id === element.id) {
          itemRemove = el;
          this.dataStore.elements.splice(index, 1);
        }
      });
      this._elements.next(Object.assign([], this.dataStore).elements);
      observer.next(itemRemove);
    });
    return observable;
  }
  /**
   * Update element
   * @param element 
   */
  updateElement(element: BriefPresentationElement) {
    const observable = new Observable((observer) => {

      this.dataStore.elements.forEach((el, index) => {
        if (el.id === element.id) {
          this.dataStore.elements[index] = Object.assign({}, element);
        }
      });
      this._elements.next(Object.assign([], this.dataStore).elements);
      observer.next(element);
    });
    return observable;
  }

  /**
 * Upload image
 * @param file 
 */
  uploadImage(file: File, slideId) {
    const observable = Observable.create((observer) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.src = url;
        img.onload = (event) => {
          // console.log(event);
          const w = img.width;
          const h = img.height;

          const slideFile = new SlideFile();
          slideFile.id = uuid();
          slideFile.url = url;
          slideFile.setting = { naturalWidth: w, naturalHeight: h }
          slideFile.name = file.name;
          slideFile.slideId = slideId;
          img.remove();
          observer.next(slideFile);
        };

      });
    });
    return observable;
  }
  // Update image
  updateImage(slideFile: SlideFile, file: File) {
    const observable = Observable.create((observer) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.src = url;
        img.onload = (event) => {
          // console.log(event);
          const w = img.width;
          const h = img.height;

          //  topicFile.id = uuid();
          slideFile.url = url;
          slideFile.setting = { naturalWidth: w, naturalHeight: h }
          slideFile.name = file.name;
          img.remove();
          observer.next(slideFile);
        };

      });
    });
    return observable;
  }


    /**
   * Update order feedback pieces
   * @param pieces
   */
  updateOrderSlideshow(slideshow: Array<BriefPresentationSlide>) {
    const observable = Observable.create((observer) => {
      observer.next(true);
    });
    return observable;
  }
}
