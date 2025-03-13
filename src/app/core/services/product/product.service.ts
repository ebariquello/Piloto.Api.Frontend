import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment';
import { BaseNumberResultModel } from 'app/shared/models/base.model';
import {
  //DiscountParameterResultModel,
  // FormCreateEditProductModel,
  ProductModel,
} from 'app/core/services/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductModel[]> {
    const result = this.http.get<ProductModel[]>(`${environment.products}`);
    const result2 = result.subscribe({
      next: (data) => {
        console.log('Data received:', data);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
      complete: () => {
        console.log('Request completed.');
      },
    });
    return result;
  }

  getById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${environment.products}/${id}`);
  }

  addProduct(body: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${environment.products}`, body);
  }
  updateProduct(body: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${environment.products}`, body);
  }
  deleteProduct(productId: number): Observable<number> {
    return this.http.delete<number>(`${environment.products}/${productId}`);
  }
}
