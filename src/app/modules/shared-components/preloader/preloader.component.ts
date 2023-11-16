import { Component, OnInit, Input, OnDestroy, Renderer2 } from '@angular/core';
import { PreloaderService } from './preloader.service';
import { Subscription } from 'rxjs';
import { trigger, state, transition, useAnimation, style } from '@angular/animations';
import { fadeAnimation } from '../../../app.animations';
@Component({
  selector: 'app-preloader,[app-preloader]',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  animations: [
    trigger('preloaderAnimation', [
      state('*', style({ opacity: 1 })),
      state('void', style({ opacity: 1 })),
      transition('* => void', [
        useAnimation(fadeAnimation, { params: { from: 1, to: 0, time: '300ms 300ms' } }),
      ]),

    ]),

  ]
})
export class PreloaderComponent implements OnInit, OnDestroy {
  @Input() show = false;
  @Input() message;
  subscriptionShow: Subscription;

  constructor(
    private _preloaderService: PreloaderService,
    private renderer: Renderer2
  ) {

  }

  ngOnInit() {
    if (this.show) {
      this.renderer.addClass(document.body, 'loading');
    }
    this.subscriptionShow = this._preloaderService.showPreloaderObs.subscribe(show => {
      console.log(show);
      this.show = show;
      if (this.show) {
        this.renderer.addClass(document.body, 'loading');
      } else {
        this.renderer.removeClass(document.body, 'loading');
      }
    });
  }

  ngOnDestroy() {
    if (this.subscriptionShow) {
      this.subscriptionShow.unsubscribe();
    }
    this.renderer.removeClass(document.body, 'loading');
  }

}
