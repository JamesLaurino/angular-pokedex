import {AfterViewInit, Component, computed, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {PokemonService} from '../../service/pokemon-service';
import {Pokemon} from '../../model/pokemon.model';
import {PokemonBorderDirective} from '../../share/pokemon-border-directive';
import {ReversePipe} from '../../share/reverse-pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchPokemon} from '../search-pokemon/search-pokemon';
import {toSignal} from '@angular/core/rxjs-interop';
import {httpResource} from '@angular/common/http';
declare var bootstrap: any;

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
export class PokemonList implements OnInit, AfterViewInit {

  @ViewChild('toastElement') toastElement!: ElementRef;
  private toastInstance: any;
  protected messageFromQueryParam: string | null = null;

  readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.messageFromQueryParam = params['message'] ?? null;
    });
  }

  ngAfterViewInit(): void {
    if (this.toastElement) {
      this.toastInstance = new bootstrap.Toast(this.toastElement.nativeElement);

      if (this.messageFromQueryParam) {
        this.toastInstance.show();
      }
    }
  }

  readonly #POKEMON_URL = 'http://localhost:3001/pokemons';

  readonly pokemonList =
    httpResource<Pokemon[]>(() => this.#POKEMON_URL, {defaultValue: []})

  isLoading = this.pokemonList.isLoading;

  searchValue = signal("");
  private router = inject(Router)

  filteredPokemonList = computed(() =>
    this.pokemonList.value().filter(pokemon =>
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
}
