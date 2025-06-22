import {Component, computed, inject, signal} from '@angular/core';
import {PokemonService} from '../../service/pokemon-service';
import {Pokemon} from '../../model/pokemon.model';
import {PokemonBorderDirective} from '../../share/pokemon-border-directive';
import {ReversePipe} from '../../share/reverse-pipe';
import {Router} from '@angular/router';
import {SearchPokemon} from '../search-pokemon/search-pokemon';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    PokemonBorderDirective,
    ReversePipe,
    SearchPokemon
  ],
  templateUrl: './pokemon-list.html',
  styles: `.pokemon-card {cursor: pointer}`
})
export class PokemonList {

  private pokemonService = inject(PokemonService);
  pokemonList = signal(this.pokemonService.getPokemon());
  searchValue = signal("");
  private router = inject(Router)

  filteredPokemonList = computed(() =>
    this.pokemonList().filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchValue().trim().toLowerCase())
    )
  );

  pokemonSearch(dataEmited: string) {
    this.searchValue.set(dataEmited);
  }

  goToPokemon(pokemonId:number) {
    console.log("click and go to pokemon : " + pokemonId);
    this.router.navigate(['/pokemons', pokemonId]);
  }

  size(pokemon: Pokemon) {
    if(pokemon.life <= 10) {
      return 'small';
    }
    if(pokemon.life <= 20) {
      return 'medium';
    }
    return 'big';
  }
}
