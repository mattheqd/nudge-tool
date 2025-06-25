import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

export const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Import the prompts after the database connection is established
        //await importPrompts();

    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

// Define the Prompt Schema
// const promptSchema = new mongoose.Schema({
//     prompt: { type: String, required: true },
//     category: { type: String, default: 'General' },
//     usageCount: { type: Number, default: 0 },
//   });
  
//   // Create the Prompt Model
//   const Prompt = mongoose.model('Prompt', promptSchema);
  
//   async function importPrompts() {
//     try {
//       // Check if there are already prompts in the database
//       const count = await Prompt.countDocuments();
//       if (count > 0) {
//         console.log('Prompts already exist in the database. Skipping import.');
//         return;
//       }
  
//       // Determine the path to the prompts.json file
//       const filePath = path.join(process.cwd(), 'prompts.json'); // Use path.join to create a correct path
  
//       // Read the JSON file
//       const prompts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
//       // Insert the prompts into the database
//       await Prompt.insertMany(prompts);
//       console.log('Prompts imported successfully!');
  
//     } catch (err) {
//       console.error('Error importing prompts:', err);
//     }
//   }