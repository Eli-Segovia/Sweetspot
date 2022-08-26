import Store from '../models/Store.js';
import HTTPError, { HTTPErrorBuilder } from '../utils/HTTPError.js';
import { Image } from '../models/embedded/image.js';

const unableToFindStoreErr = function (id) {
    return new HTTPErrorBuilder()
        .message(`Store not found with id of ${id}`)
        .code(404);
};

// @desc        Get Stores
// @route       GET /api/v1/stores
// @access      Public
export const getStores = async (req, res, next) => {
    try {
        const stores = await Store.find();

        res.status(200).json({
            success: true,
            data: stores
        });
    } catch (err) {
        next(err);
    }
};

// @desc        Get Store
// @route       GET /api/v1/stores/:id
// @access      Public
export const getStore = async (req, res, next) => {
    const { id } = req.params;
    try {
        const store = await Store.findById(id);
        if (!store) {
            return next(unableToFindStoreErr(id));
        }

        res.status(200).json({
            success: true,
            data: store
        });
    } catch (err) {
        next(err);
    }
};

// @desc        Create Store
// @route       POST /api/v1/stores
// @access      Private
export const createStore = async (req, res, next) => {
    try {
        req.body['admins'] = [req.body.owner];
        const store = await Store.create(req.body);
        res.status(201).json({
            success: true,
            data: store
        });
    } catch (err) {
        next(err);
    }
};

// @desc        Update Store
// @route       PUT /api/v1/stores/:id
// @access      Private
export const updateStore = async (req, res, next) => {
    const { id } = req.params;
    try {
        const store = await Store.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!store) {
            return next(unableToFindStoreErr(id));
        } else {
            res.status(200).json({
                success: true,
                data: store
            });
        }
    } catch (err) {
        next(err);
    }
};

// @desc        Delete Store
// @route       DELETE /api/v1/stores/:id
// @access      Private
export const deleteStore = async (req, res, next) => {
    const { id } = req.params;
    try {
        const store = Store.findByIdAndDelete(id);

        if (!store) {
            return next(unableToFindStoreErr(id));
        } else {
            res.status(200).json({
                success: true,
                data: store
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};

// @desc        Update Store
// @route       PUT /api/v1/stores/uploads/:id
// @access      Private
export const updateImageStore = async (req, res, next) => {
    const { id } = req.params;
    const { buffer, mimetype } = req.file;
    const httpErr = new HTTPErrorBuilder();
    const image = {
        data: new Buffer.from(buffer),
        contentType: mimetype
    };

    const savedImage = await Image.create(image);

    if (!savedImage) {
        return next(httpErr.message('Unable to upload image').code(400));
    }

    try {
        const store = await Store.findByIdAndUpdate(
            id,
            {
                image: savedImage
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!store) {
            return next(unableToFindStoreErr(id));
        } else {
            res.status(200).json({
                success: true,
                data: store
            });
        }
    } catch (err) {
        next(err);
    }
};
