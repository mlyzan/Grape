import { createAction } from '@ngrx/store';
import { Sitter } from './sitter.interfaces';

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

/////////////////////////////////////////
export const deleteSitter = createAction(
    '[Sitter] delete sitter',
    (id: string) => ( {id} ),
)

export const deleteSitterSuccess = createAction(
    '[Sitter] delete sitter success',
    (success: object) => ( {success} ),
);

export const deleteSitterFail = createAction(
    '[Sitter] delete sitter fail',
    (error: Error) => ({ error }),
); 