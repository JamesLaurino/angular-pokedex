import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {PokemonService} from '../../service/pokemon-service';

@Component({
  selector: 'app-pokemon-add',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './pokemon-add.html',
  styles: []
})
export class PokemonAdd {

  protected pokemonService = inject(PokemonService);

  onSubmit() {

  }
}
