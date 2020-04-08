import { createReducer, on } from '@ngrx/store';
import * as userAction from './user.actions';

export interface UserState {
  userInfo: {userId: string, userName: string, userEmail: string, isSitter?: boolean},
  loading: boolean;
  error: Error; 
} 

export const initialState = {
  userInfo: {userId: null, userName: null, userEmail: null, isSitter: null},
  loading: true,
  error: null
}


export const userReducer = createReducer(
  initialState,
  on(userAction.createUserSuccess, (state, { userInfo }) => ({
    ...state,
    userInfo,
    loading: false,
    error: null
  })),
  on(userAction.createUserFail, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  /////////////////////////////////////////////

  on(userAction.loginUserSuccess, (state, { userInfo }) => ({
    ...state,
    userInfo,
    loading: false,
    error: null
  })),
  on(userAction.loginUserFail, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(userAction.userLoaded, (state, { userInfo }) => ({
    ...state,
    userInfo
  })),
  on(userAction.userBecomeSitter, (state, { isSitter }) => ({
    ...state,
    userInfo: {...state.userInfo, isSitter}
  })),
)