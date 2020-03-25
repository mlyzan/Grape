import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SitterState } from './sitter.reducer';
export const SITTER_KEY = 'sitter';

export const getState = createFeatureSelector<SitterState>(SITTER_KEY);

export const getSitter = createSelector(getState, state => state.sitter);
export const getLoading = createSelector(getState, state => state.loading);
