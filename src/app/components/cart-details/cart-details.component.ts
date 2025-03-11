import { Cart } from '../../model/cart/cart.model';

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Product } from 'src/app/model/product/product.model';

@Component({
  templateUrl: './cart-details.component.html',
})
export class CartDetailsComponent implements OnInit {
  userCart: Cart;

  constructor(private cartService: CartService) {
    this.userCart = this.cartService.currentCartInstance;
  }

  ngOnInit(): void {}

  removeProductFromCart(id: number) {
    this.userCart = this.cartService.removeLine(id);
  }
  updateProductQuantityOnCart(product: Product, quantity: number) {
    this.userCart = this.cartService.updateQuantity(product, quantity);
  }
}
