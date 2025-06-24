import {inject, Injectable} from '@angular/core';
import {Pokemon} from '../model/pokemon.model';
import {POKEMON_LIST} from '../data/pokemon-list.fake';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  readonly #POKEMON_URL = 'http://localhost:3001/pokemons';
  readonly #http:HttpClient = inject(HttpClient)

  getPokemon(): Observable<Pokemon[]> {
    return this.#http.get<Pokemon[]>(this.#POKEMON_URL);
  }
  updatePokemon(pokemon:Pokemon): Observable<Pokemon> {
    return this.#http.put<Pokemon>(this.#POKEMON_URL + "/" + pokemon.id,pokemon);
  }

  addPokemon(pokemon:Omit<Pokemon, 'id'>): Observable<Pokemon> {
    return this.#http.post<Pokemon>(this.#POKEMON_URL,pokemon);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.#http.get<Pokemon>(this.#POKEMON_URL + "/" + id);
  }

  deletePokemon(id: number): Observable<void> {
    return this.#http.delete<void>(this.#POKEMON_URL + "/" + id);
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
