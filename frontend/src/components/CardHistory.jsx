import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Flex,
  Button,
  useToast,
  Spinner,
  Center,
  Divider,
} from '@chakra-ui/react';
import { sessionApi } from '../../api/sessionApi.js';

const CardHistory = ({ sessionId, shouldRefresh }) => {
  const [cardHistory, setCardHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'accepted', 'dismissed'
  const toast = useToast();

  console.log('CardHistory sessionId:', sessionId, 'shouldRefresh:', shouldRefresh);

  useEffect(() => {
    if (sessionId && shouldRefresh) {
      loadCardHistory();
    }
  }, [sessionId, shouldRefresh]);

  // Refresh history when filter changes to ensure we have latest data
  useEffect(() => {
    if (sessionId && shouldRefresh) {
      loadCardHistory();
    }
  }, [filter]);

  const loadCardHistory = async () => {
    if (!sessionId) return;
    
    setIsLoading(true);
    try {
      console.log('Loading card history for session:', sessionId);
      const session = await sessionApi.getSession(sessionId);
      console.log('Session data:', session);
      if (session && session.cardInteractions) {
        console.log('Card interactions found:', session.cardInteractions);
        setCardHistory(session.cardInteractions);
      } else {
        console.log('No card interactions found in session');
        setCardHistory([]);
      }
    } catch (error) {
      console.error('Error loading card history:', error);
      toast({
        title: 'Failed to load history',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getFilteredHistory = () => {
    console.log('Filtering history with filter:', filter);
    console.log('Current cardHistory:', cardHistory);
    if (filter === 'all') return cardHistory;
    const filtered = cardHistory.filter(card => card.action === filter);
    console.log('Filtered result:', filtered);
    return filtered;
  };

  const filteredHistory = getFilteredHistory();

  if (isLoading) {
    return (
      <Center py={8}>
        <Spinner size="lg" color="pink.500" />
      </Center>
    );
  }

  return (
    <Box width="100%" py={5} px={5}>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Card History
        </Text>
        <HStack spacing={2}>
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            onClick={loadCardHistory}
            isLoading={isLoading}
          >
            Refresh
          </Button>
          <Button
            size="sm"
            variant={filter === 'all' ? 'solid' : 'outline'}
            colorScheme="pink"
            onClick={() => {
              console.log('Setting filter to all');
              setFilter('all');
            }}
          >
            All ({cardHistory.length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'accept' ? 'solid' : 'outline'}
            colorScheme="green"
            onClick={() => {
              console.log('Setting filter to accept');
              setFilter('accept');
            }}
          >
            Accepted ({cardHistory.filter(c => c.action === 'accept').length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'dismiss' ? 'solid' : 'outline'}
            colorScheme="red"
            onClick={() => {
              console.log('Setting filter to dismiss');
              setFilter('dismiss');
            }}
          >
            Dismissed ({cardHistory.filter(c => c.action === 'dismiss').length})
          </Button>
        </HStack>
      </Flex>

      {filteredHistory.length === 0 ? (
        <Center py={8}>
          <Text color="gray.500">No card history found</Text>
        </Center>
      ) : (
        <VStack spacing={3} align="stretch" maxH="400px" overflowY="auto">
          {filteredHistory.map((card, index) => (
            <Box
              key={`${card.cardId}-${card.timestamp}`}
              bg="white"
              borderRadius="lg"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
              p={4}
            >
              <Flex justify="space-between" align="start" mb={2}>
                <Text fontSize="sm" color="gray.500">
                  {formatTimestamp(card.timestamp)}
                </Text>
                <Badge
                  colorScheme={card.action === 'accept' ? 'green' : 'red'}
                  variant="subtle"
                  fontSize="xs"
                >
                  {card.action === 'accept' ? 'ACCEPTED' : 'DISMISSED'}
                </Badge>
              </Flex>
              
              <Text fontWeight="bold" fontSize="md" mb={2} color="gray.800">
                {card.cardTitle}
              </Text>
              
              <Text fontSize="sm" color="gray.700" lineHeight="1.4">
                {card.cardContent}
              </Text>
              
              {index < filteredHistory.length - 1 && (
                <Divider mt={3} borderColor="gray.200" />
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default CardHistory; 