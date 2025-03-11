import { ProductService } from './../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product/product.model';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  getProducts(): Product[]{
    return this.productService.getProducts();
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id);
  }
}
