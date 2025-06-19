import { Injectable } from '@angular/core';
import {Pokemon} from '../model/pokemon.model';
import {POKEMON_LIST} from '../data/pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  getPokemon(): Pokemon[] {
    return POKEMON_LIST;
  }

  getPokemonById(id: number): Pokemon {
    const pokemon = POKEMON_LIST.find(pokemon => pokemon.id === id);
    if(!pokemon) {
      throw new Error('Pokemon not found');
    }
    return pokemon;
  }

  getPokemonTypes():string[] {
    const pokemons = this.getPokemon()
    let types:string[] = [];
    for (const pokemon of pokemons) {
      types.push(...pokemon.types);
    }
    return [...new Set(types)]
  }
}
