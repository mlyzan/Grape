import { createAction, props } from '@ngrx/store';
import { Sitter } from './sitter.interfaces';
import { User } from '../../user/user.model';

//////////////////////////////////////////
export const createSitter = createAction(
    '[Sitter] create sitter',
    (activeSitter: Sitter) => ({activeSitter})
)

export const createSitterSuccess = createAction(
    '[Sitter] create sitter success',
    (activeSitter: Sitter) => ({ activeSitter }),
);

export const createSitterFail = createAction(
    '[Sitter] create sitter fail',
    (error: Error) => ({ error }),
); 

/////////////////////////////////////////
export const loadSitters = createAction(
    '[Sitter] load sitters'
)

export const loadSittersSuccess = createAction(
    '[Sitter] load sitters success',
    (sitters: Sitter[]) => ( {sitters} ),
);

export const loadSittersFail = createAction(
    '[Sitter] load sitter fail',
    (error: Error) => ({ error }),
); 

/////
export const filterSittersByServices = createAction(
    '[Sitter] load filtered sitters by services',
    props<{services: string}>() 
);
export const filterSittersByAnimals = createAction(
    '[Sitter] load filtered sitters by animals',
    props<{animals: string}>() 
); 
export const filterSittersByAddress = createAction(
    '[Sitter] load filtered sitters by address',
    props<{address:string}>() 
);