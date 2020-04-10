import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';
import * as userAction from './user.actions';
import { NotificationSnackBarMessage } from '../../notification-snack-bar/notification-snack-bar-message';

@Injectable()
export class UserEffects {
  createUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(userAction.createUser),
      switchMap(({user}) => 
        this.userService.registerUser(user).pipe(
          tap(() => this._NSBM.showSuccess('You successfully registered')),
          map((res: any) => {
            localStorage.setItem('userId', res.userId);
            return userAction.createUserSuccess(res);
          }),
          catchError(error => {
            this._NSBM.showError('Something has gone wrong, try again')
            return of(userAction.createUserFail(error))
          })
        ),
      ),
    )  
  );
////////////////////////////////////////////////////

  loginUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(userAction.loginUser),
        switchMap(({credentials}) => 
          this.userService.loginUser(credentials).pipe(
            tap(() => this._NSBM.showSuccess('Login is successful')),
            map((res) => userAction.loginUserSuccess(res)),
            catchError(error => {
              console.log(error.error)
              this._NSBM.showError(error.error.message)
              return of(userAction.loginUserFail(error))
            })
          ),
        ),
      )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private _NSBM: NotificationSnackBarMessage
  ) {}

}