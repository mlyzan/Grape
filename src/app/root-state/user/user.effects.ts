import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';
import * as userAction from './user.actions';

@Injectable()
export class UserEffects {
  createUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(userAction.createUser),
      switchMap(({user}) => 
        this.userService.registerUser(user).pipe(
          map((res: any) => {
            localStorage.setItem('userId', res.userId);
            return userAction.createUserSuccess(res);
          }),
          catchError(error => of(userAction.createUserFail(error)))
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
            map((res) => userAction.loginUserSuccess(res)),
            catchError(error => of(userAction.loginUserFail(error)))
          ),
        ),
      )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

}