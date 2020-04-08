import { createAction } from '@ngrx/store';
import { Order } from './board.interfaces';

export const createOrder = createAction(
  '[Board] create order',
  (order: Order) => ({ order })
);
export const createOrderSuccess = createAction(
  '[Board] create order success',
  (success: object) => ({ success })
);
export const createOrderFail = createAction(
  '[Board] create order fail',
  (error: Error) => ({ error })
);

export const loadOrders = createAction(
  '[Board] load orders'
);
export const loadOrdersSuccess = createAction(
  '[Board] load orders success',
  (orders: Order[]) => ({ orders })
);
export const loadOrdersFail = createAction(
  '[Board] load orders fail',
  (error: Error) => ({ error })
);
