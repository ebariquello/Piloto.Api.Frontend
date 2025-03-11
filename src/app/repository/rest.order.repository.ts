import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../model/order/order.model';
import { AuthenticationService } from '../service/authentication.service';

const PROTOCOL = 'http';
const PORT = '3500';

@Injectable()
export class RestOrderRepository {
  // baseURL : string = "";
  // auth_token: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService // Using this just for keep obsolete methods working
  ) {
    // this.baseURL =`${PROTOCOL}://${location.hostname}:${PORT}`;
  }

  saveOrder(order: Order): Observable<Order> {
    // return this.http.post<Order>(`${this.baseURL}/orders`, order);
    return this.http.post<Order>(`${environment.apiUrl}/orders`, order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/orders`);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(
      `${environment.apiUrl}/orders/${order.id}`,
      order
    );
  }

  // Call Delete and Passing Token without interceptor
  delelteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(
      `${environment.apiUrl}/orders/${id}`,
      this.getOptions()
    );
  }

  // Obsolete : Getting token
  private getOptions() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      return {
        headers: new HttpHeaders({
          Authorization: `Bearer ${currentUser.token}`,
        }),
      };
    }
    return null;
  }
}
