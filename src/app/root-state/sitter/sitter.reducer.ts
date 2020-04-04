import { createReducer, on } from '@ngrx/store';
import * as sitterAction from './sitter.actions';
import { Sitter, Comment } from './sitter.interfaces';

export interface SitterState {
    loading: boolean;
    success: object;
    activeSitter: Sitter;
    sitters: Sitter[];
    comments: Comment[];
    sitterCommentsId: string;
    error: Error;
  } 
 
export const initialState = {
    sitters: null,
    activeSitter: null,
    comments: null,
    sitterCommentsId: null,
    loading: true,
    success: null,
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
    /////////////////////////////////////////////////
    on(sitterAction.filterSittersByServices, (state, {services}) => ({
      sitters: state.sitters.filter(el => el.services.indexOf(services) >= 0)
    })),
    on(sitterAction.filterSittersByAnimals, (state, {animals}) => ({
      sitters: state.sitters.filter(el => el.animals.indexOf(animals) >= 0)
    })),
    on(sitterAction.filterSittersByAddress, (state, {address}) => ({
      sitters: state.sitters.filter(el => el.address === address)
    })),
    /////////////////////////////////////////////////
    on(sitterAction.deleteSitter, (state) => ({
      ...state,
      loading:true
    })),
    on(sitterAction.deleteSitterSuccess, (state, {success}) => ({
      ...state,
      success,
      loading: false
    })),
    on(sitterAction.deleteSitterFail, (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    })),
    /////////////////////////////////////////////////
    on(sitterAction.updateSitter, (state) => ({
      ...state,
      loading:true
    })),
    on(sitterAction.updateSitterSuccess, (state, {success}) => ({
      ...state,
      success,
      loading: false
    })),
    on(sitterAction.updateSitterFail, (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    })),
    /////////////////////////////////////////////////
    on(sitterAction.addComment, (state) => ({
      ...state,
      loading:true
    })),
    on(sitterAction.addCommentSuccess, (state, {success}) => ({
      ...state,
      success,
      loading: false
    })),
    on(sitterAction.addCommentFail, (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    })),
    /////////////////////////////////////////////////
    on(sitterAction.loadComments, (state) => ({
      ...state,
      loading:true
    })),
    on(sitterAction.loadCommentsSuccess, (state, {comments}) => ({
      ...state,
      comments,
      loading: false
    })),
    on(sitterAction.loadCommentsFail, (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    })),
    /////////////////////////////////////////////////
    on(sitterAction.getSitterCommentsId, (state, {id}) => ({
      ...state,
      sitterCommentsId: id,
      loading:false
    })),
);

 