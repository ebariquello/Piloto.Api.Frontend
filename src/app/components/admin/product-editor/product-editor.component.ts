import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product/product.model';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss'],
})
export class ProductEditorComponent implements OnInit {
  editing = false;
  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private router: Router,
    acitveRoute: ActivatedRoute
  ) {
    const modeKey = 'mode';
    const idKey = 'id';
    this.editing = acitveRoute.snapshot.params[modeKey] === 'edit';
    if (this.editing) {
      Object.assign(
        this.product,
        this.productService.getProduct(acitveRoute.snapshot.params[idKey])
      );
    }
  }

  ngOnInit(): void {}

  save(form: NgForm) {
    this.productService.saveProduct(this.product);
    this.router.navigateByUrl('/admin/main/products');
  }
}
