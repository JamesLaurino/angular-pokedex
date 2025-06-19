import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {PokemonList} from './pokemon/pokemon-list/pokemon-list';

const routes:Routes = [
  {path:"pokemons", component:PokemonList},
  {path:"", redirectTo:"pokemons", pathMatch:"full"},
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ]
};
