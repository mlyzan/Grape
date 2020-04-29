import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
export const USER_KEY = 'user';

export const getUserState = createFeatureSelector<UserState>(USER_KEY);

export const getUserInfo = createSelector(getUserState, state => state.userInfo);

export const getActiveId = createSelector(getUserState, state => state.userInfo.userId);

export const getActiveName = createSelector(getUserState, state => state.userInfo.userName);
export const getUpdateInfo = createSelector(getUserState, state => state.userInfo.updateInfo);
