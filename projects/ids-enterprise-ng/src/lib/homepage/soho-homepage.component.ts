/// <reference path="soho-homepage.d.ts" />

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  NgZone,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'div[soho-homepage]', // tslint:disable-line
  template: `<div class="content"><ng-content></ng-content></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoHomePageComponent implements AfterViewInit, OnDestroy {

  @Output() resize = new EventEmitter<SohoHomePageEvent>();
  @Output() resizecard = new EventEmitter<SohoHomePageEvent>();
  @Output() reordercard = new EventEmitter<SohoHomePageEvent>();
  @Output() removecard = new EventEmitter<SohoHomePageEvent>();

  @Input() set homePageOptions(homePageOptions: SohoHomePageOptions) {
    this._homePageOptions = homePageOptions;
  }
  get homePageOptions(): SohoHomePageOptions {
    return this._homePageOptions;
  }

  /**
   * Sets the maximum number of widget columns
   */
  @Input() set columns(columns: number) {
    this._homePageOptions.columns = columns;
    if (this.homepage) {
      this.homepage.settings.columns = columns;
    }
  }

  get columns(): number {
    return this._homePageOptions.columns;
  }

  /**
   * Sets gutter size in between widgets
   */
  @Input() set gutterSize(gutterSize: number) {
    this._homePageOptions.gutterSize = gutterSize;
    if (this.homepage) {
      this.homepage.settings.gutterSize = gutterSize;
    }
  }

  get gutterSize(): number {
    return this._homePageOptions.gutterSize;
  }

  /**
   * Sets the default widget width in pixels
   */
  @Input() set widgetWidth(widgetWidth: number) {
    this._homePageOptions.widgetWidth = widgetWidth;
    if (this.homepage) {
      this.homepage.settings.widgetWidth = widgetWidth;
    }
  }

  get widgetWidth(): number {
    return this._homePageOptions.widgetWidth;
  }

  /**
   * Sets the default widget height in pixels
   */
  @Input() set widgetHeight(widgetHeight: number) {
    this._homePageOptions.widgetHeight = widgetHeight;
    if (this.homepage) {
      this.homepage.settings.widgetHeight = widgetHeight;
    }
  }

  get widgetHeight(): number {
    return this._homePageOptions.widgetHeight;
  }

  /**
   * Set edit for rearranging/reordering cards.
   */
  @Input() set editing(editing: boolean) {
    this._homePageOptions.editing = editing;
    if (this.homepage) {
      this.homepage.setEdit(editing);
    }
  }

  get editing(): boolean {
    return this._homePageOptions.editing;
  }

  /**
   * Whether to animate widget placement
   */
  @Input() set animate(animate: boolean) {
    this._homePageOptions.animate = animate;
    if (this.homepage) {
      this.homepage.settings.animate = animate;
    }
  }

  get animate(): boolean {
    return this._homePageOptions.animate;
  }

  /**
   * this ...
   */
  @Input() set timeout(timeout: number) {
    this._homePageOptions.timeout = timeout;
    if (this.homepage) {
      this.homepage.settings.timeout = timeout;
    }
  }

  get timeout(): number {
    return this._homePageOptions.timeout;
  }

  /**
   * Specify the speed at which an animation progresses at different points within the animation.
   */
  @Input() set easing(easing: EasingType) {
    this._homePageOptions.easing = easing;
    if (this.homepage) {
      this.homepage.settings.easing = easing;
    }
  }

  get easing(): EasingType {
    return this._homePageOptions.easing;
  }

  @HostBinding('class.homepage') isHomepage = true;

  // Reference to the jQuery element.
  private jQueryElement: JQuery;

  // Reference to the annotated SoHoXi control
  private homepage: SohoHomePageStatic;

  private _homePageOptions: SohoHomePageOptions = {};

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) { }

  /**
   * Reset columns to their defaults (used on restore menu item).
   */
  refresh(animate?: boolean): void {
    return this.ngZone.runOutsideAngular(() => {
      this.homepage.refresh(animate);
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {

      // Wrap for later.
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      // Initialise the SoHoXi control.
      this.jQueryElement.homepage(this._homePageOptions);

      // Once the control is initialised, extract the control
      // plug-in from the element.  The element name is
      // defined by the plug-in, but in this case is 'homepage'.
      this.homepage = this.jQueryElement.data('homepage');

      this.jQueryElement
        .on('resize', (e: JQuery.TriggeredEvent, columns: number, metadata: object) => this.onResize(columns, metadata))
        .on('resizecard', (e: JQuery.TriggeredEvent, columns: number, metadata: object) => this.onResizeCard(columns, metadata))
        .on('reordercard', (e: JQuery.TriggeredEvent, columns: number, metadata: object) => this.onReorderCard(columns, metadata))
        .on('removecard', (e: JQuery.TriggeredEvent, columns: number, metadata: object) => this.onRemoveCard(columns, metadata))
    });
  }

  onResize(columns: number, metadata: object) {
    const event: SohoHomePageEvent = { columns: null, metadata: null };
    event.columns = columns;
    event.metadata = metadata;

    this.ngZone.run(() => {
      this.resize.emit(event);
    });
  }

  onResizeCard(columns: number, metadata: object) {
    const event: SohoHomePageEvent = { columns: null, metadata: null };
    event.columns = columns;
    event.metadata = metadata;

    this.ngZone.run(() => {
      this.resizecard.emit(event);
    });
  }

  onReorderCard(columns: number, metadata: object) {
    const event: SohoHomePageEvent = { columns: null, metadata: null };
    event.columns = columns;
    event.metadata = metadata;

    this.ngZone.run(() => {
      this.reordercard.emit(event);
    });
  }

  onRemoveCard(columns: number, metadata: object) {
    const event: SohoHomePageEvent = { columns: null, metadata: null };
    event.columns = columns;
    event.metadata = metadata;

    this.ngZone.run(() => {
      this.removecard.emit(event);
    });
  }

  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.homepage) {
        this.homepage.destroy();
        this.homepage = null;
      }
    });
  }
}
