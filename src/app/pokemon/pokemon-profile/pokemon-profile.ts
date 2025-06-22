import {Component, computed, effect, inject, signal} from '@angular/core';
import {PokemonService} from '../../service/pokemon-service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {Pokemon} from '../../model/pokemon.model';

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

  pokemon = toSignal(this.pokemonService.getPokemonById(this.pokemonId));
}
