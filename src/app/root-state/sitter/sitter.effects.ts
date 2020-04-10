import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createSitter } from './sitter.actions';
import { SitterService } from './sitter.service';
import { of } from 'rxjs';
import * as sitterAction from './sitter.actions';
import { NotificationSnackBarMessage } from '../../notification-snack-bar/notification-snack-bar-message';


@Injectable()
export class SitterEffects { 

  createSitter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSitter),
      switchMap(( {activeSitter} ) =>
          this.sitterService.saveSitter(activeSitter).pipe(
            tap(() => this._NSBM.showSuccess('Profile successfully created')),
          map((res) =>  sitterAction.createSitterSuccess(res)),
          catchError(error => {
            this._NSBM.showError('Something went wrong, try again later')
            return of(sitterAction.createSitterFail(error))
          })
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

  deleteSitter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sitterAction.deleteSitter),
      switchMap(({id}) =>
          this.sitterService.deleteSitter(id).pipe(
            tap(() => this._NSBM.showSuccess('Profile successfully deleted')),
          map(res => sitterAction.deleteSitterSuccess(res)),
          catchError(error => {
            this._NSBM.showError('Something went wrong, profile was not deleted, try again later')
            return of(sitterAction.deleteSitterFail(error))
          })
          ),
      ),
    )
  );

  updateSitter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sitterAction.updateSitter),
      switchMap(({id, sitter}) =>
          this.sitterService.updateSitter(id, sitter).pipe(
            tap(() =>
              this._NSBM.showSuccess('Profile successfully updated')
            ),
            map(res => sitterAction.updateSitterSuccess(res)),
            catchError(error => {
              this._NSBM.showError('Something went wrong, profile was not updated, try again later')
              return of(sitterAction.updateSitterFail(error))
            })
          ),
      ),
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sitterAction.addComment),
      switchMap(({comment}) =>
          this.sitterService.addComment(comment).pipe(
            tap(() => this._NSBM.showSuccess('Comment successfully added')),
            map(res => sitterAction.addCommentSuccess(res)),
            catchError(error => {
              this._NSBM.showError('Something went wrong, comment was not sent, try again later')
              return of(sitterAction.addCommentFail(error))
            })
          ),
      ),
    )
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sitterAction.loadComments),
      switchMap(() =>
          this.sitterService.getComments().pipe(
          map(res => sitterAction.loadCommentsSuccess(res)),
          catchError(error => of(sitterAction.loadCommentsFail(error)))
          ),
      ),
    )
  );

  updateSitterRate = createEffect(() => 
    this.actions$.pipe(
      ofType(sitterAction.updateSitterRate),
      switchMap(({id, rate}) => 
        this.sitterService.updateSitterRate(id, rate).pipe(
          tap(() =>
            this._NSBM.showSuccess('Rate successfully saved')
          ),
          map(res => sitterAction.updateSitterRateSuccess(id, res.rate)),
          catchError(err => {
            this._NSBM.showError('Something went wrong, rate was not saved, try again later')
            return of(sitterAction.updateSitterRateFail(err))
          })
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sitterAction.addBook),
      switchMap(({book}) =>
          this.sitterService.addBook(book).pipe(
            tap(() => this._NSBM.showSuccess('Book request successfully sended. Wait for confirmation')),
            map(res => sitterAction.addBookSuccess(res)),
            catchError(error => {
              this._NSBM.showError('Error in book request. Try again later'); 
              return of(sitterAction.addBookFail(error))
            })
          ),
      ),
    )
  );

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sitterAction.loadBooks),
      switchMap(() =>
          this.sitterService.getBooks().pipe(
          map(res => sitterAction.loadBooksSuccess(res)),
          catchError(error => of(sitterAction.loadBooksFail(error)))
          ),
      ),
    )
  );

  updateBookStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sitterAction.updateBookStatus),
      switchMap(({id, status}) =>
          this.sitterService.updateBookStatus(id, status).pipe(
            tap(() => this._NSBM.showSuccess('Status successfully updated')),
            map(res => sitterAction.updateBookStatusSuccess(res)),
            catchError(error => {
              this._NSBM.showError('Error in Status Update'); 
              return of(sitterAction.updateBookStatusFail(error))})
          ),
      ),
    )
  );

  declineBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sitterAction.declineBook),
      switchMap(({id}) =>
          this.sitterService.declineBook(id).pipe(
            tap(() => this._NSBM.showSuccess('Request was successfully decline')),
            map(res => sitterAction.declineBookSuccess(res)),
            catchError(error => { 
              this._NSBM.showError('Error in request decline');
              return of(sitterAction.declineBookFail(error))})
          ),
      ),
    )
  );

  constructor(
    private actions$: Actions,
    private sitterService: SitterService,
    private _NSBM: NotificationSnackBarMessage
  ) {}
} 