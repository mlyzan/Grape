import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as sitterAction from './sitter.actions';
import { SitterService } from './sitter.service';
import { of } from 'rxjs';

@Injectable()
export class SitterEffects {
  createSitter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sitterAction.createSitter),
      switchMap(({ sitter }) =>
        this.sitterService.saveSitter(sitter).pipe(
          map(res => sitterAction.createSitterSuccess(res)),
          catchError(err => of(sitterAction.createSitterFail(err))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private sitterService: SitterService,
  ) {}
}
