import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  category: { type: String, default: 'General' },
  usageCount: { type: Number, default: 0 },
});

export const Prompt = mongoose.model('Prompt', promptSchema);