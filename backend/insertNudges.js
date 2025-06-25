import { Nudge } from './models/NudgeModel.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleNudges = [
    {
        text: "Have you considered how this solution might impact different user groups?",
        category: "User-Centered Design"
    },
    {
        text: "What assumptions are you making about the user's needs? How could you validate them?",
        category: "Design Thinking"
    },
    {
        text: "How might you prototype this idea quickly to test its feasibility?",
        category: "Prototyping"
    },
    {
        text: "What's the worst-case scenario for this design? How could you prevent it?",
        category: "Risk Assessment"
    },
    {
        text: "Have you explored alternative solutions beyond your first idea?",
        category: "Divergent Thinking"
    },
    {
        text: "How does this design align with the user's mental model?",
        category: "Cognitive Design"
    },
    {
        text: "What constraints are you working with? How might they actually inspire creativity?",
        category: "Design Constraints"
    },
    {
        text: "How might you make this design more inclusive and accessible?",
        category: "Inclusive Design"
    },
    {
        text: "What feedback loops could you implement to continuously improve this design?",
        category: "Iterative Design"
    },
    {
        text: "How does this solution scale? What might break when it's used by more people?",
        category: "Scalability"
    },
    {
        text: "What's the simplest version of this that would still be valuable?",
        category: "Minimal Viable Design"
    },
    {
        text: "How might you measure the success of this design?",
        category: "Design Metrics"
    },
    {
        text: "What emotional response are you trying to evoke with this design?",
        category: "Emotional Design"
    },
    {
        text: "How does this design handle edge cases and error states?",
        category: "Error Handling"
    },
    {
        text: "What's the story you're trying to tell with this design?",
        category: "Design Narrative"
    }
];

const insertNudges = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // Clear existing nudges
        await Nudge.deleteMany({});
        console.log('Cleared existing nudges');

        // Insert new nudges
        const insertedNudges = await Nudge.insertMany(sampleNudges);
        console.log(`Successfully inserted ${insertedNudges.length} nudges`);

        process.exit(0);
    } catch (error) {
        console.error('Error inserting nudges:', error);
        process.exit(1);
    }
};

insertNudges(); 