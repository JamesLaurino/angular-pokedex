import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {PokemonService} from '../../service/pokemon-service';
import {Pokemon} from '../../model/pokemon.model';
import {PokemonBorderDirective} from '../../share/pokemon-border-directive';
import {ReversePipe} from '../../share/reverse-pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchPokemon} from '../search-pokemon/search-pokemon';
import {toSignal} from '@angular/core/rxjs-interop';

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
export class PokemonList implements OnInit{

  readonly route = inject(ActivatedRoute);

  ngOnInit():void {
    this.route.queryParams.subscribe(params => {
      const message = params['message'];
      if (message) {
        console.log(message);
      }
    });
  }

  private pokemonService = inject(PokemonService);

  pokemonList = toSignal(this.pokemonService.getPokemon(), {
    initialValue: []
  });

  isLoading = computed(() => this.pokemonList().length <= 0)

  searchValue = signal("");
  private router = inject(Router)

  filteredPokemonList = computed(() =>
    this.pokemonList().filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchValue().trim().toLowerCase())
    )
  );

  addPokemon() {
    this.router.navigate(['/pokemons/add']);
  }

  pokemonSearch(dataEmited: string) {
    this.searchValue.set(dataEmited);
  }

  goToPokemon(pokemonId:number) {
    this.router.navigate(['/pokemons', pokemonId]);
  }

  size(pokemon: Pokemon) {
    if(pokemon.life <= 10) {
      return 'Petit';
    }
    if(pokemon.life <= 20) {
      return 'Moyen';
    }
    return 'Grand';
  }

  protected readonly Number = Number;
}
