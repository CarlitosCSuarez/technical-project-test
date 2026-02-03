import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { ProductService } from '../../../../core/services/product-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../../core/models/product';

@Component({
  selector: 'app-form-product',
  imports: [
    CommonModule,
    Button,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {

  private readonly router = inject(Router);
  private productService = inject(ProductService);

  private formBuilder = inject(FormBuilder);


  productForm: FormGroup = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', Validators.required],
    date_release: ['', Validators.required],
    date_revision: ['', Validators.required],
  });


  actionSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

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


  resetForm(): void {
    this.productForm.reset();
  }
}
