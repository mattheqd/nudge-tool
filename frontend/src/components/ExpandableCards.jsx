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
  useToast,
} from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { sessionApi } from '../../api/sessionApi.js';
import { apiUrl } from '../../api/index.jsx';

const ExpandableCards = ({ sessionId, onCardCountChange, onCardsChange, cards, spawnTrigger }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardFeedback, setCardFeedback] = useState({}); // { cardId: 'like' | 'dislike' }
  const [filter, setFilter] = useState('all'); // 'all', 'liked', 'disliked'
  const toast = useToast();

  console.log('ExpandableCards sessionId:', sessionId);

  // Listen for spawn triggers
  useEffect(() => {
    if (spawnTrigger) {
      fetchNudges();
    }
  }, [spawnTrigger]);

  // Notify parent of card count changes
  useEffect(() => {
    if (onCardCountChange) {
      onCardCountChange(cards.length);
    }
  }, [cards, onCardCountChange]);

  // Filter cards based on current filter
  const filteredCards = cards.filter(card => {
    if (filter === 'all') return true;
    if (filter === 'liked') return cardFeedback[card.id] === 'like';
    if (filter === 'disliked') return cardFeedback[card.id] === 'dislike';
    return true;
  });

  const fetchNudges = async () => {
    setIsLoading(true);
    try {
      const url = sessionId 
        ? apiUrl(`/api/random?sessionId=${sessionId}`)
        : apiUrl("/api/random");
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch nudge");
      const data = await response.json();
      const newCard = {
        id: Date.now(),
        title: data.category || 'Nudge',
        shortDescription: data.text,
        fullContent: data.text,
        nudgeId: data._id,
      };
      const newCards = [...cards, newCard];
      onCardsChange(newCards);
    } catch (error) {
      console.error("Error fetching nudge:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (card) => {
    console.log('Liking card:', card);
    setCardFeedback(prev => ({ ...prev, [card.id]: 'like' }));
  };

  const handleDislike = async (card) => {
    console.log('Disliking card:', card);
    setCardFeedback(prev => ({ ...prev, [card.id]: 'dislike' }));
  };

  const handleMoveToHistory = async (card) => {
    console.log('Moving card to history:', card);
    const newCards = cards.filter(c => c.id !== card.id);
    onCardsChange(newCards);
    
    // Track card interaction if session exists
    if (sessionId) {
      try {
        const cardData = {
          cardId: card.id.toString(),
          cardTitle: card.title,
          cardContent: card.fullContent,
          action: cardFeedback[card.id] || 'neutral',
          nudgeId: card.nudgeId
        };
        console.log('Tracking card interaction:', cardData);
        await sessionApi.addCardInteraction(sessionId, cardData);
        console.log('Card interaction tracked successfully');
      } catch (error) {
        console.error('Error tracking card interaction:', error);
      }
    } else {
      console.log('No sessionId available for tracking');
    }
  };

  return (
    <Box width="100%" py={5} px={5}>
      <Flex justify="space-between" align="center" mb={4}>
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
        
        {/* Filter Buttons */}
        <HStack spacing={2}>
          <Button
            size="sm"
            variant={filter === 'all' ? 'solid' : 'outline'}
            colorScheme="purple"
            onClick={() => setFilter('all')}
          >
            All ({cards.length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'liked' ? 'solid' : 'outline'}
            colorScheme="green"
            onClick={() => setFilter('liked')}
          >
            Liked ({cards.filter(card => cardFeedback[card.id] === 'like').length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'disliked' ? 'solid' : 'outline'}
            colorScheme="red"
            onClick={() => setFilter('disliked')}
          >
            Disliked ({cards.filter(card => cardFeedback[card.id] === 'dislike').length})
          </Button>
        </HStack>
      </Flex>
      
      <HStack spacing={4} overflowX="auto" align="stretch" pb={2}>
        {filteredCards.map((card, idx) => (
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
            position="relative"
          >
            {/* X button to move to history */}
            <Tooltip label="Move to history" hasArrow>
              <IconButton
                icon={<Box as="span" fontSize="lg">×</Box>}
                aria-label="Move to history"
                variant="ghost"
                onClick={() => handleMoveToHistory(card)}
                _hover={{ bg: 'gray.100' }}
                borderRadius="full"
                position="absolute"
                top={2}
                right={2}
                size="sm"
                color="gray.500"
              />
            </Tooltip>
            
            <VStack align="stretch" spacing={2} flex="1">
              <Text fontSize="sm" color="gray.500" fontWeight="bold"># Nudge {cards.indexOf(card) + 1}</Text>
              <Text fontWeight="bold" fontSize="md" mb={1}>{card.title}</Text>
              <Text fontSize="sm" color="gray.700">{card.shortDescription}</Text>
            </VStack>
            <HStack spacing={4} mt={4} justify="center">
              <Tooltip label="Like" hasArrow>
                <IconButton
                  icon={<FaThumbsUp size={24} />}
                  aria-label="Like"
                  variant="ghost"
                  onClick={() => handleLike(card)}
                  color={cardFeedback[card.id] === 'like' ? 'green.500' : 'gray.400'}
                  _hover={{ 
                    bg: 'gray.100',
                    color: cardFeedback[card.id] === 'like' ? 'green.600' : 'gray.500'
                  }}
                  borderRadius="full"
                  size="lg"
                />
              </Tooltip>
              <Tooltip label="Dislike" hasArrow>
                <IconButton
                  icon={<FaThumbsDown size={24} />}
                  aria-label="Dislike"
                  variant="ghost"
                  onClick={() => handleDislike(card)}
                  color={cardFeedback[card.id] === 'dislike' ? 'red.500' : 'gray.400'}
                  _hover={{ 
                    bg: 'gray.100',
                    color: cardFeedback[card.id] === 'dislike' ? 'red.600' : 'gray.500'
                  }}
                  borderRadius="full"
                  size="lg"
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