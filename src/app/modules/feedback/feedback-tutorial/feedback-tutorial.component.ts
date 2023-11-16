import { Component, OnInit, Output, ViewChild, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { TourComponent } from '../../tour/tour/tour.component';
import { ToastrService, ActiveToast } from 'ngx-toastr';
import { Tour } from '../../tour/tour/tour';
import { TourOptions } from '../../tour/tour/tour-options';
@Component({
  selector: 'app-feedback-tutorial',
  templateUrl: './feedback-tutorial.component.html',
  styleUrls: ['./feedback-tutorial.component.scss']
})
export class FeedbackTutorialComponent implements OnInit, OnDestroy {

  public suscribeTapToast: ISubscription;
  // Tour
  public tourOptions: TourOptions = {
    autoStart: false,
    finishMessage: 'Listo',
    nextMessage: 'Siguiente',
    popupClass: 'tour-popup-core',
    gutterAlignament: 67
  };
  public tour: Array<Tour> = [

  ];
  // Output
  @Output() tutorialOnEnd = new EventEmitter();
  @Output() tutorialOnDontShowAgain = new EventEmitter();
  @ViewChild('tourComp') tourComp: TourComponent;
  constructor(private _toastrService: ToastrService) { }

  ngOnInit() {
    const tour1 = new Tour(
      `<div class="tour-container-message">
          <div class="tour-message-caption" style="background-image :url('/assets/img/tutorial/feed_tutorial_1.png');">
          </div>
        <p class="tour-message-text ">
          Haz clic en cualquier lugar de la imagen para agregar un comentario.
        </p>
    </div>
`, '#pulse-target-0', '#pulse-target-0', 'top');

    const tour2 = new Tour(
      `<div class="tour-container-message">
  <div class="tour-message-caption" style="background-image :url('/assets/img/tutorial/feed_tutorial_2.png');">
    </div>
    <p class="tour-message-text ">
      Para agregar comentarios en un área selecciona
        <span class="tour-feeback-actions">
          <span class="feed-actions-items">
              <i class="action-icon square"></i>
               <span class="action-text">Recuadro</span>
          </span>
          <span class="feed-actions-items">
              <i class="action-icon circle"></i>
              <span class="action-text">Círculo</span>
          </span>
        </span>
        haz click  y arrastra.
      </p>
</div>
`, '#pulse-target-0', '#pulse-target-0', 'top');


    this.tour.push(tour1, tour2);
  }

  // Tour
  startTourAction() {
  }
  /**
   * Resize tour
   */
  resizeTour() {

  }
  // Tour
  onTourStart() {
    // console.log('tour start');
  }
  onTourEnd() {

    const html = `
            <p class="checkbox"  (click)="tapToastBrainy()">
                <input type="checkbox"  name="showTutoAgain"
                  class="filled-in" id="showTutoAgain">
                    <label for="showTutoAgain">
                        No volver a mostrar el tutorial.
                    </label>
                </p>`;

    // let htmlSanitizer  = this._domSanitizer.bypassSecurityTrustHtml(html);

    const toast = this._toastrService.info(html);
    this.suscribeTapToast = toast.onTap.subscribe(() => {
      this.tutorialOnDontShowAgain.emit();
    });

    this.tutorialOnEnd.emit();

  }

  // Rezise
  @HostListener('window:resize', ['$event']) onResize(event) {

    this.resizeTour();
  }

  ngOnDestroy() {
    if (this.suscribeTapToast) {
      this.suscribeTapToast.unsubscribe();
    }
  }

}
