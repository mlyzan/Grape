import { createReducer, on } from '@ngrx/store';

import * as sitterAction from './sitter.actions';
import { Sitter } from './sitter.interfaces';

export interface SitterState {
  loading: boolean;
  sitter: Sitter;
  error: Error;
}

const initialState: SitterState = {
  loading: false,
  sitter: null,
  error: null,
};

export const sitterReducer = createReducer(
  initialState,
  on(sitterAction.createSitter, state => ({
    ...state,
    loading: true,
  })),
  on(sitterAction.createSitterSuccess, (state, { sitter }) => ({
    ...state,
    sitter,
    loading: false,
  })),
  on(sitterAction.createSitterFail, (state, { err }) => ({
    ...state,
    loading: false,
    error: err,
  })),
);
