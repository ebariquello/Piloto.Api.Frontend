import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/internal/Subject';
import { finalize } from 'rxjs/operators';
import {
  BaseRowEventModel,
  BaseTableModel,
} from 'app/shared/models/base.model';
import { ProductService } from 'app/core/services/product/product.service';
import { checkErrorMessage } from 'app/core/helpers/toaster-error.helper';
import { ProductModel } from 'app/core/services/product/product.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  gridHeaders = ['Name', 'Stock', 'Price', 'Id', 'Actions'];
  gridRows = ['name', 'stock', 'price', 'id'];
  gridActions = [
    { title: 'Edit' },
    { iconName: 'icon_excluir', title: 'Delete' },
  ];

  gridData: ProductModel[] = [];
  gridData$ = new Subject<ProductModel[]>();

  gridLoading: boolean = false;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  productTableActions(event: BaseRowEventModel) {
    if (event) {
      const productAux = event.Row as ProductModel;
      if (event.ActionIndex === 0) {
        this.router.navigate(['products/edit/', productAux.id]);
      } else {
        this.gridData = this.gridData.filter(
          (data) => data.id !== productAux.id
        );
        this.gridData$.next(this.gridData);
      }
    }
  }

  getProducts(): void {
    this.gridLoading = true;

    this.productService
      .getAll()
      .pipe(finalize(() => (this.gridLoading = false)))
      .subscribe(
        (products) => {
          //checkErrorMessage(this.toastr, parameters.ErrorDetail);

          if (products && products.length > 0) {
            products.forEach((product) => this.gridData.push(product));
            this.gridData$.next(this.gridData);
          }
        },
        (err) => this.toastr.error(err)
      );
  }
}
