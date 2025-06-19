import {Component, signal} from '@angular/core';
import {POKEMON_LIST} from '../data/pokemon-list';
import {Pokemon} from '../model/pokemon.model';
import {PokemonBorderDirective} from '../share/pokemon-border-directive';
import {DatePipe} from '@angular/common';
import {ReversePipe} from '../share/reverse-pipe';

@Component({
  selector: 'app-root',
  imports: [PokemonBorderDirective, DatePipe, ReversePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone:true
})
export class App {

  pokemonList = signal(POKEMON_LIST);

  size(pokemon: Pokemon) {
    if(pokemon.life <= 10) {
      return 'small';
    }
    if(pokemon.life <= 20) {
      return 'medium';
    }
    return 'big';
  }

  incrementLive(pokemon: Pokemon) {
    pokemon.life++;
  }

  decrementLive(pokemon: Pokemon) {
    pokemon.life--;
  }
}
