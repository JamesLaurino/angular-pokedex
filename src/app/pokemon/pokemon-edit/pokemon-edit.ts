import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PokemonService} from '../../service/pokemon-service';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe, NgClass, NgStyle} from '@angular/common';
import {PokemonColorHelper} from '../../share/PokemonColorHelper';

@Component({
  selector: 'app-pokemon-edit',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    JsonPipe,
    NgClass,
    NgStyle
  ],
  templateUrl: './pokemon-edit.html',
  styles: ``
})
export class PokemonEdit {
  private routes = inject(ActivatedRoute)
  protected pokemonId = Number(this.routes.snapshot.paramMap.get('id'));
  protected pokemonService = inject(PokemonService);
  pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId));

  readonly form= new FormGroup({
    name: new FormControl(this.pokemon().name),
    live: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    types: new FormArray(
      this.pokemon().types.map(type => new FormControl(type))
    ),
  });

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

  onSubmit() {
    console.log(this.form.value);
  }

  protected readonly PokemonColorHelper = PokemonColorHelper;
}
