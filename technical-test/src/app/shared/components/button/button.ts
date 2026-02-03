import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {

  label = input<'primary' | 'secondary'>('primary');
  disabled = input<boolean>(false);

  action = output<void>();

  actionClick(): void {
    if (this.disabled()) {
      return;
    }
    this.action.emit();
  }
}
