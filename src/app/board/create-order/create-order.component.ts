import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  createOrder,
  loadOrders,
} from 'src/app/root-state/board/board.actions';
import { BoardService } from './../../root-state/board/board.service';

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

  userId: any

  constructor(
    public orderService: BoardService,
    private store: Store,
    private router: Router
  ) {}

  submit() {
    this.store.dispatch(
      createOrder({
        ...this.orderInfo.value,
        userId: this.userId
      })
    );
    setTimeout(() => {
      this.store.dispatch(loadOrders());
    }, 1500);
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }
}
