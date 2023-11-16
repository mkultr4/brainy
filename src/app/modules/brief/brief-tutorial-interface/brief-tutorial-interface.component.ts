import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { TourOptions } from '../../tour/tour/tour-options';
import { Tour } from '../../tour/tour/tour';
import { TourComponent } from '../../tour/tour/tour.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-brief-tutorial-interface',
  templateUrl: './brief-tutorial-interface.component.html',
  styleUrls: ['./brief-tutorial-interface.component.scss']
})
export class BriefTutorialInterfaceComponent implements OnInit {

  public suscribeTapToast: ISubscription;
  // Tour
  public tourInterfaceptions: TourOptions = {
    autoStart: false,
    finishMessage: 'Listo',
    nextMessage: 'Siguiente',
    popupClass: 'tour-popup-meeting-note',
    gutterAlignament: -20,
    

  };
  public tourInterface: Array<Tour> = [

  ];
  // Output
  @Output() tutorialInterfaceOnEnd = new EventEmitter();
  @Output() tutorialInterfaceOnDontShowAgain = new EventEmitter();
  // View child
  @ViewChild('tourInterfaceComp') tourInterfaceComp: TourComponent;
  // Constructor
  constructor(private _toastrService: ToastrService) { }

  ngOnInit() {
    const tour1 = Object.assign(new Tour(), <Tour>{
      message: `<div class="tour-container-message">
                      <div class="tour-message-caption" >
                        <img src="assets/img/tutorial/brief/pitch-interface/tuto_1.png"/>
                      </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Comparte y programa fechas.</span><br>
                      Invita a participantes y programa las fechas <br>
                      de las diferentes etapas del pitch.<br>
                      <br>
                  </p>
                </div>`,
      target: '#workflow-btn-share',
      pulseTarget: '#pulse-target-interface-share',
      align: 'top',
      gutterAlignament:0
    });
    const tour2 = Object.assign(new Tour(), <Tour>{
      message: `<div class="tour-container-message">
                <div class="tour-message-caption">
                <img src="assets/img/tutorial/brief/pitch-interface/tuto_2.png"/>
                  </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Devoluciones</span><br>
                      <span>Haz click en el icono<img class="icon-image" src="assets/img/tutorial/brief/icons/noun_text_454005.svg">para agregar una <br></span>
                      <span>devolución a tu documento, en esta área <br></span>
                      <span>aparecerán todas la devoluciones</span>
                  </p>
                </div>`,
      target: '#status-sidenav-giveback',
      pulseTarget: '#pulse-target-sidenav-giveback',
      align: 'top'
    });
    const tour3 = Object.assign(new Tour(), <Tour>{
      message: `<div class="tour-container-message">
                  <div class="tour-message-caption">
                  <img src="assets/img/tutorial/brief/pitch-interface/tuto_3.png"/>
                  </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Propuestas</span><br>
                      Aqui apareceran los documentos que tus  <br>
                      participantes suban al pitch, podrás elegir <br>
                      entre descartar, finalista o ganador.
                      
                  </p>
                </div>`,
      target: '#status-sidenav-proposal',
      pulseTarget: '#pulse-target-sidenav-proposal',
      align: 'top'
    });

    const tour4 = Object.assign(new Tour(), <Tour>{
      message: `<div class="tour-container-message">
                  <div class="tour-message-caption" >
                  <img src="assets/img/tutorial/brief/pitch-interface/tuto_4.png"/>
                  </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Finalistas</span><br>
                      En esta sección aparecerá al participante <br>
                      que seleccionaste ganador. <br>
                      <br>
                  </p>
                </div>`,
      target: '#status-sidenav-finalist',
      pulseTarget: '#pulse-target-sidenav-finalist',
      align: 'top'
    });




    this.tourInterface.push(tour1, tour2, tour3, tour4);

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
  onTourInterfaceStart() {
    // console.log('tour start');
  }
  onTourInterfaceEnd() {

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
      this.tutorialInterfaceOnDontShowAgain.emit();
    });

    this.tutorialInterfaceOnEnd.emit();

  }

  ngOnDestroy() {
    if (this.suscribeTapToast) {
      this.suscribeTapToast.unsubscribe();
    }
  }

}
