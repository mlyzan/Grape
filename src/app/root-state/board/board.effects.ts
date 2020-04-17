import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BoardService } from './board.service';
import * as boardAction from './board.actions';
import { NotificationSnackBarMessage } from '../../notification-snack-bar/notification-snack-bar-message';

@Injectable()
export class BoardEffects {
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardAction.createOrder),
      switchMap(({ order }) =>
        this.boardService.createOrder(order).pipe(
          map((res) => boardAction.createOrderSuccess(res)),
          catchError((error) => of(boardAction.createOrderFail(error)))
        )
      )
    )
  );

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardAction.loadOrders),
      switchMap(() =>
        this.boardService.getOrders().pipe(
          map((res) => boardAction.loadOrdersSuccess(res)),
          catchError((error) => of(boardAction.loadOrdersFail(error)))
        )
      )
    )
  );

  addOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardAction.addOffer),
      switchMap(({ orderId, activeSitter }) =>
        this.boardService.addOffer(orderId, activeSitter).pipe(
          map((res) => boardAction.addOfferSuccess(res)),
          catchError((error) => of(boardAction.addOfferFail(error)))
        )
      )
    )
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardAction.deleteOrder),
      switchMap(({id}) =>
          this.boardService.deleteOrder(id).pipe(
            tap(() => this._NSBM.showSuccess('Order was successfully deleted')),
            map(res => boardAction.deleteOrderSuccess(res)),
            catchError(error => { 
              this._NSBM.showError('Error! Can`t delete an order');
              return of(boardAction.deleteOrderFail(error))})
          ),
      ),
    )
  );

  removeOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardAction.removeOffer),
      switchMap(({id, sitterId}) =>
          this.boardService.removeOffer(id, sitterId).pipe(
            tap(() => this._NSBM.showSuccess('Offer successfully removed')),
            map(res => boardAction.removeOfferSuccess(res)),
            catchError(error => { 
              this._NSBM.showError('Error! Can`t remove an offer');
              return of(boardAction.deleteOrderFail(error))})
          ),
      ),
    )
  );

  constructor(
    private actions$: Actions, 
    private boardService: BoardService,
    private _NSBM: NotificationSnackBarMessage) {}
}
