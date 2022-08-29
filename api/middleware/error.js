import { HTTPErrorBuilder } from '../utils/HTTPError.js';
const errorHandler = (err, req, res, next) => {
    const httpErrBldr = new HTTPErrorBuilder();

    // Error object whose information is returned to the client
    let error = { ...err, message: err.message };

    // Log error
    console.log(`[Request Error] ${err.stack}`.red);

    switch (err.name) {
        case 'CastError':
            error = httpErrBldr
                .message(`Store not found with id of ${err.value}`)
                .code(404);
            break;
        case 'MongoError':
            if (err.code === 11000)
                error = httpErrBldr
                    .message('Duplicate field values are not allowed')
                    .code(400);
            break;
        case 'ValidationError':
            const message = Object.values(err.errors).map(
                (errVal) => errVal.message
            );
            error = httpErrBldr.message(message).code(400);
            break;
    }

    res.status(error.statusCode).json({
        success: false,
        error: error.message
    });
};

export default errorHandler;
