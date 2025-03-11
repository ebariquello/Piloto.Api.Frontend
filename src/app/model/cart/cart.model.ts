import { Cartline } from './cart.line.model';
import { Injectable } from '@angular/core';

@Injectable()
export class Cart {
  public lines: Cartline[] = [];
  public itemCount = 0;
  public cartPrice = 0;
}
