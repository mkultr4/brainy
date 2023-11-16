import {
  Component, OnInit, Input, Output, EventEmitter,
  ViewContainerRef, AfterViewInit, ViewChild, OnDestroy, ComponentFactoryResolver
} from '@angular/core';
import { TourPopupComponent } from './tour-popup/tour-popup.component';
import { Subscription } from 'rxjs';
import { Tour } from './tour';
import { TourOptions } from './tour-options';


@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss'],
  entryComponents: [TourPopupComponent]
})
export class TourComponent implements OnInit, AfterViewInit, OnDestroy {
  // Public vars
  tourStart = false;
  tourLength: number;
  currentStep = 0;
  // Subscriptions
  subscriptionPreviousStep: Subscription;
  subscriptionNextStep: Subscription;
  subscriptionEndTour: Subscription;
  currentPopup: TourPopupComponent;
  // Inputs
  @Input() tour: Array<Tour> = new Array<Tour>();
  @Input() tourOptions: TourOptions;
  // Events
  @Output() tourOnStart = new EventEmitter();
  @Output() tourOnEnd = new EventEmitter();
  @Output() tourOnPreviousStep = new EventEmitter();
  @Output() tourOnNextStep = new EventEmitter();
  // View childs
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  // Constructor
  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
  }
  // Init
  ngOnInit() {
    this.tourLength = this.tour.length - 1;
  }
  // After view init
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.tourOptions.autoStart) {
        this.startTour();
      }
    });
  }
  // Start tour
  startTour() {
    this.tourOnStart.emit();
    this.tourStart = true;
    this.currentStep = 0;
    if (this.tour[this.currentStep]) {
      this.processStep(this.currentStep);
    } else {
      this.endTour();
    }
  }
  /**
   * Process Step
   */
  processStep(step?: number) {


    if (!this.currentPopup) {
      this.currentPopup = this.createTourPopup();
    }

    const tour = this.tour[step];
    // tslint:disable-next-line:max-line-length
    const btnText = this.currentStep === this.tourLength ? this.tourOptions.finishMessage : this.tourOptions.nextMessage;
    this.currentPopup.tour = tour;
    this.currentPopup.currentStep = step;
    this.currentPopup.btnText = btnText;
    this.currentPopup.last = this.currentStep === this.tourLength;
    this.currentPopup.tourOptions = this.tourOptions;
    this.currentPopup.message = tour.message;
    if (tour.align) {
      this.currentPopup.align = tour.align;
    }
    setTimeout(() => {
      // Show
      this.currentPopup.showPopup();
      // Unsuscribe events
      this.unsubscribeEvents();
      // Previous
      this.subscriptionPreviousStep = this.currentPopup.popupOnPreviousStep.subscribe(() => {
        this.previousStep();
      });
      // Next
      this.subscriptionNextStep = this.currentPopup.popupOnNextStep.subscribe(() => {
        this.nextStep();
      });
      // Finish
      this.subscriptionEndTour = this.currentPopup.popupOnEndTour.subscribe(() => {
        this.endTour();
      });
    });
  }
  // Create popup
  createTourPopup() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(TourPopupComponent);
    const containerRef = this.viewContainerRef;
    containerRef.clear();
    const popup = containerRef.createComponent(componentFactory);
    return popup.instance;
  }
  // Previous step
  previousStep() {
    this.currentStep -= 1;
    this.tourOnPreviousStep.emit(this.currentStep);
    this.processStep(this.currentStep);
  }
  // Next step
  nextStep() {
    if (this.currentStep === this.tourLength) {
      console.log('end tour');
      this.endTour();
    } else {
      this.currentStep += 1;
      this.tourOnNextStep.emit(this.currentStep);
      this.processStep(this.currentStep);
    }
  }
  // Unprocess stetp
  unProcessStep(step?: number) {
    if (this.currentPopup) {
      this.currentPopup.finishPopup();
    }
  }
  // Overlay click
  clickOverlay($event) {
    console.log('click overlay');
    if ($($event.target).closest('.tour-popup').length === 0) {
      if (this.currentPopup) {
        this.currentPopup.endTour();
      }else{
        this.endTour();
      }
    }
  }
  // End tour
  endTour() {
    const containerRef = this.viewContainerRef;
    containerRef.clear();
    this.tourOnEnd.emit();
    this.tourStart = false;
    this.unProcessStep(this.currentStep);

  }
  // Unsubscribe eventes
  private unsubscribeEvents() {
    if (this.subscriptionPreviousStep) {
      this.subscriptionPreviousStep.unsubscribe();
    }
    if (this.subscriptionNextStep) {
      this.subscriptionNextStep.unsubscribe();
    }
    if (this.subscriptionEndTour) {
      this.subscriptionEndTour.unsubscribe();
    }
  }
  ngOnDestroy() {
    this.unsubscribeEvents();
  }
}
