import { Directive, HostListener, Input } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[appSidenavButton]'
})


export class SidenavButtonDirective {
  @Input() sidenavId: string;

  constructor() { }

  @HostListener('click') onClick() {
    const sidenav = $(`#${this.sidenavId}`);
    if (sidenav) {
      sidenav.trigger('toggle');
    }

  }
}
