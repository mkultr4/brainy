import { Component, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { TourComponent } from '../../tour/tour/tour.component';
import { ToastrService } from 'ngx-toastr';
import { TourOptions } from '../../tour/tour/tour-options';
import {ISubscription} from 'rxjs/Subscription';
import { Tour } from '../../tour/tour/tour';
@Component({
  selector: 'app-brief-tutorial-response',
  templateUrl: './brief-tutorial-response.component.html',
  styleUrls: ['./brief-tutorial-response.component.scss']
})
export class BriefTutorialResponseComponent implements OnInit {

  public suscribeTapToast: ISubscription;
  // Tour
  public tourOptions: TourOptions = {
    autoStart: false,
    finishMessage: 'Listo',
    nextMessage: 'Siguiente',
    popupClass: 'tour-popup-blue',
    gutterAlignament: -33,
    popupBtnClass: 'btn-outline-white',
    popupArrow:true

  };
  public tourResponse: Array<Tour> = [

  ];
  // Output
  @Output() tutorialResponseOnEnd = new EventEmitter();
  @Output() tutorialResponseOnDontShowAgain = new EventEmitter();
  // View child
  @ViewChild('tourResponseComp') tourResponseComp: TourComponent;
  // Constructor
  constructor(private _toastrService: ToastrService) { }

  ngOnInit() {
    const tour1 = Object.assign(new Tour(), <Tour>{
      message: `Responder preguntas.<br>Al crear un template para pitch puedes<br>responder la preguntas de este.`,
      target: '#response-title-1',
      align: 'top'
    });
   
    const tour2 = Object.assign(new Tour(), <Tour>{
      message: `Para compartir un template para pitch<br>
                llénalo. Solo tienes que elegir  la opción de<br>
                responder y agregar tus respuestas. `,
      target: '#response-title-1',
      align: 'top'
    });



    this.tourResponse.push(tour1,tour2);

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
      this.tutorialResponseOnDontShowAgain.emit();
    });

    this.tutorialResponseOnEnd.emit();

  }


  ngOnDestroy() {
    if (this.suscribeTapToast) {
      this.suscribeTapToast.unsubscribe();
    }
  }
}
