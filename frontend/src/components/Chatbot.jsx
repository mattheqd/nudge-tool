import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Textarea,
} from '@chakra-ui/react';

import TemplatePrompt from "./TemplatePrompt";


import { FaArrowAltCircleRight } from "react-icons/fa";

const Chatbot = () => {

  const [isDrawerOpen, setDrawerOpen] = useState(false);


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
        {/* Sample Messages */}
        <Box alignSelf="flex-start" bg="blue.500" color="white" p={2} borderRadius="md">
          Hello! How can I assist you today?
        </Box>
        <Box alignSelf="flex-end" bg="gray.300" color="black" p={2} borderRadius="md">
          Just exploring this chatbot!
        </Box>
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
        <TemplatePrompt open={isDrawerOpen} setOpen={setDrawerOpen} buttonName="Refine Where I've Gotten"/>
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
        />
        <Button colorScheme="blue">Send</Button>
      </HStack>

    </Box>
  );
};

export default Chatbot;
