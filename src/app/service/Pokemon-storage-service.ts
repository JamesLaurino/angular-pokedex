import {PokemonService} from './Interface/Pokemon-service';
import {Pokemon} from '../model/pokemon.model';
import {Observable, of} from 'rxjs';
import {POKEMON_LIST} from '../data/pokemon-list.fake';


export class PokemonStorageService implements PokemonService {

  private localStorageKey = 'pokemons';

  private initializePokemons(): void {
    const storedPokemons = localStorage.getItem(this.localStorageKey);
    if (!storedPokemons) {
      const initialPokemons: Pokemon[] = [
        {
          id: 1,
          name: 'Bulbizarre',
          life: 25,
          damage: 5,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
          types: ['Plante', 'Poison'],
          created: new Date(),
        },
        {
          id: 2,
          name: 'Salamèche',
          life: 28,
          damage: 6,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
          types: ['Feu'],
          created: new Date(),
        },
        {
          id: 3,
          name: 'Carapuce',
          life: 21,
          damage: 4,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
          types: ['Eau'],
          created: new Date(),
        },
        {
          id: 4,
          name: 'Aspicot',
          life: 16,
          damage: 2,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png',
          types: ['Insecte', 'Poison'],
          created: new Date(),
        },
        {
          id: 5,
          name: 'Roucool',
          life: 30,
          damage: 7,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png',
          types: ['Normal', 'Vol'],
          created: new Date(),
        },
        {
          id: 6,
          name: 'Rattata',
          life: 18,
          damage: 6,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png',
          types: ['Normal'],
          created: new Date(),
        },
        {
          id: 7,
          name: 'Piafabec',
          life: 14,
          damage: 5,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/021.png',
          types: ['Normal', 'Vol'],
          created: new Date(),
        },
        {
          id: 8,
          name: 'Abo',
          life: 16,
          damage: 4,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png',
          types: ['Poison'],
          created: new Date(),
        },
        {
          id: 9,
          name: 'Pikachu',
          life: 21,
          damage: 7,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png',
          types: ['Electrik'],
          created: new Date(),
        },
        {
          id: 10,
          name: 'Sabelette',
          life: 19,
          damage: 3,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/027.png',
          types: ['Normal'],
          created: new Date(),
        },
        {
          id: 11,
          name: 'Mélofée',
          life: 25,
          damage: 5,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png',
          types: ['Fée'],
          created: new Date(),
        },
        {
          id: 12,
          name: 'Groupix',
          life: 17,
          damage: 8,
          picture:
            'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png',
          types: ['Feu'],
          created: new Date(),
        },
      ];
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(initialPokemons)
      );
    }
  }

  private getPokemonsFromStorage(): Pokemon[] {
    this.initializePokemons();
    const pokemons = localStorage.getItem(this.localStorageKey);
    return pokemons ? JSON.parse(pokemons) : [];
  }

  private savePokemonsToStorage(pokemons: Pokemon[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(pokemons));
  }

  getPokemonList(): Observable<Pokemon[]> {
    const pokemons = this.getPokemonsFromStorage();
    return of(pokemons);
  }

  updatePokemon(pokemon:Pokemon): Observable<Pokemon> {
    const pokemons = this.getPokemonsFromStorage();
    const index = pokemons.findIndex((p) => p.id === pokemon.id);
    if (index !== -1) {
      pokemons[index] = pokemon;
      this.savePokemonsToStorage(pokemons);
    }
    return of(pokemon);
  }

  addPokemon(pokemon:Omit<Pokemon, 'id'>): Observable<Pokemon> {
    const pokemons = this.getPokemonsFromStorage();
    const newPokemon: Pokemon = {
      id: pokemons.length + 1,
      ...pokemon,
    };
    pokemons.push(newPokemon);
    this.savePokemonsToStorage(pokemons);
    return of(newPokemon);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const pokemons = this.getPokemonsFromStorage();
    const pokemon = pokemons.find((p) => p.id === id);
    return of(pokemon!);
  }

  deletePokemon(id: number): Observable<void> {
    let pokemons = this.getPokemonsFromStorage();
    pokemons = pokemons.filter((p) => p.id !== id);
    this.savePokemonsToStorage(pokemons);
    return of(void 0);
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
