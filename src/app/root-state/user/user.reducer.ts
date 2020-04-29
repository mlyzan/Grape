import { createReducer, on } from '@ngrx/store';
import * as userAction from './user.actions';
import { UpdateInfo } from './user.interfaces';

export interface UserState {
  userInfo: {userId: string, userName: string, userEmail: string, isSitter?: boolean, updateInfo: UpdateInfo},
  loading: boolean;
  error: Error;
}

export const initialState = {
  userInfo: {userId: '', userName: '', userEmail: '', isSitter: null,
    updateInfo: {
      animals: [],
      years: '',
      address: '',
      photo: ''
    }
    },
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
  on(userAction.updateProfile, (state, payload) => ({
    ...state,
    loading: true
  })),
  on(userAction.updateProfileSuccess, (state, {response}) => ({
    ...state,
    loading: false,
    userInfo: {
      ...state.userInfo,
      updateInfo: response.updateInfo
    }
  })),
  on(userAction.updateProfileFail, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),
)
