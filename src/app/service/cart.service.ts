import { Cart } from './../model/cart/cart.model';
import { Injectable } from '@angular/core';
import { Cartline } from '../model/cart/cart.line.model';
import { Product } from '../model/product/product.model';

@Injectable()
export class CartService {
  constructor(private cart: Cart) {}

  get currentCartInstance(): Cart {
    return this.cart;
  }

  addLine(product: Product, quantity: number = 1): Cart {
    const line = this.cart.lines.find((item) => item.product.id === product.id);

    if (line !== undefined) {
      line.quantity += quantity;
    } else {
      const newLine = new Cartline(product, quantity);
      this.cart.lines.push(newLine);
    }
    this.recalculate();
    return this.cart;
  }
  updateQuantity(product: Product, quantity: number): Cart {
    const line = this.cart.lines.find(
      (lineAux) => lineAux.product.id === product.id
    );

    if (line !== undefined) {
      line.quantity = Number(quantity);
    }
    this.recalculate();
    return this.cart;
  }
  removeLine(id: number): Cart {
    const lineIndex = this.cart.lines.findIndex(
      (lineAux) => lineAux.product.id === id
    );
    if (lineIndex !== undefined) {
      this.cart.lines.splice(lineIndex, 1);
    }
    this.recalculate();
    return this.cart;
  }
  clear() {
    this.cart.lines = [];
    this.cart.itemCount = 0;
    this.cart.cartPrice = 0;
    return this.cart;
  }
  private recalculate() {
    this.cart.itemCount = 0;
    this.cart.cartPrice = 0;
    this.cart.lines.forEach((line) => {
      this.cart.cartPrice += line.getLineTotal();
      this.cart.itemCount += line.quantity;
    });
  }
}
