import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product-service';
import { Product } from '../../../../core/models/product';
import { ProductItem } from '../../components/product-item/product-item';
import { Search } from '../../../../shared/components/search/search';
import { Button } from '../../../../shared/components/button/button';
import { RouterLink } from '@angular/router';
import { Modal } from '../../../../shared/components/modal/modal';

@Component({
  selector: 'app-list',
  imports: [
    ProductItem,
    Search,
    Button,
    RouterLink,
    Modal,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {

  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  pageSize = signal<number>(5);
  currentPage = signal<number>(1);

  search = signal<string>('');

  // About modal
  showDeleteModal = signal<boolean>(false);
  productToDeleteId = signal<string | null>(null);
  productToDeleteName = signal<string>('');


  ngOnInit(): void {
    this.setProducts();
  }


  pageProducts = computed(() => {
    let start: number = (this.currentPage() - 1) * this.pageSize();
    let end: number = start + this.pageSize();
    return this.filterProducts().slice(start, end);
  });


  filterProducts = computed(() => {
    let value: string = this.search().toLowerCase();
    let products = this.products();
    if (!value?.length) {
      return products;
    }
    return products.filter((item: Product) => {
      let name: string = item.name;
      let description: string = item.description;
      let id: string = String(item.id);
      return name.toLowerCase().includes(value) || description.toLowerCase().includes(value) || id.toLowerCase().includes(value);
    });
  });


  totalPages = computed(() => {
    return this.filterProducts().length === 0 ? 0 : Math.ceil(this.filterProducts().length / this.pageSize());
  });


  paginationInfo = computed(() => {
    let totalRegisters: number = this.filterProducts().length;
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


  searching(value: string): void {
    this.search.set(value);
    this.currentPage.set(1);
  }


  closeModal(): void {
    this.showDeleteModal.set(false);
    this.productToDeleteId.set(null);
  }


  onDeleteRequest(product: Product): void {
    this.productToDeleteId.set(String(product.id));
    this.productToDeleteName.set(product.name);
    this.showDeleteModal.set(true);
  }


  confirmDelete(): void {
    if (!this.productToDeleteId()) {
      return;
    }
    this.productService.deleteProduct(String(this.productToDeleteId())).subscribe({
      next: (deleted: string) => {
        this.closeModal();
        this.setProducts();
      },
      error: err => {
        console.log('Error: no pudo ser eliminado! ', err);
        this.closeModal();
      }
    });
  }

}
