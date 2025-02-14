// services/chatService.js
import dotenv from 'dotenv';

dotenv.config();

export const getChatCompletion = async (messages) => {
    const url = `https://azureapi.zotgpt.uci.edu/openai/deployments/${process.env.DEPLOYMENT_ID}/chat/completions?api-version=${process.env.API_VERSION}`;

    const data = {
      temperature: 1,
      top_p: 1,
      stream: false,
      stop: null,
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: "You are a chatbot assistant. You are helping a user with a task.",
        },
        ...messages, // Include the incoming messages
      ],
    };

    console.log('ok');
    console.log(data);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "api-key": process.env.API_KEY, // Use environment variable for API key
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error calling ZotGPT API:", error);
      throw error;
    }
  };
  
