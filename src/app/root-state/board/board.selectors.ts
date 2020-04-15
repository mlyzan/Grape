import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BoardState } from './board.reducer';
export const ORDER_KEY = 'order';

export const getState = createFeatureSelector<BoardState>(ORDER_KEY);

export const getOrders = createSelector(getState, (state) => state.orders);
export const getUserOrders = (id: string) => createSelector(getState, (state) => {
  if (state.orders) {
    return state.orders.filter(e => e.userId === id);
  }
  return [];
});
