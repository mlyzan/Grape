import { createReducer, on } from '@ngrx/store';
import * as sitterAction from './sitter.actions';
import { Sitter } from './sitter.interfaces';

export interface SitterState {
    loading: boolean;
    sitter: Sitter;
    error: Error;
  }

export const initialState = {
    sitter: null,
    loading: true,
    error: null
}

export const sitterReducer = createReducer(
    initialState,
    on(sitterAction.createSitter, (state, sitter) => ({
      ...state,
      sitter
    })),
    on(sitterAction.createSitterSuccess, (state, { sitter }) => ({
        ...state,
        sitter,
        loading: false
    })),
    on(sitterAction.createSitterFail, (state, { error }) => ({
    ...state,
    loading: false,
    error
    }))
);

