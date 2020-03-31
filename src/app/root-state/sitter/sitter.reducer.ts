import { createReducer, on } from '@ngrx/store';
import * as sitterAction from './sitter.actions';
import { Sitter } from './sitter.interfaces';

export interface SitterState {
    loading: boolean;
    activeSitter: Sitter;
    sitters: Sitter[];
    error: Error;
  } 
 
export const initialState = {
    sitters: null,
    activeSitter: null,
    loading: true,
    error: null
}

export const sitterReducer = createReducer(
    initialState,
    
    on(sitterAction.createSitter, (state, activeSitter) => ({
      ...state,
      activeSitter
    })),
    on(sitterAction.createSitterSuccess, (state, {activeSitter} ) => ({
      ...state,
      activeSitter,
      loading: false
    })),
    on(sitterAction.createSitterFail, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),
    /////////////////////////////////////////////////
    on(sitterAction.loadSitters, (state) => ({
      ...state,
      sitters: null,
      loading:true
    })),
    on(sitterAction.loadSittersSuccess, (state, {sitters}) => ({
      ...state,
      sitters,
      loading: false
    })),
    on(sitterAction.loadSittersFail, (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    }))
);

 