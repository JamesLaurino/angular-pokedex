import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {PokemonService} from '../../service/pokemon-service';
import {Pokemon, POKEMON_RULES} from '../../model/pokemon.model';
import {NgClass, NgStyle} from '@angular/common';
import {PokemonColorHelper} from '../../share/PokemonColorHelper';

@Component({
  selector: 'app-pokemon-add',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    NgStyle,
    NgClass,
  ],
  templateUrl: './pokemon-add.html',
  styles: `
    .text-truncate-start {
      direction: rtl;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `
})
export class PokemonAdd {

  protected pokemonService = inject(PokemonService);
  readonly router = inject(Router);
  protected readonly POKEMON_RULES = POKEMON_RULES;

  readonly form= new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(POKEMON_RULES.MIN_NAME),
        Validators.maxLength(POKEMON_RULES.MAX_NAME),
        Validators.pattern(POKEMON_RULES.NAME_PATTERN)
      ]
    ),
    live: new FormControl(10),
    picture: new FormControl('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png', [
      Validators.required,
      Validators.pattern(POKEMON_RULES.PICTURE_PATTERN),
    ]),
    damage: new FormControl(1),
    types: new FormArray(
      [new FormControl('Normal')],
      [
        Validators.required,
        Validators.maxLength(POKEMON_RULES.MAX_TYPES)
      ]
    )
  });

  get pokemonTypesArray() : FormArray {
    return this.form.get('types') as FormArray;
  }

  private removeType(type:string) {
    const index = this.pokemonTypesArray
      .controls
      .map(control => control.value)
      .indexOf(type);
    this.pokemonTypesArray.removeAt(index);
  }

  isTypeCheck(isCheck:Boolean,type:string):void {
    if(isCheck) {
      this.pokemonTypesArray.push(new FormControl(type));
    }
    else {
      this.removeType(type);
    }
  }

  badgeClick(type:string) {
    this.removeType(type);
  }

  isPokemonTypeSelected(type:string):boolean{
    return Boolean(this.pokemonTypesArray.controls
      .find(control => control.value === type));
  }

  get pokemonName() : FormControl {
    return this.form.get('name') as FormControl;
  }

  get pokemonPicture() : FormControl {
    return this.form.get('picture') as FormControl;
  }

  get pokemonLive() : FormControl {
    return this.form.get('live') as FormControl;
  }

  get pokemonDamage() : FormControl {
    return this.form.get('damage') as FormControl;
  }

  onSubmit() {
    const pokemon:Omit<Pokemon, 'id'> = {
      name: this.pokemonName.value,
      life: this.pokemonLive.value,
      picture: this.pokemonPicture.value,
      damage: this.pokemonDamage.value,
      types: this.pokemonTypesArray.value,
      created: new Date()
    }

    this.pokemonService.addPokemon(pokemon).subscribe(() => {
      if(pokemon) {
        this.router.navigate(['/pokemons'], {
          queryParams:
            this.pokemonName.value ?
              { message: 'Pokémon ' + this.pokemonName.value + ' ajouté avec succès' } : {}
        });
      }
      return;
    })
  }

  decrementLive() {
    this.pokemonLive.setValue(this.pokemonLive.value - 1);
  }

  incrementLive() {
    this.pokemonLive.setValue(this.pokemonLive.value + 1);
  }

  decrementDamage() {
    this.pokemonDamage.setValue(this.pokemonDamage.value - 1);
  }

  incrementDamage() {
    this.pokemonDamage.setValue(this.pokemonDamage.value + 1);
  }

  pokemonColor(type:string):string {
    return PokemonColorHelper.getPokemonColor(type);
  }

  isPokemonElectric(type:string):boolean {
    return PokemonColorHelper.isElectricType(type);
  }
}
