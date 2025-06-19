import {Directive, ElementRef, HostListener, input, InputSignal,} from '@angular/core';

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
    const color = this.getBorderColor();
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

  private getBorderColor() {
    switch (this.pokemonType()) {
      case 'Feu':
        return '#EF5350';
      case 'Eau':
        return '#42A5F5';
      case 'Plante':
        return '#66BB6A';
      case 'Insecte':
        return '#8d6e63';
      case 'Vol':
        return '#90CAF9';
      case 'Poison':
        return '#b388ff';
      case 'Fée':
        return '#f8bbd0';
      case 'Electrik':
        return '#f4ff81';
      default:
        return '#303030';
    }
  }

}
