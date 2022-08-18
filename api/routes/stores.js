import express, { Router } from 'express';
const router = express.Router();
import {
    getStores,
    getStore,
    createStore,
    deleteStore,
    updateStore
} from '../controllers/stores.js';

// GET      Stores
// POST     Store
router.route('/').get(getStores).post(createStore);

// GET      Store
// PUT      Store
// DELETE   Store
router.route('/:id').get(getStore).put(updateStore).delete(deleteStore);

export default router;
