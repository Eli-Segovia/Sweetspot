import Store from '../models/Store.js';
import { HTTPErrorBuilder } from '../utils/HTTPError.js';
import {
    successfulRequest,
    unableToFindResourceErr
} from '../utils/HTTPResponse.js';
import hash from 'object-hash';
import asyncHandler from '../middleware/async.js';
import geocoder from '../utils/geocoder.js';

// @desc        Get Stores
// @route       GET /api/v1/stores?zipcode=xxxxx&distance=xxxx(miles)
// @access      Public
export const getStores = asyncHandler(async (req, res, next) => {
    let queries = {};

    // get queries from URL
    ['zipcode', 'distance'].forEach((key) => {
        if (req.query[key]) {
            queries[key] = req.query[key];
        }
    });

    const queryKeys = Object.keys(queries);

    if (Object.keys(req.query).length > queryKeys.length) {
        return next(
            new HTTPErrorBuilder()
                .message('Provided string query is invalid')
                .code(400)
        );
    }

    let stores = {};

    if (queryKeys[0] == 'zipcode' && queryKeys[1] == 'distance') {
        stores = await getStoresInRadius(queries.zipcode, queries.distance);
    } else {
        stores = await Store.find();
    }

    successfulRequest(stores, res);
});

// @desc        Get Store
// @route       GET /api/v1/stores/:id
// @access      Public
export const getStore = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const store = await Store.findById(id);
    if (!store) {
        return next(unableToFindResourceErr(id, 'Store'));
    }

    successfulRequest(store, res);
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

    successfulRequest(store, res, 201);
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
        return next(unableToFindResourceErr(id, 'Store'));
    }

    successfulRequest(store, res);
});

// @desc        Delete Store
// @route       DELETE /api/v1/stores/:id
// @access      Private
export const deleteStore = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const store = await Store.findByIdAndDelete(id);

    if (!store) {
        return next(unableToFindResourceErr(id, 'Store'));
    }
    successfulRequest(store, res);
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
        return next(unableToFindStoreErr(id, 'Store'));
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
    successfulRequest(store, res);
});

/* --------- Not Exported ------------- */
async function getStoresInRadius(zipcode, distance) {
    // get lat/lng
    const loc = await geocoder.geocode(zipcode);
    const { latitude: lat, longitude: lng } = loc[0];

    const radius = distance / 3963;

    const stores = await Store.find({
        'location.location': {
            $geoWithin: { $centerSphere: [[lng, lat], radius] }
        }
    });
    return stores;
}
