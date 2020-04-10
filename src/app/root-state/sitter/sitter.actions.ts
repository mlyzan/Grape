import { createAction, props } from '@ngrx/store';
import { Sitter, Comment, Book } from './sitter.interfaces';

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
export const refreshFilteredSitters = createAction(
    '[Sitter] is refreshed'
)
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

export const updateSitterRate = createAction(
    '[Sitter] update sitter rate',
    (id: string, rate: number) => ({id, rate})
);

export const updateSitterRateSuccess = createAction(
    '[Sitter] update sitter rate success',
    (id: string, rate: number) => ({id, rate})
);

export const updateSitterRateFail = createAction(
    '[Sitter] update sitter rate fail',
    (error: Error) => ({error})
);

////////////////////////////////////////
export const addBook = createAction(
    '[Sitter] add book',
    (book: Book) => ( {book} ),
)

export const addBookSuccess = createAction(
    '[Sitter] add book success',
    (success: object) => ( {success} )
);

export const addBookFail = createAction(
    '[Sitter] add book fail',
    (error: Error) => ({ error }),
);
/////////////////////////////////////////
export const loadBooks = createAction(
    '[Sitter] load books'
)

export const loadBooksSuccess = createAction(
    '[Sitter] load books success',
    (books: Book[]) => ( {books} )
);

export const loadBooksFail = createAction(
    '[Sitter] load books fail',
    (error: Error) => ({ error }),
);
/////////////////////////////////////////
export const updateBookStatus = createAction(
    '[Sitter] update book status',
    (id: string, status: object) => ( {id, status} ),
)

export const updateBookStatusSuccess = createAction(
    '[Sitter] update book status success',
    (success: object) => ( {success} )
);

export const updateBookStatusFail = createAction(
    '[Sitter] update book status fail',
    (error: Error) => ({ error }),
);
/////////////////////////////////////////
export const declineBook = createAction(
    '[Sitter] decline book',
    (id: string) => ( {id} ),
)

export const declineBookSuccess = createAction(
    '[Sitter] decline book success',
    (success: object) => ( {success} ),
);

export const declineBookFail = createAction(
    '[Sitter] decline book fail',
    (error: Error) => ({ error }),
);