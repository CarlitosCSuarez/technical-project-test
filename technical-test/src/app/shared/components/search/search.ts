import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {

  placeholder = input<string>('Buscar...');

  searching = output<string>();


  onSearching(value: string): void {
    this.searching.emit(value);
  }

}
