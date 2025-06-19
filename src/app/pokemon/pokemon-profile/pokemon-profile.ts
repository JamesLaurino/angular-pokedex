import {Component, inject, signal} from '@angular/core';
import {PokemonService} from '../../service/pokemon-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pokemon-profile',
  imports: [],
  templateUrl: './pokemon-profile.html',
  styles: ``
})
export class PokemonProfile {

  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  private pokemonId = Number(this.route.snapshot.paramMap.get('id'));

  pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId));

}
