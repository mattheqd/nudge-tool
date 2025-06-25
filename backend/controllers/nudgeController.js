import { Nudge } from '../models/NudgeModel.js';

export const getRandomNudge = async (req, res) => {
    try {
        // Get a random nudge from the database
        const nudge = await Nudge.aggregate([
            { $sample: { size: 1 } }
        ]);

        if (!nudge || nudge.length === 0) {
            return res.status(404).json({ error: 'No nudges found' });
        }

        // Increment the usage count
        await Nudge.findByIdAndUpdate(nudge[0]._id, {
            $inc: { usageCount: 1 }
        });

        res.json(nudge[0]);
    } catch (error) {
        console.error('Error getting random nudge:', error);
        res.status(500).json({ error: 'Failed to get random nudge' });
    }
};

export const updateFeedback = async (req, res) => {
    const { nudgeId } = req.params;
    const { feedbackType } = req.body; // 'positive' or 'negative'

    try {
        const updateField = feedbackType === 'positive' ? 'positiveFeedback' : 'negativeFeedback';
        
        const updatedNudge = await Nudge.findByIdAndUpdate(
            nudgeId,
            { $inc: { [updateField]: 1 } },
            { new: true }
        );

        if (!updatedNudge) {
            return res.status(404).json({ error: 'Nudge not found' });
        }

        res.json(updatedNudge);
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({ error: 'Failed to update feedback' });
    }
}; 