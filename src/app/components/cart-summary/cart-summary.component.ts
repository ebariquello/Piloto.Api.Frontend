import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Cart } from 'src/app/model/cart/cart.model';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  userCart: Cart;

  constructor(private cartService: CartService) {
    this.userCart = this.cartService.currentCartInstance;
  }

  ngOnInit(): void {}
}
