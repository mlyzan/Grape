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
    filtered: any;
  } 
 
export const initialState = {
    sitters: null,
    activeSitter: null,
    comments: null,
    sitterCommentsId: null,
    loading: false,
    success: null,
    error: null,
    filtered: null
}

export const sitterReducer = createReducer(
    initialState,
    
    on(sitterAction.createSitter, (state, activeSitter) => ({
      ...state,
      activeSitter,
      loading: true
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
      loading: false,
      filtered: sitters
    })),
    on(sitterAction.loadSittersFail, (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    })),
    /////////////////////////////////////////////////
    on(sitterAction.refreshFilteredSitters, state => ({
      ...state,
      filtered: state.sitters,
    })),
    on(sitterAction.filterSittersByServices, (state, {services}) => ({
      ...state,
      filtered: state.filtered.filter(el => el.services.indexOf(services) >= 0)
    })),
    on(sitterAction.filterSittersByAnimals, (state, {animals}) => ({
      ...state,
      filtered: state.filtered.filter(el => el.animals.indexOf(animals) >= 0)
    })),
    on(sitterAction.filterSittersByAddress, (state, {address}) => ({
      ...state,
      filtered: state.filtered.filter(el => el.address.indexOf(address) >= 0)
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
    on(sitterAction.updateSitterRate, (state, payload) => ({
      ...state,
      loading: true
    })),
    on(sitterAction.updateSitterRateSuccess, (state, {id, rate}) => {
      let sitter: Sitter, sitters = [...state.sitters], index = sitters.findIndex(e => e.userId === id);
        sitter = {...sitters.find(e => e.userId === id)};
        sitter.rate = rate;
        sitters.splice(index, 1, sitter);
      let sitterFiltered: Sitter, filtered = [...state.filtered], indexFiltered = filtered.findIndex(e => e.userId === id);
        sitterFiltered = {...filtered.find(e => e.userId === id)};
        sitterFiltered.rate = rate;
        filtered.splice(indexFiltered, 1, sitter);
      return {
        ...state,
        loading: false,
        sitters,
        filtered
      }
    }),
);

 