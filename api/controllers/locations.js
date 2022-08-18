import geo from 'countrycitystatejson';

// @desc        Get States
// @route       GET /api/v1/states
// @access      Public
export const getStates = (req, res, next) => {
    const states = geo.getStatesByShort('US');
    res.status(200).json({
        success: true,
        data: states
    });
};
