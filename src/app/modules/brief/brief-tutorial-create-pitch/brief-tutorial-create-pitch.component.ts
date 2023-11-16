import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { TourOptions } from '../../tour/tour/tour-options';
import { Tour } from '../../tour/tour/tour';
import { TourComponent } from '../../tour/tour/tour.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-brief-tutorial-create-pitch',
  templateUrl: './brief-tutorial-create-pitch.component.html',
  styleUrls: ['./brief-tutorial-create-pitch.component.scss']
})
export class BriefTutorialCreatePitchComponent implements OnInit {


  public suscribeTapToast: ISubscription;
  // Tour
  public tourCreateOptions: TourOptions = {
    autoStart: false,
    finishMessage: 'Listo',
    nextMessage: 'Siguiente',
    popupClass: 'tour-popup-meeting-note',
    gutterAlignament: 0,
    
  };
  public tourCreate: Array<Tour> = [

  ];
  // Output
  @Output() tutorialCreateOnEnd = new EventEmitter();
  @Output() tutorialCreateOnDontShowAgain = new EventEmitter();
  // View child
  @ViewChild('tourCreateComp') tourCreateComp: TourComponent;
  // Constructor
  constructor(private _toastrService: ToastrService) { }
  // Init
  ngOnInit() {
    const tour1 = Object.assign(new Tour(), <Tour>{
      message: `<div class="tour-container-message">
                      <div class="tour-message-caption" >
                        <img src="assets/img/tutorial/brief/pitch-create/tuto_1.png"/>
                      </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Crear template pitch.</span><br>
                      Para crear un template primero escribe una <br>
                      categoría después haz clic en el icono de  <br>
                      suma para insertar preguntas y elementos.
                  </p>
                </div>`,
      target: '#brief-toolbar-btn-actions',
      pulseTarget: '#pulse-target-brief-action',
      align: 'top'
    });
    const tour2 = Object.assign(new Tour(), <Tour>{
      message: `<div class="tour-container-message">
                <div class="tour-message-caption">
                <img src="assets/img/tutorial/brief/pitch-create/tuto_2.png"/>
                  </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Agrega preguntas.</span><br>
                      Selecciona la opción para poder crear una <br>
                      pregunta, escribela y después elige un <br>
                      formato de respuesta.
                  </p>
                </div>`,
      target: '#brief-toolbar-btn-actions',
      pulseTarget: '#pulse-target-brief-action',
      align: 'top'
    });

    const tour3 = Object.assign(new Tour(), <Tour>{
      message: `<div class="tour-container-message">
                    <div class="tour-message-caption">
                    <img src="assets/img/tutorial/brief/pitch-create/tuto_3.png"/>
                    </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Inserta imágenes y videos.</span><br>
                      Para insertar imágenes solo tienes que <br>
                      seleccionar y cargarlas. Para un video solo <br>
                      tienes que escribir el vínculo y listo. 
                  </p>
                </div>`,
      target: '#brief-toolbar-btn-actions',
      pulseTarget: '#pulse-target-brief-action',
      align: 'top'
    });
    const tour4 = Object.assign(new Tour(), <Tour>{
      message: `<div class="tour-container-message">
                  <div class="tour-message-caption">
                  <img src="assets/img/tutorial/brief/pitch-create/tuto_4.png"/>
                  </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Termina y comparte.</span><br>
                      Después de terminar la creación de <br>
                      template de pitch guardalo y compartelo  <br>
                      con tus participantes.
                      
                  </p>
                </div>`,
      target: '#brief-toolbar-btn-actions',
      pulseTarget: '#pulse-target-brief-action',
      align: 'top'
    });
 
    this.tourCreate.push(tour1, tour2, tour3, tour4);

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
  onTourCreateStart() {
    // console.log('tour start');
  }
  onTourCreateEnd() {

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
      this.tutorialCreateOnDontShowAgain.emit();
    });

    this.tutorialCreateOnEnd.emit();

  }


  ngOnDestroy() {
    if (this.suscribeTapToast) {
      this.suscribeTapToast.unsubscribe();
    }
  }
}
