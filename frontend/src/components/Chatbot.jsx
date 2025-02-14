import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Textarea,
} from '@chakra-ui/react';
import { FaArrowAltCircleRight } from "react-icons/fa";
import TemplatePrompt from "./TemplatePrompt";

const Chatbot = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]); // Chat history
  const [input, setInput] = useState(""); // User input
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to send user message to the backend
  const sendMessage = async () => {
    if (!input.trim()) return; // Don't send empty messages

    setIsLoading(true);

    // Add user message to chat history
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      // Call the backend API
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages, // Send the updated messages array
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from the chatbot");
      }

      const data = await response.json();

      // Add assistant's response to chat history
      const assistantMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      // Add an error message to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      setInput(""); // Clear the input field
    }
  };

  return (
    <Box
      width="100%"
      height="90vh"
      bg="white"
      borderRadius="md"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Chat Messages */}
      <VStack
        flex="1"
        overflowY="auto"
        spacing={4}
        p={4}
        bg="gray.100"
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            alignSelf={message.role === "user" ? "flex-end" : "flex-start"}
            bg={message.role === "user" ? "gray.300" : "blue.500"}
            color={message.role === "user" ? "black" : "white"}
            p={2}
            borderRadius="md"
          >
            {message.content}
          </Box>
        ))}
      </VStack>

      {/* Spin Component */}
      <HStack p={4} bg="white" borderTop="1px solid" borderColor="gray.200">
        <Input
          placeholder="Press the right arrow to generate a random feedback nudge!"
          flex="1"
          variant="outline"
        />
        <Button>
          <FaArrowAltCircleRight />
        </Button>
      </HStack>

      {/* Refine and Help get Started */}
      <HStack p={4} bg="white" borderTop="1px solid" borderColor="gray.200" justifyContent="center">
        <TemplatePrompt open={isDrawerOpen} setOpen={setDrawerOpen} buttonName="Help me Get Started" />
        <TemplatePrompt open={isDrawerOpen} setOpen={setDrawerOpen} buttonName="Refine Where I've Gotten" />
      </HStack>

      {/* Input Area */}
      <HStack p={4} bg="white" borderTop="1px solid" borderColor="gray.200">
        <Textarea
          placeholder="Type your message..."
          flex="1"
          resize="none"
          rows="4" // Approximately 4 rows
          overflowY="auto"
          variant="outline"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevent newline in textarea
              sendMessage();
            }
          }}
        />
        <Button
          colorScheme="blue"
          onClick={sendMessage}
          isLoading={isLoading}
          loadingText="Sending..."
        >
          Send
        </Button>
      </HStack>
    </Box>
  );
};

export default Chatbot;