// routes/chatRoutes.js
import express from 'express';
import { getChatCompletionAbstract } from '../controllers/chatController.js';

const router = express.Router();

router.post('/chat', getChatCompletionAbstract);

export default router;
