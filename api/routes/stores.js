import { Router } from 'express';
import multer from 'multer';

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const router = Router();
import {
    getStores,
    getStore,
    createStore,
    deleteStore,
    updateStore,
    updateImageStore
} from '../controllers/stores.js';

// GET      Stores
// POST     Store
router.route('/').get(getStores).post(createStore);

// GET      Store
// PUT      Store
// DELETE   Store
router.route('/:id').get(getStore).put(updateStore).delete(deleteStore);

// PUT      Store -> image
router.put('/uploads/:id', upload.single('image'), updateImageStore);

export default router;
