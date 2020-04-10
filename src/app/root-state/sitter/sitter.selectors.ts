import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SitterState } from './sitter.reducer';
export const SITTER_KEY = 'sitter';

export const getState = createFeatureSelector<SitterState>(SITTER_KEY);

export const getSitter = createSelector(getState, state => state.activeSitter);
export const getSitters = createSelector(getState, state => state.sitters);
export const getLoading = createSelector(getState, state => state.loading);
export const getError = createSelector(getState, state => state.error);
export const getSuccess = createSelector(getState, state => state.success);
export const getAllSitters = createSelector(getState, state => state.filtered);

export const getActiveSitterById = (id: string) => createSelector(getState, state => state.sitters.find(sitter => sitter.userId === id)); 
export const getCommentsById = (id: string) => createSelector(getState, state => state.comments.filter(comment => comment.userId === id));
export const getCurrentSitterCommentsId = createSelector(getState, state => state.sitterCommentsId);

export const getBookById = (id: string) => createSelector(getState, state => state.books.find(book => book.userId === id && !book.isComplete));
export const getCompleteBooksById = (id: string) => createSelector(getState, state => state.books.filter(book => book.userId === id && book.isComplete));