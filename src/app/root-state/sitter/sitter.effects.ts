import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { createSitter } from './sitter.actions';
import { SitterService } from './sitter.service';
import { UserService } from '../../user/user.service';
import { of } from 'rxjs';
import * as sitterAction from './sitter.actions';

@Injectable()
export class SitterEffects { 

  createSitter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSitter),
      switchMap(( {activeSitter} ) =>
          this.sitterService.saveSitter(activeSitter).pipe(
          map((res) => sitterAction.createSitterSuccess(res)),
          catchError(error => of(sitterAction.createSitterFail(error)))
          ),
      ),
    )
  );

  loadSitters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sitterAction.loadSitters),
      switchMap(() =>
          this.sitterService.getSitters().pipe(
          map(res => sitterAction.loadSittersSuccess(res)),
          catchError(error => of(sitterAction.loadSittersFail(error)))
          ),
      ),
    )
  );

  constructor(
    private actions$: Actions,
    private sitterService: SitterService
  ) {}
} 