import express, { Router } from 'express';
const router = express.Router();
import { getStates } from '../controllers/locations.js';

// GET     State
router.route('/states').get(getStates);

export default router;
