import { AfterViewInit, Directive, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[fmSwiper]'
})
export class SwiperDirective implements AfterViewInit, OnChanges {
  private readonly swiperElement: HTMLElement;
  swiperEl: any;

  @Input('config')
  config?: SwiperOptions;
  @Input() start: boolean = false;

  constructor(private el: ElementRef<HTMLElement>) {
    this.swiperElement = el.nativeElement;
  }

  ngAfterViewInit() {
    this.initializeSwiper()
  }

  initializeSwiper() {
    this.swiperEl = this.el.nativeElement;
    Object.assign(this.swiperEl, this.config);
    this.swiperEl.initialize();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['start'] && changes['start'].currentValue) {
      this.initializeSwiper();
    }
  }
}
