import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createOrder } from 'src/app/root-state/board/board.actions';
import { BoardService } from './../../root-state/board/board.service';

@Component({
  selector: 'grape-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent {
  orderInfo = new FormGroup({
    title: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
    pet: new FormControl('', Validators.required),
    services: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  constructor(public orderService: BoardService, private store: Store) {}

  submit() {
    this.store.dispatch(
      createOrder({
        ...this.orderInfo.value,
      })
    );
  }
}
