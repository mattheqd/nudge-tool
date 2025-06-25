import { Box, Flex } from "@chakra-ui/react";
import TextScratchpad from "../Components/TextScratchpad";
import Chatbot from "../Components/Chatbot";

const HomePage = () => {
  return (
    <Flex width="100vw" height="100vh" minHeight="100vh" m={0} p={0}>
      <Box flex="1" height="100vh" minHeight="100vh" minWidth={0}>
        <TextScratchpad />
      </Box>
      <Box flex="1" height="100vh" minHeight="100vh" minWidth={0}>
        <Chatbot />
      </Box>
    </Flex>
  );
};

export default HomePage;
