import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import TextScratchpad from "../Components/TextScratchpad";
import Chatbot from "../Components/Chatbot";

const HomePage = () => {
  return (
    <Box bg="gray.50" minHeight="100vh" p={4}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Flex
          direction="row"
          gap={6}
          alignItems="flex-start"
          justifyContent="center"
          width="100%"
        >
          <TextScratchpad />
          <Chatbot />
        </Flex>
      </Flex>
      
    </Box>
  );
};

export default HomePage;
