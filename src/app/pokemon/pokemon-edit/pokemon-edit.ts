import {Component, effect, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PokemonService} from '../../service/pokemon-service';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {PokemonColorHelper} from '../../share/PokemonColorHelper';
import {Pokemon, POKEMON_RULES} from '../../model/pokemon.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-pokemon-edit',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './pokemon-edit.html',
  styles: ``
})
export class PokemonEdit {
  private routes = inject(ActivatedRoute)
  protected pokemonId = Number(this.routes.snapshot.paramMap.get('id'));
  protected pokemonService = inject(PokemonService);
  private router = inject(Router);
  pokemon = toSignal(this.pokemonService.getPokemonById(this.pokemonId));

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
    damage: new FormControl(''),
    types: new FormArray(
      [],
      [
        Validators.required,
        Validators.maxLength(POKEMON_RULES.MAX_TYPES)
      ]
    )
  });

  constructor() {
    effect(() => {
      const pokemon = this.pokemon();
      if(pokemon) {
        this.form.patchValue({
          name: pokemon.name,
          live: String(pokemon.life),
          damage: String(pokemon.damage),
        })

        pokemon.types.forEach(type => {
          this.pokemonTypeList.push(new FormControl(type));
        })

      }
    });
  }

  get pokemonTypeList() : FormArray{
    return this.form.get('types') as FormArray;
  }

  isPokemonTypeSelected(type:string):boolean{
    return !!this.pokemonTypeList.controls
      .find(control => control.value === type);
  }

  onPokemonTypeChange(type:string,isChecked:boolean) {
    if(isChecked) {
      this.pokemonTypeList.push(new FormControl(type));
    }
    else {
      const index = this.pokemonTypeList
        .controls
        .map(control => control.value)
        .indexOf(type);

      this.pokemonTypeList.removeAt(index);
    }
  }

  isElectricType(type:string):boolean {
    return type === 'Electrik';
  }

  getPokemonColor(type:string):string {
    return PokemonColorHelper.getPokemonColor(type);
  }

  onSubmit() {
    const isValid = this.form.valid;
    const pokemon = this.pokemon(); // old pokemon

    if(isValid && pokemon) {
      const updatedPokemon = {
        ...pokemon,
        name: this.pokemonName.value,
        life: Number(this.pokemonLive.value),
        damage: Number(this.pokemonDamage.value),
        types: this.pokemonTypeList.value
      };

     this.pokemonService.updatePokemon(updatedPokemon).subscribe(() =>
       this.router.navigate(['/pokemons', pokemon.id]))

    }
  }

  get pokemonLive() : FormControl {
    return this.form.get('live') as FormControl;
  }

  incrementLive() {
    this.pokemonLive.setValue(this.pokemonLive.value + 1);
  }

  decrementLive() {
    this.pokemonLive.setValue(this.pokemonLive.value - 1);
  }

  get pokemonDamage() : FormControl {
    return this.form.get('damage') as FormControl;
  }

  incrementDamage() {
    this.pokemonDamage.setValue(this.pokemonDamage.value + 1);
  }

  decrementDamage() {
    this.pokemonDamage.setValue(this.pokemonDamage.value - 1);
  }


  get pokemonName() : FormControl {
    return this.form.get('name') as FormControl;
  }

  protected readonly POKEMON_RULES = POKEMON_RULES;
}
