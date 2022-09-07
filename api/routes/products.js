import { Router } from 'express';
import multer from 'multer';

import { getProducts } from '../controllers/products.js';

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const router = Router();

// GET      Products
// POST     Product
router.route('/').get(getProducts);

export default router;
