import { NotificationSnackBarMessage } from './../../notification-snack-bar/notification-snack-bar-message';
import { getUserInfo } from './../../root-state/user/user.selectors';
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
  userInfo: any;

  constructor(
    private store: Store,
    private _NSBM: NotificationSnackBarMessage
  ) {}

  onOffer(orderId: string) {
    this.store.dispatch(
      addOffer({
        orderId: orderId,
        activeSitter: this.userId,
      })
    );
    this._NSBM.showSuccess('Offer has been send');
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');

    this.store
      .pipe(select(getUserInfo))
      .subscribe((userInfo) => (this.userInfo = userInfo));
  }
}
