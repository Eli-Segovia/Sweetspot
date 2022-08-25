import Store from '../models/Store.js';
import { Image } from '../models/embedded/image.js';

// init multer for fup

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
        res.status(400).json({
            success: false
        });
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
            res.status(404).json({
                success: false
            });
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

// @desc        Create Store
// @route       POST /api/v1/stores
// @access      Private
export const createStore = async (req, res, next) => {
    try {
        req.body['admins'] = [req.body.owner];
        const store = await Store.create(req.body);
        console.log(Buffer.from(store.image.data));
        res.status(201).json({
            success: true,
            data: store
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
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
            res.status(404).json({
                success: false,
                msg: 'Not Found'
            });
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

// @desc        Delete Store
// @route       DELETE /api/v1/stores/:id
// @access      Private
export const deleteStore = async (req, res, next) => {
    const { id } = req.params;
    try {
        const store = Store.findByIdAndDelete(id);

        if (!store) {
            res.status(404).json({
                success: false
            });
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
    console.log(req);
    const { id } = req.params;
    const { buffer, mimetype } = req.file;

    const image = {
        data: new Buffer.from(buffer),
        contentType: mimetype
    };

    const savedImage = await Image.create(image);

    if (!savedImage) {
        res.status(400).json({
            success: false,
            msg: 'Unable to upload image'
        });
    }

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
        res.status(404).json({
            success: false,
            msg: 'Unable to upload image'
        });
    } else {
        res.status(200).json({
            success: true,
            data: store
        });
    }
};
