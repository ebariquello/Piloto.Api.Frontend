import { Order } from './../../model/order/order.model';
import { CartService } from './../../service/cart.service';
import { OrderService } from './../../service/order.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  orderSent = false;
  submitted = false;
  constructor(
    private orderService: OrderService,
    public order: Order
  ) {}

  ngOnInit(): void {}

  public submitOrder(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.orderService.saveOrder(this.order).subscribe(order => {
          this.orderService.clearOrder(this.order);
          this.orderSent = true;
          this.submitted = false;
      });
    }
  }
}
