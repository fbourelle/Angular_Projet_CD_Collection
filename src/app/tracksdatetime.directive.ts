import {Directive, Renderer2, ElementRef, Input, HostListener, AfterViewInit, OnInit} from '@angular/core';
import {Piste} from './Models/piste';

@Directive({
  selector: '[appTracksdatetime]'
})
export class TracksdatetimeDirective implements OnInit {
  @Input('appTracksdatetime') datetimeRough: number;
  @Input() piste: Piste;

  datetimeValue: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'datetime', this.onTransformDatetime(this.datetimeRough));
  }

  // @HostListener('mouseover')
  // onMouseOver() {
  //   this.renderer.setAttribute(this.el.nativeElement, 'datetime', this.onTransformDatetime(this.datetimeRough));
  //   console.log('this.datetimeRough : ' + this.datetimeRough);
  // }

  onTransformDatetime(duration: number) {
    const minutes =  Math.floor(duration / 60);
    const secondes = duration % 60;
    this.datetimeValue = 'PT' + minutes + 'M' + secondes + 'S';
    return this.datetimeValue;
  }
}
