import mongoose from 'mongoose';

const nudgeSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String, default: 'General' },
  usageCount: { type: Number, default: 0 },
  positiveFeedback: { type: Number, default: 0 },
  negativeFeedback: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const Nudge = mongoose.model('Nudge', nudgeSchema); 