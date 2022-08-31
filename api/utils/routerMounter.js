// Routes
import stores from '../routes/stores.js';

/**
 * @param {expressApp} app - The express app
 * @desc Mounts routers onto provided express app.
 */
const mountRouter = (app) => {
    // Mount Routers
    app.use(`${process.env.API_BASE}/stores`, stores);
};

export default mountRouter;
