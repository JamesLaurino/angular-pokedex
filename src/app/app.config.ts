import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {PokemonList} from './pokemon/pokemon-list/pokemon-list';
import {PokemonProfile} from './pokemon/pokemon-profile/pokemon-profile';
import {PageNotFound} from './page-not-found/page-not-found';
import {PokemonEdit} from './pokemon/pokemon-edit/pokemon-edit';
import {provideHttpClient} from '@angular/common/http';
import {AuthGuard} from './core/auth/auth.guard';
import {LoginComponent} from './login/login.component';
import {PokemonAdd} from './pokemon/pokemon-add/pokemon-add';

const routes:Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Page de connexion',
  },
  {
    path:"pokemons",
    canActivateChild: [AuthGuard],
    children: [
      {
        path:"add",
        component:PokemonAdd,
        title:"Add"
      },
      {
        path:"edit/:id",
        component:PokemonEdit,
        title:"Edit"
      },
      {
        path:":id",
        component:PokemonProfile,
        title:"Pokemon"
      },
      {
        path:"",
        component:PokemonList,
        title:"Pokemon"
      }
    ]
  },
  {path:"", redirectTo:"/pokemons", pathMatch:"full"},
  {path: '**', component: PageNotFound},
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient()
  ]
};
