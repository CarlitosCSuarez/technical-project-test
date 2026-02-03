import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product-service';
import { Product } from '../../../../core/models/product';
import { ProductItem } from '../../components/product-item/product-item';

@Component({
  selector: 'app-list',
  imports: [
    ProductItem,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {

  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  pageSize = signal<number>(5);
  currentPage = signal<number>(1);


  ngOnInit(): void {
    this.setProducts();
  }


  pageProducts = computed(() => {
    let start: number = (this.currentPage() - 1) * this.pageSize();
    let end: number = start + this.pageSize();
    return this.products().slice(start, end);
  });


  totalPages = computed(() => {
    return this.products().length === 0 ? 0 : Math.ceil(this.products().length / this.pageSize());
  });


  paginationInfo = computed(() => {
    let totalRegisters: number = this.products().length;
    if (totalRegisters === 0) {
      return "Sin resultados";
    }
    let start: number = (this.currentPage() - 1) * this.pageSize() + 1;
    let end: number = Math.min(start + this.pageSize() - 1, totalRegisters);
    return `${start} al ${end} de ${totalRegisters} productos.`;
  });


  changePageSize(size: string): void {
    this.pageSize.set(Number(size));
    this.currentPage.set(1);
  }


  nextPage(): void {
    if (this.currentPage() >= this.totalPages()) {
      return;
    }
    this.currentPage.update(page => page + 1);
  }


  prevPage(): void {
    if (this.currentPage() == 1) {
      return;
    }
    this.currentPage.update(page => page - 1);
  }


  setProducts(): void {
    this.productService.getProducts().subscribe({
      next: (productsData: Product[]) => {
        this.products.set(productsData);
      },
      error: err => {
        console.log("Error: No se pudo cargar los datos, ", err);
      }
    });
  }

}
