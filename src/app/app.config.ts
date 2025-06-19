import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {PokemonList} from './pokemon/pokemon-list/pokemon-list';
import {PokemonProfile} from './pokemon/pokemon-profile/pokemon-profile';
import {PageNotFound} from './page-not-found/page-not-found';

const routes:Routes = [
  {path:"pokemons", component:PokemonList,title:"Pokedex"},
  {path:"pokemons/:id", component:PokemonProfile, title:"Pokemon"},
  {path:"", redirectTo:"pokemons", pathMatch:"full"},
  { path: '**', component: PageNotFound },
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ]
};
