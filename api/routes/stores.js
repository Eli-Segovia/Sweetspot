import express, { Router } from 'express';
const router = express.Router();
import { getStores, getStore } from '../controllers/stores.js';

// GET Stores
// POST store
// PUT store
// DELETE store
router.get('/', getStores);

// GET Store
router.get('/:id', getStore);

export default router;
