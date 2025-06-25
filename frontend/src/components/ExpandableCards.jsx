import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  IconButton,
  Flex,
  Button,
  HStack,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import acceptIcon from '../assets/accept.png';
import dismissIcon from '../assets/dismiss.png';

const ExpandableCards = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cards.length === 0) fetchNudges();
    // eslint-disable-next-line
  }, []);

  const fetchNudges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/random");
      if (!response.ok) throw new Error("Failed to fetch nudge");
      const data = await response.json();
      setCards(prev => [...prev, {
        id: Date.now(),
        title: data.category || 'Nudge',
        shortDescription: data.text,
        fullContent: data.text,
      }]);
    } catch (error) {
      console.error("Error fetching nudge:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = (cardId) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
    // Optionally: handle accept logic
  };

  const handleDismiss = (cardId) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
    // Optionally: handle dismiss logic
  };

  return (
    <Box width="100%" py={5} px={5}>
      <Flex justify="flex-start" mb={2}>
        <Button
          colorScheme="pink"
          leftIcon={<Box as="span" fontSize="xl">+</Box>}
          onClick={fetchNudges}
          isLoading={isLoading}
          borderRadius="lg"
          px={4}
          py={2}
          fontWeight="bold"
        >
          Add Card
        </Button>
      </Flex>
      <HStack spacing={4} overflowX="auto" align="stretch" pb={2}>
        {cards.map((card, idx) => (
          <Box
            key={card.id}
            bg="white"
            borderRadius="xl"
            boxShadow="md"
            border="1px solid"
            borderColor="gray.200"
            minW="260px"
            maxW="260px"
            p={4}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <VStack align="stretch" spacing={2} flex="1">
              <Text fontSize="sm" color="gray.500" fontWeight="bold"># Nudge {idx + 1}</Text>
              <Text fontWeight="bold" fontSize="md" mb={1}>{card.title}</Text>
              <Text fontSize="sm" color="gray.700">{card.shortDescription}</Text>
            </VStack>
            <HStack spacing={4} mt={4} justify="center">
              <Tooltip label="Accept" hasArrow>
                <IconButton
                  icon={<img src={acceptIcon} alt="Accept" width={28} height={28} />}
                  aria-label="Accept"
                  variant="ghost"
                  onClick={() => handleAccept(card.id)}
                  _hover={{ bg: 'gray.100' }}
                  borderRadius="full"
                />
              </Tooltip>
              <Tooltip label="Dismiss" hasArrow>
                <IconButton
                  icon={<img src={dismissIcon} alt="Dismiss" width={28} height={28} />}
                  aria-label="Dismiss"
                  variant="ghost"
                  onClick={() => handleDismiss(card.id)}
                  _hover={{ bg: 'gray.100' }}
                  borderRadius="full"
                />
              </Tooltip>
            </HStack>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default ExpandableCards; 