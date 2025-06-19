import {Directive, ElementRef, HostListener,} from '@angular/core';

@Directive({
  selector: '[appPokemonBorderDirective]'
})
export class PokemonBorderDirective {

  private initialColor: string;

  constructor(private el:ElementRef) {
    this.initialColor = this.el.nativeElement.style.border;
    this.el.nativeElement.style.borderWidth = '3px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    const color = 'green'
    this.setColor(color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setColor(this.initialColor);
    this.el.nativeElement.style.border = '';
  }

  private setColor(color: string) {
    this.el.nativeElement.style.border = 'solid';
    this.el.nativeElement.style.borderColor = color;
  }

}
