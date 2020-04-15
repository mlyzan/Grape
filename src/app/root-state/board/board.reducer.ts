import { createReducer, on } from '@ngrx/store';
import * as boardAction from './board.actions';
import { Order } from './board.interfaces';

export interface BoardState {
  loading: boolean;
  success: object;
  orders: Order[];
  error: Error;
}

export const initialState = {
  orders: null,
  loading: false,
  success: null,
  error: null,
};

export const boardReducer = createReducer(
  initialState,

  on(boardAction.createOrderSuccess, (state, { success }) => ({
    ...state,
    success,
    loading: false,
  })),
  on(boardAction.createOrderFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(boardAction.loadOrders, (state) => ({
    ...state,
    loading: true,
  })),
  on(boardAction.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders: orders,
    loading: false,
  })),
  on(boardAction.loadOrdersFail, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(boardAction.addOffer, (state, { activeSitter, orderId }) => ({
    ...state
  })),
  on(boardAction.addOfferSuccess, (state, { success }) => ({
    ...state,
    success,
    loading: false,
  })),
  on(boardAction.addOfferFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
