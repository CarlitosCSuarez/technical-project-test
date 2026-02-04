import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [
    NgStyle,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {

  placeholder = input<string>('Buscar...');
  maxWidth = input<string>('');

  searching = output<string>();


  onSearching(value: string): void {
    this.searching.emit(value);
  }

}
