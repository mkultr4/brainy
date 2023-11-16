import { Component, OnInit, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { TourOptions } from '../../tour/tour/tour-options';
import { Tour } from '../../tour/tour/tour';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { TourComponent } from '../../tour/tour/tour.component';
import { ToastrService } from 'ngx-toastr';
import { BriefTemplate } from 'src/app/models/brief/brief-template';

@Component({
  selector: 'app-brief-template-tutorial',
  templateUrl: './brief-template-tutorial.component.html',
  styleUrls: ['./brief-template-tutorial.component.scss']
})
export class BriefTemplateTutorialComponent implements OnInit {
  public suscribeTapToast: ISubscription;
  // Tour
  public tourOptions: TourOptions = {
    autoStart: false,
    finishMessage: 'Listo',
    nextMessage: 'Siguiente',
    popupClass: 'tour-popup-blue  tour-popup-brief-template',
    popupBtnClass: 'btn-outline-white',
    gutterAlignament: -14,
    popupArrow: true
  };
  public tour: Array<Tour> = [

  ];
  // Inputs
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() templates: BriefTemplate[];
  // Output
  @Output() tutorialOnEnd = new EventEmitter();
  @Output() tutorialOnMakeLibrary = new EventEmitter();
  @Output() tutorialOnDontShowAgain = new EventEmitter();
  // View child
  @ViewChild('tourComp') tourComp: TourComponent;
  // Constructor
  constructor(private _toastrService: ToastrService) { }

  ngOnInit() {

    const tour1 = new Tour();
    tour1.message = `Antes de empezar, agrega los templates que quieras que tu equipo utilice.`;
    tour1.target = '#brief-templates-0';
    tour1.align = 'top';
    tour1.pulseTarget = '#pulse-target-0';
    tour1.popupArrowTop = 20;
    tour1.callbackStart = () => {
      const template = this.templates[0];
      this.tutorialOnMakeLibrary.emit(template);
      $('#brief-templates-0').addClass('tour-active');
      $('#brief-templates-0').find('.brief-template').removeClass('mouseover');

    };

    const tour2 = new Tour();
    tour2.message = `Para que tu equipo visualice los templates selecciona. Automáticamente se colocarán en sus templates.`;
    tour2.target = '#add-to-library-0';
    tour2.align = 'top';
    tour2.gutterAlignament = -33;
    tour2.pulseTarget = '#add-to-library-0';
    tour2.callbackStart = () => {
      const template = this.templates[0];
      if (template.isLibrary) {
        this.tutorialOnMakeLibrary.emit(template);
      }
      $('#brief-templates-0').addClass('tour-active');
      $('#brief-templates-0').find('.brief-template').addClass('mouseover');
    };
    const tour3 = new Tour();
    tour3.message = '¡Listo! Ahora tu equipo podrá visualizar';
    tour3.target = '#add-to-library-0';
    tour3.align = 'top';
    tour3.gutterAlignament = -33;
    tour3.callbackStart = () => {
      const template = this.templates[0];
      this.tutorialOnMakeLibrary.emit(template);
      $('#brief-templates-0').addClass('tour-active');
      $('#brief-templates-0').find('.brief-template').removeClass('mouseover');

    };

    this.tour.push(tour1, tour2, tour3);
  }
  // Tour
  startTourAction() {
    this.tourComp.startTour();
  }

  // Tour
  onTourStart() {
    $('body').addClass('overflow-hidden');
  }
  onTourEnd() {
    $('#brief-templates-0').find('.brief-template').removeClass('mouseover');
    $('#brief-templates-0').removeClass('tour-active');
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

    $('body').removeClass('overflow-hidden');
  }


  ngOnDestroy() {
    if (this.suscribeTapToast) {
      this.suscribeTapToast.unsubscribe();
    }
  }

}
