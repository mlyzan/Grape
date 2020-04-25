import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getUserInfo } from './../root-state/user/user.selectors';
import { loadSitters } from 'src/app/root-state/sitter/sitter.actions';
import { getOrders } from './../root-state/board/board.selectors';
import { Order } from './../root-state/board/board.interfaces';
import { loadOrders } from '../root-state/board/board.actions';
import {MatSidenavContainer} from '@angular/material/sidenav';

@Component({
  selector: 'grape-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  orders$: Observable<Order[]>;
  showFiller = false;
  userInfo: any;
  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadSitters());
    setTimeout(() => {
      this.store.dispatch(loadOrders());
    }, 1500);

    this.orders$ = this.store.select(getOrders);

    this.subscriptions.push(
      this.store
        .pipe(select(getUserInfo))
        .subscribe((userInfo) => (this.userInfo = userInfo))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  close() {
    this.sidenavContainer.start.toggle();
  }
}
