import { AuthenticationService } from './../service/authentication.service';
import { environment } from './../../environments/environment';
// import { RestUserRepository } from './rest.user.repository';
import { Product } from './../model/product/product.model';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const PROTOCOL = 'http';
// const PORT = '3500';

@Injectable()
export class RestProductRepository {
  //baseURL = '';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    // this.baseURL = `${PROTOCOL}://${location.hostname}:${PORT}`;
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/product`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/product`, product);
    // return this.http.post<Product>(`${this.baseURL}/products`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${environment.apiUrl}/product/${product.id}`,
      product
    );
  }
  // Call Delete and Passing Token without interceptor
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(
      `${environment.apiUrl}/products/${id}`,
      this.getOptions()
    );
  }

  // Obsolete : Getting token, without interceptor
  private getOptions() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      return {
        headers: new HttpHeaders({
          Authorization: `Bearer ${currentUser.token}`,
        }),
      };
    }
    return null;
  }
}
