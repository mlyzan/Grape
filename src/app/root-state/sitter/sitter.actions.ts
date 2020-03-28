import { createAction } from '@ngrx/store';
import { Sitter } from './sitter.interfaces';

export const createSitter = createAction(
    '[Sitter] create sitter',
    (sitter: Sitter) => ({sitter})
)

export const createSitterSuccess = createAction(
    '[Sitter] create sitter success',
    (sitter: Sitter) => ({ sitter }),
);

export const createSitterFail = createAction(
    '[Sitter] create sitter fail',
    (error: Error) => ({ error }),
);