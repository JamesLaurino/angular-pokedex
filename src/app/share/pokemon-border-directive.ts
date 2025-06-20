import {Directive, ElementRef, HostListener, input, InputSignal,} from '@angular/core';
import {PokemonColorHelper} from './PokemonColorHelper';

@Directive({
  selector: '[appPokemonBorderDirective]'
})
export class PokemonBorderDirective {

  private initialColor: string;

  constructor(private el:ElementRef) {
    this.initialColor = this.el.nativeElement.style.border;
    this.el.nativeElement.style.borderWidth = '3px';
  }

  pokemonType:InputSignal<string> = input.required<string>();

  @HostListener('mouseenter') onMouseEnter() {
    const color = PokemonColorHelper.getPokemonColor(this.pokemonType());
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
