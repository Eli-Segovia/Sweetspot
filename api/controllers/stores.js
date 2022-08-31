import Store from '../models/Store.js';
import { HTTPErrorBuilder } from '../utils/HTTPError.js';
import { unableToFindStoreErr } from '../utils/errors.js';
import hash from 'object-hash';
import asyncHandler from '../middleware/async.js';

// @desc        Get Stores
// @route       GET /api/v1/stores
// @access      Public
export const getStores = asyncHandler(async (req, res, next) => {
    const stores = await Store.find();

    res.status(200).json({
        success: true,
        data: stores
    });
});

// @desc        Get Store
// @route       GET /api/v1/stores/:id
// @access      Public
export const getStore = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const store = await Store.findById(id);
    if (!store) {
        return next(unableToFindStoreErr(id));
    }

    res.status(200).json({
        success: true,
        data: store
    });
});

// @desc        Create Store
// @route       POST /api/v1/stores
// @access      Private
export const createStore = asyncHandler(async (req, res, next) => {
    req.body['admins'] = [req.body.owner];

    if (req.body.state) {
        var locationFields = {
            address: req.body.address,
            street: req.body.street,
            state: req.body.state,
            city: req.body.city
        };
    }

    const store = new Store(req.body);
    if (locationFields) store.location = locationFields;
    await store.save();

    res.status(201).json({
        success: true,
        data: store
    });
});

// @desc        Update Store
// @route       PUT /api/v1/stores/:id
// @access      Private
export const updateStore = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const store = await Store.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    if (!store) {
        return next(unableToFindStoreErr(id));
    }

    res.status(200).json({
        success: true,
        data: store
    });
});

// @desc        Delete Store
// @route       DELETE /api/v1/stores/:id
// @access      Private
export const deleteStore = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const store = await Store.findByIdAndDelete(id);

    if (!store) {
        return next(unableToFindStoreErr(id));
    }

    res.status(200).json({
        success: true,
        data: store
    });
});

// @desc        Update Store
// @route       PUT /api/v1/stores/uploads/:id
// @access      Private
export const updateImageStore = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { buffer, mimetype } = req.file;
    const httpErr = new HTTPErrorBuilder();
    const image = {
        data: new Buffer.from(buffer),
        contentType: mimetype
    };

    let store = await Store.findById(id);

    if (!store) {
        console.log('here. bad..');
        return next(unableToFindStoreErr(id));
    }

    const store_image_hash = hash(store.image.data);
    const image_hash = hash(image.data);

    if (store_image_hash === image_hash) {
        return next(httpErr.message('Duplicate image uploaded').code(400));
    }

    store = await Store.findByIdAndUpdate(
        id,
        { image },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        data: store
    });
});
