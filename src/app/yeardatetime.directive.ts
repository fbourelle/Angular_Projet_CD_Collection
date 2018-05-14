import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Artiste} from './Models/artiste';

@Directive({
  selector: '[appYeardatetime]'
})
export class YeardatetimeDirective implements OnInit {
  @Input('appYeardatetime') datetimeRough: number;
  @Input() artiste: Artiste;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'datetime', this.datetimeRough.toString());
  }

}
