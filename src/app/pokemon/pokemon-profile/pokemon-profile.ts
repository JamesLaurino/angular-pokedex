import {Component, computed, inject} from '@angular/core';
import {PokemonService} from '../../service/pokemon-service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {catchError, map, of} from 'rxjs';

@Component({
  selector: 'app-pokemon-profile',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './pokemon-profile.html',
  styles: ``
})
export class PokemonProfile {

  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  private pokemonId = Number(this.route.snapshot.paramMap.get('id'));

  readonly pokemonResponse = toSignal(this.pokemonService
    .getPokemonById(this.pokemonId)
    .pipe(
      map((pokemon) =>(
        {value: pokemon, error: null}
      )),
      catchError((error) => of({value: null, error:error}))
    )
  );

  readonly loading = computed(() =>
    this.pokemonResponse() === undefined);

  readonly error = computed(() =>
    this.pokemonResponse()?.error);

  readonly pokemon = computed(() =>
    this.pokemonResponse()?.value);
}
