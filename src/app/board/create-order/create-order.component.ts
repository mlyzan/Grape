import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NotificationSnackBarMessage } from './../../notification-snack-bar/notification-snack-bar-message';

import {
  createOrder,
  loadOrders,
} from 'src/app/root-state/board/board.actions';
import { BoardService } from './../../root-state/board/board.service';
import { CITIES } from '../../cities';

@Component({
  selector: 'grape-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  orderInfo = new FormGroup({
    title: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
    pet: new FormControl('', Validators.required),
    services: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });
  cities: string[];
  userId: any;
  search = '';

  constructor(
    public orderService: BoardService,
    private store: Store,
    private router: Router,
    private _NSBM: NotificationSnackBarMessage
  ) {}

  submit() {
    if (
      this.orderInfo.value.title === '' ||
      this.orderInfo.value.info === '' ||
      this.orderInfo.value.pet === '' ||
      this.orderInfo.value.services === '' ||
      this.orderInfo.value.city === ''
    ) {
      this._NSBM.showError('Please, fill in all fields');
    } else {
      this.store.dispatch(
        createOrder({
          ...this.orderInfo.value,
          userId: this.userId,
        })
      );
      this._NSBM.showSuccess('Order has been created');
      setTimeout(() => {
        this.router.navigate(['profile']);
      }, 2000);
    }
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.cities = CITIES;
  }
}
