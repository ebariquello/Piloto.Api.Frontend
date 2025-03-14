import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormCreateEditProductComponent } from 'app/modules/product/components/form-create-edit-product/form-create-edit-product.component';
import { ProductService } from 'app/core/services/product/product.service';
import { ProductModel } from 'app/core/services/product/product.model';

@Component({
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss'],
})
export class CreateEditProductComponent implements OnInit {
  @ViewChild(FormCreateEditProductComponent, { static: true })
  formProductComponent!: FormCreateEditProductComponent;

  hasParamId: boolean = false;
  paramId?: number;
  productToEdit: ProductModel | null = null;

  constructor(
    public location: Location,
    public productService: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.hasParamId = true;
        this.paramId = params['id'];
        this.loadProductForEditing(this.paramId);
      }
    });
  }
  loadProductForEditing(productId: number): void {
    this.productService.getById(productId).subscribe(
      (product) => {
        this.productToEdit = product; // Store the fetched product
      },
      (error) => {
        this.toastr.error('Error loading product for editing');
      }
    );
  }

  sendSaveProduct(formProduct: ProductModel): void {
    if (this.hasParamId) {
      this.onUpdatingProduct(formProduct);
    } else {
      this.onAddingProduct(formProduct);
    }
  }

  private onAddingProduct(formProduct: ProductModel): void {
    const product = {
      ...formProduct,
      name: formProduct.name,
      price: formProduct.price,
      stock: formProduct.stock,
    };
    this.productService.addProduct(product).subscribe(
      (res) => {
        if (res.id > 0) {
          this.router.navigate(['/products']);
          this.toastr.success('Prodcut added successfully');
        }
      },
      (err) => this.toastr.error(err)
    );
  }
  private onUpdatingProduct(formProduct: ProductModel): void {
    formProduct.id = this.paramId;
    this.productService.updateProduct(formProduct).subscribe(
      (res) => {
        this.router.navigate(['/products']);
        this.toastr.success('Product updated successfully');
      },
      (err) => this.toastr.error(err)
    );
  }
}
