import { Order } from './../../root-state/board/board.interfaces';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'grape-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  @Input() order: Order

}
