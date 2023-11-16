import { Component, ElementRef, Renderer, Input, HostListener } from '@angular/core';
import { MzDropdownComponent } from 'ngx-materialize';

interface DropDownBrainyOptions {
  container?: string;
  /**
   * The duration of the transition enter in milliseconds.
   * @default `300`
   */
  inDuration?: number;

  /**
   * The duration of the transition out in milliseconds.
   * @default `225`
   */
  outDuration?: number;

  /**
   * If true, constrainWidth to the size of the dropdown activator.
   * @default `true`
   */
  constrainWidth?: boolean;
  /**
   * If true, the dropdown will open on hover.
   * @default `false`
   */
  hover?: boolean;

  /**
   * This defines the spacing from the aligned edge.
   * @default `0`
   */
  gutter?: number;

  /**
   * If true, the dropdown will show below the activator.
   * @default `false`
   */
  belowOrigin?: boolean;

  /**
   * Defines the edge the menu is aligned to.
   * @default `'left'`
   */
  alignment?: string;
  /**
   * If true, stops the event propagating from the dropdown origin click handler.
   *
   * @default `false`
   */
  stopPropagation?: boolean;

  /**
   * Fix scroll issue 
   */
  fixScroll?: boolean;
}


@Component({
  selector: 'app-mz-dropdown-brainy',
  templateUrl: './mz-dropdown-brainy.component.html',
  styleUrls: ['./mz-dropdown-brainy.component.scss']
})
export class MzDropdownBrainyComponent extends MzDropdownComponent {
  private _renderer;
  @Input() dropdownClass: string;
  @Input() container: string;
  // Fix when has scroll, issue when parent is scrolled
  @Input() fixScroll = false;

  constructor(elementRef: ElementRef,  renderer: Renderer) {
    super(elementRef, renderer);
    this._renderer = renderer;
  }

  initHandlers() {
    this.handlers = {
      align: () => this.handleDropdown(),
      container: () => this.handleDropdown(),
      fixScroll: () => this.handleDropdown(),
      belowOrigin: () => this.handleDropdown(),
      constrainWidth: () => this.handleDropdown(),
      dropdownButtonId: () => this.handleDataActivates(),
      gutter: () => this.handleDropdown(),
      hover: () => this.handleDropdown(),
      id: () => this.handleDropdown(),
      inDuration: () => this.handleDropdown(),
      outDuration: () => this.handleDropdown(),
      stopPropagation: () => this.handleDropdown(),
    };
  }
  handleDropdown() {
    this.validateProperties();

    const options: DropDownBrainyOptions = {
      alignment: this.align,
      container: this.container,
      belowOrigin: this.belowOrigin,
      constrainWidth: this.constrainWidth,
      gutter: this.gutter,
      hover: this.hover,
      inDuration: this.inDuration,
      outDuration: this.outDuration,
      stopPropagation: this.stopPropagation,
      fixScroll: this.fixScroll
    };
    // Initialize dropdown button for dropdown
    this._renderer.invokeElementMethod(this.dropdownButtonElement, 'dropdown', [options]);
  }

  @HostListener('window:resize') onWindowResize() {
    setTimeout(() => this._renderer.invokeElementMethod(this.dropdownButtonElement, 'dropdown', ['close']));
  }

}
