import { HTTPErrorBuilder } from './HTTPError.js';

export const unableToFindStoreErr = function (id) {
    return new HTTPErrorBuilder()
        .message(`Store not found with id of ${id}`)
        .code(404);
};
