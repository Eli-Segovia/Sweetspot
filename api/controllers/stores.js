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
// @route       GET /api/v1/stores
// @access      Private
export const createStore = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'Created a new Store'
    });
};

// @desc        Update Store
// @route       GET /api/v1/stores/:id
// @access      Private
export const updateStore = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Updated store ${req.params.id}`
    });
};

// @desc        Delete Store
// @route       GET /api/v1/stores/:id
// @access      Private
export const deleteStore = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Deleted store ${req.params.id}`
    });
};
