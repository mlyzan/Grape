import { Order } from './board.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoardService {
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/api/order', order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3000/api/order');
  }

  addOffer(id: string, activeSitter: string): Observable<Order> {
    return this.http.put<Order>(`http://localhost:3000/api/order/${id}`, {sitter: activeSitter});
  }
}
