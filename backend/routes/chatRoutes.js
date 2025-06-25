// routes/chatRoutes.js
import express from 'express';
import { getChatCompletionAbstract } from '../controllers/chatController.js';
import { getPrompts } from '../controllers/promptController.js';

const router = express.Router();

router.post('/chat', getChatCompletionAbstract);
router.get('/prompts', getPrompts);

export default router;
