import {Pokemon} from '../../model/pokemon.model';
import {Observable} from 'rxjs';

export abstract  class PokemonService {

  abstract updatePokemon(pokemon:Pokemon): Observable<Pokemon>

  abstract addPokemon(pokemon:Omit<Pokemon, 'id'>): Observable<Pokemon>

  abstract getPokemonById(id: number): Observable<Pokemon>

  abstract deletePokemon(id: number): Observable<void>

  abstract getPokemonTypes():string[]
}
