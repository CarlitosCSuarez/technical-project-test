import { Component, input, output } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-modal',
  imports: [
    Button,
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {

  visible = input.required<boolean>();
  title = input<string>('¿Estás seguro de eliminar?');

  onConfirm = output<void>();
  onClose = output<void>();


  actionCancel(): void {
    this.onClose.emit();
  }


  actionConfirm(): void {
    this.onConfirm.emit();
  }
}