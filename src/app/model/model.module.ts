import { Cart } from './cart/cart.model';
import { NgModule } from '@angular/core';
import { Order } from './order/order.model';


@NgModule({
    providers: [
        Cart,
        Order
    ]
})
export class ModelModule { }

