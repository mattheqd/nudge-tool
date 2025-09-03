import { Nudge } from './models/NudgeModel.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const metaNudges = [
    {
        text: "What makes the problem complex?",
        category: "Advice on the process"
    },
    {
        text: "What are the top five risks in the problem or its solution? How could you minimize or mitigate these risks?",
        category: "Advice on the process"
    },
    {
        text: "Are there any 'gotchas' in the design prompt that look trivial to do but perhaps are not?",
        category: "Advice on the process"
    },
    {
        text: "What worries you most about this problem? Try solving that part first.",
        category: "Advice on the process"
    },
    {
        text: "What parts of the problem are the most important to solve first?",
        category: "Advice on the process"
    },
    {
        text: "In your deliberations thus far, did any doubts arise? What are those doubts? Discuss them for a bit.",
        category: "Advice on the process"
    },
    {
        text: "Uncertainty is the bane of design. What can you do to reduce the uncertainty you are facing?",
        category: "Advice on the process"
    },
    {
        text: "Are you considering individual people as stakeholders, or organizing them by role?",
        category: "Stakeholders and users"
    },
    {
        text: "If some stakeholder changed their mind about the system, how would it impact the project?",
        category: "Stakeholders and users"
    },
    {
        text: "Are any goals by different stakeholders in opposition? If so, how will you resolve them? Or how did you resolve them?",
        category: "Stakeholders and users"
    },
    {
        text: "What do you think different stakeholders consider as being the most important part of the problem to solve?",
        category: "Stakeholders and users"
    },
    {
        text: "Who might have a say over this project, or an opinion about its shape, that is not a direct user per se?",
        category: "Stakeholders and users"
    },
    {
        text: "Have you considered users who are not 'like you' yourself?",
        category: "Stakeholders and users"
    },
    {
        text: "Have you considered the alignment between how people might expect to use the app and how your design supports that?",
        category: "Stakeholders and users"
    },
    {
        text: "Have you considered the alignment between the functionality that you want and how a user easily can use that functionality?",
        category: "Stakeholders and users"
    },
    {
        text: "What did your client not tell you that might be important?",
        category: "Stakeholders and users"
    },
    {
        text: "What assumptions are you making? Are you missing any?",
        category: "Assumptions etc"
    },
    {
        text: "What assumptions are you making? Are any of them not applicable?",
        category: "Assumptions etc"
    },
    {
        text: "What constraints are you considering? Are you missing any?",
        category: "Assumptions etc"
    },
    {
        text: "What constraints are you considering? Are any of them not applicable?",
        category: "Assumptions etc"
    },
    {
        text: "What potential biases do you think might be influencing your design? Where could that bias show impact?",
        category: "Assumptions etc"
    },
    {
        text: "In making your decisions thus far, are the decisions based on intuition? Gut? Just a choice because it was easy? Or did you make a principled comparison of alternative choices that you could have made?",
        category: "Assumptions etc"
    },
    {
        text: "Write down the decisions you have made in the course of designing. Are any of these decisions potentially problematic now? What about in the future? Could you defer any of these decisions until later (least responsible moment)? Option theory?",
        category: "Assumptions etc"
    },
    {
        text: "What assumptions are you making and are these helping you solve the problem?",
        category: "Assumptions etc"
    },
    {
        text: "Are there additional constraints to consider?",
        category: "Assumptions etc"
    },
    {
        text: "What is the most significant decision that's been made so far in your design? How does that impact all the other areas of your design",
        category: "Assumptions etc"
    },
    {
        text: "Are any of the choices your are making in terms of functionality prohibitively difficult to implement?",
        category: "Assumptions etc"
    },
    {
        text: "Are you building plain vanilla / just good enough? Is that what you want?",
        category: "Essence"
    },
    {
        text: "Is there a simpler way of doing what you are doing?",
        category: "Essence"
    },
    {
        text: "Is your design overly complex by accident?",
        category: "Essence"
    },
    {
        text: "Now that you have been designing for a while, are you still true to the original prompt?",
        category: "Essence"
    },
    {
        text: "Examine your design thus far, can you spot any scope creep?",
        category: "Essence"
    },
    {
        text: "Sometimes, we envision 'pie in the sky' functionality, do you feel this is the case?",
        category: "Essence"
    },
    {
        text: "Certain features form the core of your solution, the rest is essentially 'bolted on'. In considering your current set of features, have you sufficiently worked out that core? Or are you focusing too much on the bolted on bits?",
        category: "Essence"
    },
    {
        text: "How well does the design address the problem? Is there anything superfluous (gold plating/ YAGNI)? Anything missing?",
        category: "Essence"
    },
    {
        text: "What functionality could you live without when the application is first released to users?",
        category: "Essence"
    },
    {
        text: "How can you simplify the design to still provide all that is required? What is the MVP?",
        category: "Essence"
    },
    {
        text: "What is the MVP? Can you make it even smaller?",
        category: "Essence"
    },
    {
        text: "Given the problem, what core functionality will speak to users?",
        category: "Essence"
    },
    {
        text: "What knowledge gaps are hindering you?",
        category: "Knowledge"
    },
    {
        text: "Is there something you do not know that would be helpful to know?",
        category: "Knowledge"
    },
    {
        text: "Reflect about what is uncertain about your design. How can you reduce uncertainty?",
        category: "Knowledge"
    },
    {
        text: "What questions are bothering you about this problem? How could you answer them?",
        category: "Knowledge"
    },
    {
        text: "What do you know that you don't know but want to know?",
        category: "Knowledge"
    },
    {
        text: "What do you not know that is important for you to know?",
        category: "Knowledge"
    },
    {
        text: "Try considering alternative designs to solve the problem. How do these compare to what you have already?",
        category: "Spark creativity"
    },
    {
        text: "Try breaking this problem down into smaller sub-problems (divide-and-conquer) and working through the sub-problems first.",
        category: "Spark creativity"
    },
    {
        text: "Imagine explaining the features to a potential customer (rubber ducking). Is there anything missing or unnecessary?",
        category: "Spark creativity"
    },
    {
        text: "Think of similar applications, or analogies, what can you learn from them?",
        category: "Spark creativity"
    },
    {
        text: "Take three minutes and brainstorm auxiliary functionality that could be added.",
        category: "Spark creativity"
    },
    {
        text: "Have you considered which parts of your design may not be as unique as you think, and you might be able to reuse (partial) solutions from elsewhere?",
        category: "Spark creativity"
    },
    {
        text: "What are some potentially alternative designs to what you've produced already? What are some of the tradeoffs?",
        category: "Spark creativity"
    },
    {
        text: "Is there anything surprising about your design? Anything someone would consider innovative? Anything someone would go 'wow, give me that over the competition'?",
        category: "Spark creativity"
    },
    {
        text: "How could removing some of the constraints help you solve the problem?",
        category: "Spark creativity"
    },
    {
        text: "What is the weakest part of your design?",
        category: "Reflect on design"
    },
    {
        text: "What is the strongest part of your design?",
        category: "Reflect on design"
    },
    {
        text: "What are the strengths and weaknesses of the solution?",
        category: "Reflect on design"
    },
    {
        text: "Have you considered all the edge cases that might arise?",
        category: "Reflect on design"
    },
    {
        text: "How elegant is the design?",
        category: "Reflect on design"
    },
    {
        text: "Consider the sustainability of your current solution. Does it support future growth beyond what has already been created?",
        category: "Reflect on design"
    },
    {
        text: "Why is the current solution complex?",
        category: "Reflect on design"
    },
    {
        text: "Is the solution scalable for projected users? Not just initial users but expected numbers in one year, two years",
        category: "Reflect on design"
    },
    {
        text: "How could you improve the security of the application?",
        category: "Reflect on design"
    },
    {
        text: "Is the design intuitive to use?",
        category: "Reflect on design"
    },
    {
        text: "What are the worst case scenarios that would cause the design to fail? How likely are those to happen and how can they be mitigated?",
        category: "Reflect on design"
    },
    {
        text: "What did you find most challenging to implement in your design? Why was it challenging?",
        category: "Reflect on design"
    },
    {
        text: "How robust is your core design against changes?",
        category: "Reflect on design"
    },
    {
        text: "Are there aspects of your design that you feel could be done better? Discuss those.",
        category: "Reflect on design"
    },
    {
        text: "When considering your solution, are you sure that you have examined all the details necessary to make sure your high level vision can work?",
        category: "Reflect on design"
    },
    {
        text: "Often there are details that may ruin a well-thought out design. Think of whether there might be such details in your design at hand?",
        category: "Reflect on design"
    }
];

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

const insertAllNudges = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // Clear existing nudges
        await Nudge.deleteMany({});
        console.log('Cleared existing nudges');

        // Combine all nudges
        const allNudges = [...metaNudges, ...designNudges];

        // Insert all nudges
        const insertedNudges = await Nudge.insertMany(allNudges);
        console.log(`Successfully inserted ${insertedNudges.length} total nudges`);
        console.log(`- ${metaNudges.length} existing nudges`);
        console.log(`- ${designNudges.length} new design nudges`);

        // Display category summary
        const categoryCount = {};
        allNudges.forEach(nudge => {
            categoryCount[nudge.category] = (categoryCount[nudge.category] || 0) + 1;
        });

        console.log('\nCategory breakdown:');
        Object.entries(categoryCount).forEach(([category, count]) => {
            console.log(`- ${category}: ${count} nudges`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error inserting nudges:', error);
        process.exit(1);
    }
};

insertAllNudges();
