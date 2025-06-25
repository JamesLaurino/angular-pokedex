import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {rxResource} from '@angular/core/rxjs-interop';
import {PokemonService} from '../../service/Interface/Pokemon-service';

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
  private router  = inject(Router);

  pokemonResponse = rxResource({
    params: () => this.pokemonId,
    stream: ({params:id}) => {
      return this.pokemonService.getPokemonById(id)
    }
  })

  deletePokemon() {
    this.pokemonService.deletePokemon(this.pokemonId).subscribe(() =>{
      this.router.navigate(['/pokemons'], {
        queryParams:
          this.pokemonId ?
            { message: 'Pokémon supprimé avec succès' } : {}
      });
    })
  }
}
