import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../../../core/models/product';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  imports: [
    // RouterLink,
    DatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {

  product = input.required<Product>();

  onDelete = output<void>();

  delete(): void {
    this.onDelete.emit();
  }

}
