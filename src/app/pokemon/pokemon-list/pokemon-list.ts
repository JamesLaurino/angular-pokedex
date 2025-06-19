import {Component, computed, inject, signal} from '@angular/core';
import {PokemonService} from '../../service/pokemon-service';
import {Pokemon} from '../../model/pokemon.model';
import {PokemonBorderDirective} from '../../share/pokemon-border-directive';
import {ReversePipe} from '../../share/reverse-pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    PokemonBorderDirective,
    ReversePipe,
    RouterLink
  ],
  templateUrl: './pokemon-list.html',
  styles: ``
})
export class PokemonList {

  private pokemonService = inject(PokemonService);
  pokemonList = signal(this.pokemonService.getPokemon());
  searchValue = signal("");

  filteredPokemonList = computed(() =>
    this.pokemonList().filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchValue().trim().toLowerCase())
    )
  );

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
