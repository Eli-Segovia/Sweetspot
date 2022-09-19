import { HTTPErrorBuilder } from './HTTPError.js';

/**
 *
 * @param {Number} id id of Mongo object
 * @param {String} resource Mongo resource being referenced
 * @returns
 */
export const unableToFindResourceErr = function (id, resource) {
    return new HTTPErrorBuilder()
        .message(`${resource} not found with id of ${id}`)
        .code(404);
};

/**
 *
 * @param {JSON} data JSON data returned from request
 * @param {Response} res Express response object
 * @param {Number} code Status Code
 */
export const successfulRequest = function (data, res, code = 200) {
    return res.status(code).json({
        success: true,
        data
    });
};
