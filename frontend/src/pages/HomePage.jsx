import { Box, Flex, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, VStack, Icon } from "@chakra-ui/react";
import TextScratchpad from "../components/TextScratchpad";
import Chatbot from "../components/Chatbot";
import { useSession } from "../context/SessionContext";
import { useState, useEffect } from "react";
import { FaLightbulb, FaPen, FaComments } from "react-icons/fa";

const HomePage = () => {
  const { sessionId } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Check if user has seen onboarding on component mount
  useEffect(() => {
    // Show onboarding modal every time user logs in
    onOpen();
  }, [onOpen]);

  const handleDismissOnboarding = () => {
    // Remove localStorage caching - just close the modal
    onClose();
  };

  return (
    <>
      <Flex width="100vw" height="100vh" minHeight="100vh" m={0} p={0}>
        <Box flex="1" height="100vh" minHeight="100vh" minWidth={0}>
          <TextScratchpad sessionId={sessionId} />
        </Box>
        <Box flex="1" height="100vh" minHeight="100vh" minWidth={0}>
          <Chatbot />
        </Box>
      </Flex>

      {/* Onboarding Modal */}
      <Modal isOpen={isOpen} onClose={handleDismissOnboarding} isCentered>
        <ModalOverlay />
        <ModalContent maxW="500px" mx={4}>
          <ModalHeader textAlign="center" color="#7B1EA2E5">
            Welcome to the Nudge Tool! 🎉
          </ModalHeader>
          <ModalBody>
            <VStack spacing={6} align="stretch">
              <Text fontSize="lg" textAlign="center" color="gray.700">
                Welcome to the Nudge Tool. You will have a scratchpad to do your work and chatbot at your disposal.
              </Text>
              
              <VStack spacing={4} align="stretch">
                <Flex align="center" spacing={3}>
                  <Icon as={FaPen} color="#7B1EA2E5" boxSize={5} mr={3} />
                  <Box>
                    <Text fontWeight="bold" color="gray.800">Scratchpad</Text>
                    <Text fontSize="sm" color="gray.600">Your workspace for notes and thoughts</Text>
                  </Box>
                </Flex>
                
                <Flex align="center" spacing={3}>
                  <Icon as={FaComments} color="#7B1EA2E5" boxSize={5} mr={3} />
                  <Box>
                    <Text fontWeight="bold" color="gray.800">Chatbot</Text>
                    <Text fontSize="sm" color="gray.600">AI assistant to help with your work</Text>
                  </Box>
                </Flex>
                
                <Flex align="center" spacing={3}>
                  <Icon as={FaLightbulb} color="#7B1EA2E5" boxSize={5} mr={3} />
                  <Box>
                    <Text fontWeight="bold" color="gray.800">Insightful Cards</Text>
                    <Text fontSize="sm" color="gray.600">Occasionally, cards with insightful messages to assist with your work will appear at your selected frequency. Be sure to take a look!</Text>
                  </Box>
                </Flex>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button 
              colorScheme="purple" 
              onClick={handleDismissOnboarding}
              size="lg"
              px={8}
            >
              Get Started
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomePage;
