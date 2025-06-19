import {Component, inject, signal} from '@angular/core';
import {Pokemon} from '../model/pokemon.model';
import {PokemonBorderDirective} from '../share/pokemon-border-directive';
import {ReversePipe} from '../share/reverse-pipe';
import {PokemonService} from '../service/pokemon-service';

@Component({
  selector: 'app-root',
  imports: [PokemonBorderDirective, ReversePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone:true
})
export class App {

  private pokemonService = inject(PokemonService);
  pokemonList = signal(this.pokemonService.getPokemon());

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
