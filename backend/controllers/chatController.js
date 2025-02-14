// controllers/chatController.js
import { getChatCompletion } from "../services/chatService.js";

export const getChatCompletionAbstract = async (req, res) => {
    const { messages } = req.body;

    try {
        const completion = await getChatCompletion(messages);
        res.json(completion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get chat completion' });
    }
};
