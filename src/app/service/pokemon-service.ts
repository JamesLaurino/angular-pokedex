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

  getPokemonById(id: number): Pokemon {
    const pokemon = POKEMON_LIST.find(pokemon => pokemon.id === id);
    if(!pokemon) {
      throw new Error('Pokemon not found');
    }
    return pokemon;
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
