import { RestOrderRepository } from './../repository/rest.order.repository';
import { Observable } from 'rxjs';
// import { StaticOrderRepository } from './../repository/static.order.repository';

import { Order } from './../model/order/order.model';
import { CartService } from './cart.service';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {
  private loaded = false;
  private orders: Order[] = [];

  constructor(
    // private orderRepository: StaticOrderRepository,
    private orderRepository: RestOrderRepository,
    private cartService: CartService
  ) {}

  loadOrders() {
    this.loaded = true;
    this.orderRepository.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  getOrders(): Order[] {
    if (!this.loaded) {
      return this.orders;
    }
  }

  clearOrder(order: Order): Order {
    order.id = null;
    order.name = order.address = order.address = null;
    order.city = order.state = order.zip = null;
    order.shipped = false;
    this.cartService.clear();
    return order;
  }

  saveOrder(order: Order): Observable<Order> {
    return this.orderRepository.saveOrder(order);
  }

  updateOrder(order: Order) {
    this.orderRepository.updateOrder(order).subscribe((orderAux) => {
      this.orders.splice(
        this.orders.findIndex((o) => o.id === orderAux.id),
        1,
        orderAux
      );
    });
  }
  deleteOrder(id: number) {
    this.orderRepository.delelteOrder(id).subscribe((orderAux) => {
      this.orders.splice(
        this.orders.findIndex((o) => o.id === orderAux.id),
        1
      );
    });
  }
}
