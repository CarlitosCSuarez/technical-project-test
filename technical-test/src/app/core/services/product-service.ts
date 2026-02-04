import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { ApiResponse } from '../models/http-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly _httpClient = inject(HttpClient);
  private readonly _endpoint = `${environment.urlAPI}`;


  getProducts(): Observable<Product[]> {
    return this._httpClient.get<ApiResponse<Product[]>>(this._endpoint)
      .pipe(map(response => response.data!));
  }


  getProduct(productId: string): Observable<Product> {
    return this._httpClient.get<Product>(`${this._endpoint}/${productId}`)
      .pipe(map(response => {
        return response;
      }));
  }


  addProduct(product: Product): Observable<Product> {
    return this._httpClient.post<ApiResponse<Product>>(this._endpoint, product)
      .pipe(map(response => response.data!));
  }


  updateProduct(product: Product): Observable<Product> {
    let url: string = `${this._endpoint}/${product.id}`;
    return this._httpClient.put<ApiResponse<Product>>(url, product)
      .pipe(map(response => response.data!));
  }


  deleteProduct(productId: string): Observable<string> {
    let url: string = `${this._endpoint}/${productId}`;
    return this._httpClient.delete<ApiResponse>(url)
      .pipe(map(response => response.message!))
  }


  checkIdProduct(productId: string): Observable<Boolean> {
    return this._httpClient.get<Boolean>(`${this._endpoint}/verification/${productId}`);
  }

}
