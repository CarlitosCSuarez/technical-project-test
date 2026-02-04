import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../../../core/models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [
    RouterLink,
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
