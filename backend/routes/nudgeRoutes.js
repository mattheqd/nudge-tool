import express from 'express';
import { getRandomNudge, updateFeedback } from '../controllers/nudgeController.js';

const router = express.Router();

router.get('/random', getRandomNudge);
router.post('/:nudgeId/feedback', updateFeedback);

export default router; 