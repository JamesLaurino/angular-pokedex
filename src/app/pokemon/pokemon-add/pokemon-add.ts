import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {PokemonService} from '../../service/pokemon-service';
import {POKEMON_RULES} from '../../model/pokemon.model';

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

  readonly form= new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(POKEMON_RULES.MIN_NAME),
        Validators.maxLength(POKEMON_RULES.MAX_NAME),
        Validators.pattern(POKEMON_RULES.NAME_PATTERN)
      ]
    ),
    live: new FormControl(''),
    picture: new FormControl(''),
    damage: new FormControl(''),
    types: new FormArray(
      [],
      [
        Validators.required,
        Validators.maxLength(POKEMON_RULES.MAX_TYPES)
      ]
    )
  });

  onSubmit() {
    console.log(this.form.value)
  }
}
