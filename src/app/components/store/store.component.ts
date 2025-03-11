import { ProductService } from '../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Product } from '../../model/product/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  public selectedCategory: string = null;
  public productsPerPage = 4;
  public selectedPage = 1;

  constructor(
    private producservice: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get products(): Product[] {
    const pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.producservice
      .getProducts()
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }
  // get categories(): string[] {
  //   return this.producservice.getCategories();
  // }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
    this.changePage(1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }
  changePageSize(newPageSize: number) {
    this.productsPerPage = Number(newPageSize);
    this.changePage(1);
  }
  get pageNumbers(): number[] {
    // return Array(
    //   Math.ceil(
    //     this.producRepository.getProducts(this.selectedCategory).length / this.productsPerPage)
    //     ).fill(0).map((x, i)=> i +1);
    const pagesCount: number =
      this.producservice.getProducts().length / this.productsPerPage;
    const pagesNumsArray: number[] = [];
    for (let index = 0; index < pagesCount; index++) {
      pagesNumsArray.push(index + 1);
    }
    return pagesNumsArray;
  }

  addProductToCart(product: Product) {
    this.cartService.addLine(product);
    this.router.navigateByUrl('/cart');
  }
}
