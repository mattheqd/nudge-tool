import { Nudge } from './models/NudgeModel.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const designNudges = [
    {
        text: "Choose a feature of the design that is emerging: how does it align with the problem statement?",
        category: "Converted"
    },
    {
        text: "What parts of the solution thus far could possibly be misunderstood? What can be done to make it clearer?",
        category: "Converted"
    },
    {
        text: "Think of your design solution: how does it handle edge cases? Indeed, what are the edge cases?",
        category: "Converted"
    },
    {
        text: "Is scalability a factor in the problem statement? If so, how much scalability is desired and does your proposed design reach that level of scalability?",
        category: "Converted"
    },
    {
        text: "Why is your solution structured the way it is? Did you just run into \"it works\" or do you have a good reason why it is better than other possible solutions?",
        category: "Converted"
    },
    {
        text: "What are the positives and what are the negatives of the design you currently have?",
        category: "Converted"
    },
    {
        text: "Consider the 'happy path' for this solution. Is it possible some people may deviate from it, or expect something different?",
        category: "Converted"
    },
    {
        text: "How does this solution compare to what is already out there? Does it follow proven principles or introduce something unique?",
        category: "Converted"
    },
    {
        text: "How could this design be tested? How will we know if it is \"working\"? Could you do some of that testing now in your head and reflect?",
        category: "Converted"
    },
    {
        text: "Is the design you have now the only way to solve the problem? Is there a better way? What defines better?",
        category: "Converted"
    },
    {
        text: "What do you like about the current solution? Why?",
        category: "Converted"
    },
    {
        text: "What do you not like about the current solution? Why?",
        category: "Converted"
    },
    {
        text: "What functionality do you think the stakeholders care about the most?",
        category: "Converted"
    },
    {
        text: "Who is the most important stakeholder? Who is the least important? How does this affect the features you are considering?",
        category: "Converted"
    },
    {
        text: "Consider the various stakeholders and how the solution fits (or does not) each of their needs or concerns",
        category: "Converted"
    }
];

const insertDesignNudges = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // Insert the new design nudges
        const insertedNudges = await Nudge.insertMany(designNudges);
        console.log(`Successfully inserted ${insertedNudges.length} design nudges`);

        // Display summary
        console.log('\nInserted nudges:');
        insertedNudges.forEach((nudge, index) => {
            console.log(`${index + 1}. ${nudge.text}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error inserting design nudges:', error);
        process.exit(1);
    }
};

insertDesignNudges();
