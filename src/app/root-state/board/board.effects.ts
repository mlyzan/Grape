import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BoardService } from './board.service';
import * as boardAction from './board.actions';

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

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
