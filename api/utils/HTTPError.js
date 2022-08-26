class HTTPError extends Error {
    /**
     *
     * @param {String} message       Error message to be sent to client
     * @param {Number} statusCode    HTTP status code sent to client
     */
    constructor(message = 'Whoops, theres an error on our end: Server Error') {
        super(message);
        this.statusCode = 500;
    }
}

export class HTTPErrorBuilder {
    constructor(httpError = new HTTPError()) {
        this.httpError = httpError;
    }

    message(msg) {
        this.httpError.message = msg;
        return this;
    }

    code(statusCode) {
        this.httpError.statusCode = statusCode;
        let builtHttpError = this.httpError;
        this.httpError = new HTTPError();
        return builtHttpError;
    }
}

export default HTTPError;
