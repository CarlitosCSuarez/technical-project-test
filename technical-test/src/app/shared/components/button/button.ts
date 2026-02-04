import { NgClass, NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [
    NgClass,
    NgStyle,
  ],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {

  label = input.required<string>();
  maxWith = input<string>('max-content');
  option = input<'primary' | 'secondary'>('primary');
  disabled = input<boolean>(false);

  action = output<void>();

  actionClick(): void {
    if (this.disabled()) {
      return;
    }
    this.action.emit();
  }
}
