import { Nudge } from '../models/NudgeModel.js';
import sessionService from '../services/sessionService.js';

export const getRandomNudge = async (req, res) => {
    const { sessionId } = req.query;
    
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

        // If sessionId is provided, track the nudge in the session
        if (sessionId) {
            try {
                await sessionService.addMessage(sessionId, {
                    role: 'assistant',
                    content: nudge[0].text,
                    timestamp: new Date(),
                    isNudge: true,
                    nudgeId: nudge[0]._id,
                    responseTime: null,
                    tokensUsed: 0
                });
            } catch (sessionError) {
                console.error('Error tracking nudge in session:', sessionError);
                // Don't fail the main request if session tracking fails
            }
        }

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