import { Component, OnInit, Output, ViewChild, EventEmitter, HostListener, Input } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { TourOptions } from '../../tour/tour/tour-options';
import { Tour } from '../../tour/tour/tour';
import { TourComponent } from '../../tour/tour/tour.component';
import { ToastrService } from 'ngx-toastr';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';

@Component({
  selector: 'app-meeting-note-tutorial',
  templateUrl: './meeting-note-tutorial.component.html',
  styleUrls: ['./meeting-note-tutorial.component.scss']
})
export class MeetingNoteTutorialComponent implements OnInit {
  public suscribeTapToast: ISubscription;
  // Tour
  public tourOptions: TourOptions = {
    autoStart: false,
    finishMessage: 'Listo',
    nextMessage: 'Siguiente',
    popupClass: 'tour-popup-meeting-note',
    gutterAlignament: 0
  };
  public tour: Array<Tour> = [

  ];
  // Inputs
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() scheduled = false;
  // Output
  @Output() tutorialOnEnd = new EventEmitter();
  @Output() tutorialOnDontShowAgain = new EventEmitter();
  // View child
  @ViewChild('tourComp') tourComp: TourComponent;
  // Constructor
  constructor(private _toastrService: ToastrService) { }

  ngOnInit() {
    const tour1 =Object.assign(new Tour(), <Tour>{
      message: `<div class="tour-container-message">
                      <div class="tour-message-caption" >
                        <img src="assets/img/tutorial/meeting-note/01_img_tuto2px.png"/>
                      </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Crear un tema.</span><br>
                      Para crear un tema solo tienes que escribir, <br>
                      si quieres agregar otro tema sólo haz clic en <br>
                      el icono de + tema.
                  </p>
                </div>`,
      target: '#topic-title-ghost',
      pulseTarget: '#pulse-target-0',
      align: 'top'
    });
    const tour2 = Object.assign(new Tour(),<Tour>{
      message: `<div class="tour-container-message">
                <div class="tour-message-caption">
                    <img src="assets/img/tutorial/meeting-note/02_img_tuto2px.png"/>   
                  </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Inserta elementos.</span><br>
                      Para insertar un subtema, adjuntar archivos<br>
                      e insertar imagenes y videos solo haz clic<br>
                      en el icono de suma.
                  </p>
                </div>`,
      target: '#topic-title-ghost',
      pulseTarget: '#pulse-target-0',
      align: 'top'
    });
    const tour3 = Object.assign(new Tour(),<Tour>{
      message: `<div class="tour-container-message">
                  <div class="tour-message-caption">
                      <img src="assets/img/tutorial/meeting-note/03_img_tuto2px.png"/>   
                  </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Inserta imágenes y videos</span><br>
                      Para insertar imágenes solo tienes que <br>
                      seleccionar y cargarlas. Para un video solo <br>
                      tienes que escribir el vínculo y listo.
                      
                  </p>
                </div>`,
      target: '#topic-title-ghost',
      pulseTarget: '#pulse-target-0',
      align: 'top'
    });
    const tour4 = Object.assign(new Tour(),<Tour>{
      message: `<div class="tour-container-message">
                    <div class="tour-message-caption">
                        <img src="assets/img/tutorial/meeting-note/04_img_tuto2px.png"/>   
                    </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Crea tareas</span><br>
                      Para crear una tarea primero selecciona el <br>
                      icono de tareas, después asigna a un <br>
                      responsable, coloca la fecha y la hora.
                  </p>
                </div>`,
      target: '#topic-title-ghost',
      pulseTarget: '#pulse-target-task',
      align: 'top'
    });
    const tour5 =Object.assign(new Tour(), <Tour>{
      message: `<div class="tour-container-message">
                  <div class="tour-message-caption" >
                      <img src="assets/img/tutorial/meeting-note/05_img_tuto2px.png"/>   
                  </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Deja un tema pendiente</span><br>
                      Solo selecciona el icono y automáticamente <br>
                      se pasará a pendiente, este tema puedes <br>
                      agendarlo para otra meeting.
                  </p>
                </div>`,
      target: '#topic-title-ghost',
      pulseTarget: '#pulse-target-pending',
      align: 'top'
    });
    const tour6 = Object.assign(new Tour(),<Tour>{
      message: `<div class="tour-container-message">
                <div class="tour-message-caption" >
                    <img src="assets/img/tutorial/meeting-note/06_img_tuto2px.png"/>   
                  </div>
                  <p class="tour-message-text ">
                      <span class="font-weight-medium">Crear acuerdos</span><br>
                      En esta sección escribe los acuerdos de la <br>
                      meeting es muy importantes escribirlos si <br>
                      no tu minuta no podrá aprobarse.
                  </p>
                </div>`,
      target: '#pulse-target-agreement-ghost',
      pulseTarget: '#pulse-target-agreement',
      align: 'top'
    });



    this.tour.push(tour1, tour2, tour3, tour4, tour5);
    if(!this.scheduled) {
      this.tour.push(tour6);
    }
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
