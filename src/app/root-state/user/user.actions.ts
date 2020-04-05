import { createAction } from '@ngrx/store';
import { User } from './user.interfaces';

export const createUser = createAction(
  '[User] create user',
  (user: User) => ({user})
);
export const createUserSuccess = createAction(
  '[User] create user success',
  (userInfo: object) => ({userInfo}) 
);
export const createUserFail = createAction( 
  '[User] create user fail',
  (error: Error) => ({error})
);

//////////////////////////////
export const loginUser = createAction(
  '[User] login user',
  (credentials) => ({credentials})
);

export const loginUserSuccess = createAction(
  '[User] login user success',
  (userInfo: Object) => ({userInfo})
);

export const loginUserFail = createAction(
  '[User] logins user fail',
  (error: Error) => ({error})
);

export const userLoaded = createAction(
  '[User loaded success]',
  (userInfo: Object) => ({userInfo})
);

export const userBecomeSitter = createAction(
  '[User become sitter success]',
  () => ({isSitter: true})
)