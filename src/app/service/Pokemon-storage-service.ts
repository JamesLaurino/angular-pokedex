import {PokemonService} from './Interface/Pokemon-service';
import {Pokemon} from '../model/pokemon.model';
import {Observable, of} from 'rxjs';
import {POKEMON_LIST} from '../data/pokemon-list.fake';


export class PokemonStorageService implements PokemonService {

  updatePokemon(pokemon:Pokemon): Observable<Pokemon> {
    return of()
  }

  addPokemon(pokemon:Omit<Pokemon, 'id'>): Observable<Pokemon> {
    return of()
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return of()
  }

  deletePokemon(id: number): Observable<void> {
    return of()
  }

  getPokemonTypes():string[] {
    const pokemons = POKEMON_LIST;
    let types:string[] = [];
    for (const pokemon of pokemons) {
      types.push(...pokemon.types);
    }
    return [...new Set(types)]
  }
}
