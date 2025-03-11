import { isNumber } from 'util';
import { Product } from '../product/product.model';

export class Cartline {
    constructor(public product: Product, public quantity: number) { }
    getLineTotal() {
        return (this.quantity *
            (this.product.price != null && typeof(this.product.price) === 'number'
                ? this.product.price
                : 0));
    }
}
