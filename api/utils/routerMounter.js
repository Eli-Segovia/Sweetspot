// Routes
import stores from '../routes/stores.js';
import products from '../routes/products.js';

/**
 * @param {expressApp} app - The express app
 * @desc Mounts routers onto provided express app.
 */
const mountRouter = (app) => {
    // Mount Routers
    app.use(`${process.env.API_BASE}/stores`, stores);
    app.use(`${process.env.API_BASE}/products`, products);
};

export default mountRouter;
