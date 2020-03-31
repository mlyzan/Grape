import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SitterState } from './sitter.reducer';
import { UserState } from '../user/user.reducer';
export const SITTER_KEY = 'sitter';

export const getState = createFeatureSelector<SitterState>(SITTER_KEY);

export const getSitter = createSelector(getState, state => state.activeSitter);
export const getSitters = createSelector(getState, state => state.sitters);
export const getLoading = createSelector(getState, state => state.loading);

export const getActiveSitterById = (id: string) => createSelector(getState, state => state.sitters.find(sitter => sitter.userId === id)); 