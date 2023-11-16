// tslint:disable-next-line:max-line-length
import { Component, ContentChild, EventEmitter, AfterViewInit,OnDestroy, Input, Renderer2, Output, ElementRef, HostListener } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
@Component({
  selector: 'app-aside-nav,[app-aside-nav]',
  templateUrl: './asidenav.component.html',
  styleUrls: ['./asidenav.component.scss']
})
export class AsidenavComponent implements AfterViewInit, OnDestroy {

  private _show: boolean;
  public hasOverlay = false;
  public overlay;

  @Input() set show(value: boolean) {
    this._show = value;
  }
  @Input() sideNavMain = false;
  @Input() wide = false;
  @Input() showOverlay = true;
  @Input() alwaysVisible = false;
  @Input() disableScroll = false;
  @Output() asideOnShow = new EventEmitter();
  @Output() asideOnHide = new EventEmitter();

  @ContentChild(SidenavComponent) sidenav: SidenavComponent;



  constructor(private renderer: Renderer2, public elRef: ElementRef) {

  }
  ngAfterViewInit() {
    this.overlay = this.renderer.createElement('div');
    this.renderer.addClass(this.overlay, 'sidenav-overlay');

    this.initSidenav();
  }

  showSidenav() {

    this._show = true;
    this.renderer.addClass(this.sidenav.sidenavEl.nativeElement, 'show');
    if (this.hasOverlay && this.showOverlay) {
      this.renderer.appendChild(this.elRef.nativeElement, this.overlay);
    }
    if (this.disableScroll && this.hasOverlay) {
      this.renderer.addClass(document.body, 'disable-scroll');
    }
    this.asideOnShow.emit();

  }
  hideSidenav() {
    this._show = false;
    this.renderer.removeClass(this.sidenav.sidenavEl.nativeElement, 'show');
    this.renderer.removeChild(this.elRef.nativeElement, this.overlay);
    this.renderer.removeClass(document.body, 'disable-scroll');
    this.asideOnHide.emit();
  }
  toggleSidenav() {
    this._show = !this._show;
    if (this._show) {
      this.showSidenav();
    } else {
      this.hideSidenav();
    }
  }
  // Fixed Nav side Nav
  fixSideNav(maxWidth) {

    if (window.innerWidth < maxWidth) {

      this.renderer.addClass(this.sidenav.sidenavEl.nativeElement, 'animated');
      // this.renderer.setElementClass(this.sidenav.nativeElement,'auto-fixed',true);
      this.hasOverlay = true;
      this.hideSidenav();

    } else {

      this.renderer.removeClass(this.sidenav.sidenavEl.nativeElement, 'animated');
      // this.renderer.setElementClass(this.sidenav.nativeElement,'auto-fixed',false);
      this.hasOverlay = false;
      this.showSidenav();


    }
  }

  // Fix the sidenav
  fixedSidenav() {
    if (!this.alwaysVisible) {
      if (this.wide) {
        // 1200
        this.fixSideNav(1200);
      } else {
        // 992
        this.fixSideNav(992);
      }
    }

  }
  initSidenav() {
    if (!this.sideNavMain) {
      this.hasOverlay = true;
      this.renderer.addClass(this.sidenav.sidenavEl.nativeElement, 'animated');

    } else {
      this.fixedSidenav();
    }

    $(this.elRef.nativeElement).on('toggle', ($event) => {
      this.toggleSidenav();
    });
  }
  @HostListener('window:resize', ['$event']) onResize(event) {

    if (this.sideNavMain) {
      this.fixedSidenav();
    }
  }
  @HostListener('click', ['$event']) onClick($event) {
    const target = $($event.target);
    if (target.closest('.sidenav-overlay').length > 0 || target.closest('.close-sidenav').length > 0) {
      this.hideSidenav();
    }
  }
  getIsShow() {
    return this._show;
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'disable-scroll');
    $(this.elRef.nativeElement).off('toggle', ($event) => {
      this.toggleSidenav();
    });
  }

}
