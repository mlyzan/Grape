import { createReducer, on } from '@ngrx/store';
import * as sitterAction from './sitter.actions';
import { Sitter } from './sitter.interfaces';
import { User } from '../../user/user.model';

export interface SitterState {
    //userInfo: {userId: string, userName: string, userEmail: string},
    loading: boolean;
    activeSitter: Sitter;
    sitters: Sitter[];
    error: Error;
  } 
 
export const initialState = {
    //userInfo: {userId: null, userName: null, userEmail: null},
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
    })),
    /////
    on(sitterAction.filterSittersByServices, (state, {services}) => ({
      sitters: state.sitters.filter(el => el.services.indexOf(services) >= 0)
    })),
    on(sitterAction.filterSittersByAnimals, (state, {animals}) => ({
      sitters: state.sitters.filter(el => el.animals.indexOf(animals) >= 0)
    })),
    on(sitterAction.filterSittersByAddress, (state, {address}) => ({
      sitters: state.sitters.filter(el => el.address === address)
    }))
);

 