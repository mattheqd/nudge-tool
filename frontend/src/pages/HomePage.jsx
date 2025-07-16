import { Box, Flex } from "@chakra-ui/react";
import TextScratchpad from "../components/TextScratchpad";
import Chatbot from "../components/Chatbot";
import { useSession } from "../context/SessionContext";

const HomePage = () => {
  const { sessionId } = useSession();

  return (
    <Flex width="100vw" height="100vh" minHeight="100vh" m={0} p={0}>
      <Box flex="1" height="100vh" minHeight="100vh" minWidth={0}>
        <TextScratchpad sessionId={sessionId} />
      </Box>
      <Box flex="1" height="100vh" minHeight="100vh" minWidth={0}>
        <Chatbot />
      </Box>
    </Flex>
  );
};

export default HomePage;
