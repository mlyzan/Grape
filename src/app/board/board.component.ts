import { loadSitters } from 'src/app/root-state/sitter/sitter.actions';
import { getOrders } from './../root-state/board/board.selectors';
import { Order } from './../root-state/board/board.interfaces';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadOrders } from '../root-state/board/board.actions';

@Component({
  selector: 'grape-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  orders$: Observable<Order[]>;
  showFiller = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadSitters());
    setTimeout(() => {
      this.store.dispatch(loadOrders());
    }, 1500);

    this.orders$ = this.store.select(getOrders);
  }
}
