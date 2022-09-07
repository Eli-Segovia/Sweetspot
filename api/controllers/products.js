import Products from '../models/Products.js';
import asyncHandler from '../middleware/async.js';
import { HTTPErrorBuilder } from '../utils/HTTPError.js';

// @desc        Get Stores
// @route       GET /api/v1/products
// @access      Public
export const getProducts = asyncHandler(async (req, res, next) => {
    const products = await Products.find();

    res.status(200).json({
        success: true,
        data: products
    });
});
