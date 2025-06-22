import {Component, EventEmitter, Output, signal} from '@angular/core';

@Component({
  selector: 'app-search-pokemon',
  imports: [],
  templateUrl: './search-pokemon.html',
  styles: ``
})
export class SearchPokemon {
  searchValue = signal("");

  @Output() dataEmitted = new EventEmitter<any>()

  searchPokemon(element:any) {
    this.searchValue.set(element)
    this.dataEmitted.emit(this.searchValue());
  }
}
