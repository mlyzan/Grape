import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getUserInfo } from './../root-state/user/user.selectors';
import { loadSitters } from 'src/app/root-state/sitter/sitter.actions';
import { getOrders } from './../root-state/board/board.selectors';
import { Order } from './../root-state/board/board.interfaces';
import { loadOrders } from '../root-state/board/board.actions';

@Component({
  selector: 'grape-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  orders$: Observable<Order[]>;
  showFiller = false;
  userInfo: any;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadSitters());
    setTimeout(() => {
      this.store.dispatch(loadOrders());
    }, 1500);

    this.orders$ = this.store.select(getOrders);

    this.store
      .pipe(select(getUserInfo))
      .subscribe((userInfo) => (this.userInfo = userInfo));
  }
}
