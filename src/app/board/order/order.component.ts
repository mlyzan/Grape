import { getActiveSitterById } from 'src/app/root-state/sitter/sitter.selectors';
import { addOffer } from './../../root-state/board/board.actions';
import { Store, select } from '@ngrx/store';
import { Order } from './../../root-state/board/board.interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'grape-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() order: Order;

  userId: string;

  constructor(private store: Store) {}

  onOffer(orderId: string) {
    this.store.dispatch(
      addOffer({
        orderId: orderId,
        activeSitter: this.userId,
      })
    );
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }
}
