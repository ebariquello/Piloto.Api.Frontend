import { Injectable } from '@angular/core';
import { Product } from '../model/product/product.model';
import { RestProductRepository } from '../repository/rest.product.repository';
import { pipe } from 'rxjs';
// import { StaticProductRepository } from '../repository/static.product.repository';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  // constructor(private dataSource: StaticProductRepository){
  constructor(private dataSource: RestProductRepository) {
    dataSource.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number | string): Product {
    return this.products.find((p) => p.id === Number(id));
  }

  saveProduct(product: Product) {
    if (product.id == null || product.id === 0) {
      this.dataSource.saveProduct(product).subscribe((createdProduct) => {
        this.products.push(createdProduct);
      });
    } else {
      this.dataSource.updateProduct(product).subscribe((updatedProduct) => {
        this.products.splice(
          this.products.findIndex(
            (productToRemove) => productToRemove.id === product.id
          ),
          1,
          updatedProduct
        );
      });
    }
  }
  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe((deletedProduct) => {
      this.products.splice(
        this.products.findIndex((productToRemove) => productToRemove.id === id),
        1
      );
    });
  }
}
