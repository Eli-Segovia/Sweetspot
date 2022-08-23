import multer from 'multer';
import Store from '../models/Store.js';

// init multer for fup
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// @desc        Get Stores
// @route       GET /api/v1/stores
// @access      Public
export const getStores = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Show all Stores, from controller'
    });
};

// @desc        Get Store
// @route       GET /api/v1/stores/:id
// @access      Public
export const getStore = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Show store ${req.params.id}, from controller`
    });
};

// @desc        Create Store
// @route       POST /api/v1/stores
// @access      Private
export const createStore = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Created a new Store'
    });
};

// @desc        Update Store
// @route       PUT /api/v1/stores/:id
// @access      Private
export const updateStore = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Updated store ${req.params.id}`
    });
};

// @desc        Delete Store
// @route       DELETE /api/v1/stores/:id
// @access      Private
export const deleteStore = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Deleted store ${req.params.id}`
    });
};

// @desc        Update Store
// @route       PUT /api/v1/stores/uploads/:id
// @access      Private
export const updateImageStore = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Updated store ${req.params.id}`
    });
};
