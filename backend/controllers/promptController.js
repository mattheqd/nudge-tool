
import { Prompt } from '../models/PromptModel.js'; // Adjust the path as needed


export const getPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find({}); // Fetch all prompts
    res.json(prompts);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};