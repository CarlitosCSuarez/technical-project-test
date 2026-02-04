import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { ProductService } from '../../../../core/services/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../../core/models/product';
import { CustomValidators } from '../../../../shared/utils/custom-validators.validator';

@Component({
  selector: 'app-form-product',
  imports: [
    CommonModule,
    Button,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);

  private formBuilder = inject(FormBuilder);

  productId: string | null = null;


  productForm: FormGroup = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [CustomValidators.checkUniqueId(this.productService)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', Validators.required],
    date_release: ['', [Validators.required, CustomValidators.checkDateFuture]],
    date_revision: ['', Validators.required],
  }, {
    validators: [CustomValidators.checkDateFutureYear]
  });


  ngOnInit(): void {
    // Set info product from product id.
    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.setProduct();
      }
    });
    // Set next year about date revision from date release.
    this.productForm.get('date_release')?.valueChanges.subscribe((value: string) => {
      if (!value) {
        this.productForm.get('date_revision')?.setValue('');
        return;
      }
      const nextYearDate = this.getNextYear(value);
      this.productForm.get('date_revision')?.setValue(nextYearDate, { emitEvent: false });
    });
  }


  setProduct(): void {
    this.productForm.get('id')?.disable();
    this.productService.getProduct(String(this.productId)).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue({
          id: product.id,
          name: product.name,
          description: product.description,
          logo: product.logo,
          date_release: this.formatDateForInput(product.date_release),
          date_revision: this.formatDateForInput(product.date_revision),
        });
      },
      error: err => {
        console.log('Error: No se pudo cargar el producto!, ', err);
      }
    });
  }


  private formatDateForInput(date: string | Date): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    if (typeof date === 'string') {
      return date.split('T')[0];
    }
    return '';
  }


  actionSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.productId ? this.updateProduct() : this.addProduct();
  }


  addProduct(): void {
    let product: Product = this.productForm.value;
    this.productService.addProduct(product).subscribe({
      next: (data: Product) => {
        console.log('Producto creado!');
        this.router.navigate(['/products']);
      },
      error: err => {
        console.log('Error: El producto no se pudo crear!, ', err);
      }
    });
  }


  updateProduct(): void {
    let product: Product = this.productForm.getRawValue();
    this.productService.updateProduct(product).subscribe({
      next: (data: Product) => {
        console.log('Producto actualizado!');
        this.router.navigate(['/products']);
      },
      error: err => {
        console.log('Error: El producto no se pudo actualizar!, ', err);
      }
    });
  }


  resetForm(): void {
    if (!this.productId) {
      this.productForm.reset();
      return;
    }
    this.setProduct();
  }


  private getNextYear(dateString: string): string {
    let [yearStr, monthStr, dayStr] = dateString.split('-');
    let year: number = Number(yearStr);
    let month: number = Number(monthStr) - 1;
    let day: number = Number(dayStr);
    let date: Date = new Date(year + 1, month, day);
    let newYear: number = date.getFullYear();
    let newMonth: string = (date.getMonth() + 1).toString().padStart(2, '0');
    let newDay: string = date.getDate().toString().padStart(2, '0');
    return `${newYear}-${newMonth}-${newDay}`;
  }
}
