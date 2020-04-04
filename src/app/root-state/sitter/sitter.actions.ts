import { createAction, props } from '@ngrx/store';
import { Sitter, Comment } from './sitter.interfaces';

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
/////////////////////////////////////////
export const updateSitter = createAction(
    '[Sitter] update sitter',
    (id: string, sitter: object) => ( {id, sitter} ),
)

export const updateSitterSuccess = createAction(
    '[Sitter] update sitter success',
    (success: object) => ( {success} )
);

export const updateSitterFail = createAction(
    '[Sitter] update sitter fail',
    (error: Error) => ({ error }),
);
/////////////////////////////////////////
export const addComment = createAction(
    '[Sitter] add comment',
    (comment: object) => ( {comment} ),
)

export const addCommentSuccess = createAction(
    '[Sitter] add comment success',
    (success: object) => ( {success} )
);

export const addCommentFail = createAction(
    '[Sitter] add comment fail',
    (error: Error) => ({ error }),
);
/////////////////////////////////////////
export const loadComments = createAction(
    '[Sitter] load comments'
)

export const loadCommentsSuccess = createAction(
    '[Sitter] load comments success',
    (comments: Comment[]) => ( {comments} )
);

export const loadCommentsFail = createAction(
    '[Sitter] load comments fail',
    (error: Error) => ({ error }),
);
////////////////////////////////////////
export const getSitterCommentsId = createAction(
    '[Sitter] get sitter comments id',
    (id: string) => ({id})
);