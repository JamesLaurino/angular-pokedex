import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PokemonService} from '../../service/pokemon-service';

@Component({
  selector: 'app-pokemon-edit',
  imports: [
    RouterLink
  ],
  templateUrl: './pokemon-edit.html',
  styles: ``
})
export class PokemonEdit {
  private routes = inject(ActivatedRoute)
  protected pokemonId = Number(this.routes.snapshot.paramMap.get('id'));
  protected pokemonService = inject(PokemonService);
  pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId));

}
