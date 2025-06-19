import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {PokemonList} from './pokemon/pokemon-list/pokemon-list';
import {PokemonProfile} from './pokemon/pokemon-profile/pokemon-profile';

const routes:Routes = [
  {path:"pokemons", component:PokemonList},
  {path:"pokemons/:id", component:PokemonProfile},
  {path:"", redirectTo:"pokemons", pathMatch:"full"},
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ]
};
