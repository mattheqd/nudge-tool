import React, { useState } from "react";
import { Box, Button, Textarea, VStack, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, IconButton, Badge, Flex } from "@chakra-ui/react";
import ExpandableCards from "./ExpandableCards";
import CardHistory from "./CardHistory";
import { FiChevronsRight, FiChevronsLeft } from 'react-icons/fi';
import { useSession } from '../context/SessionContext';
import { DownloadIcon } from '@chakra-ui/icons';

const ToggleCardsButton = ({ show, count, onClick }) => (
  <Box position="absolute" top={2} right={6} zIndex={10}>
    <Button
      onClick={onClick}
      borderRadius="xl"
      boxShadow="md"
      bg="white"
      p={0}
      minW={0}
      width="44px"
      height="44px"
      position="relative"
      _hover={{ boxShadow: 'lg', bg: 'gray.50' }}
    >
      {show ? <FiChevronsRight size={28} /> : <FiChevronsLeft size={28} />}
      <Badge
        position="absolute"
        top={1}
        right={1}
        bg="#FFD8E4"
        color="black"
        borderRadius="full"
        px={2}
        fontSize="sm"
        fontWeight="bold"
        boxShadow="sm"
      >
        {count}
      </Badge>
    </Button>
  </Box>
);

const TextScratchpad = ({ sessionId }) => {
  const { sessionId: contextSessionId, setSessionId, scratchpadText, setScratchpadText, messages } = useSession();
  const [activeTab, setActiveTab] = useState(0);
  const [showCards, setShowCards] = useState(true);
  const [cardCount, setCardCount] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  // Callback to update card count from ExpandableCards
  const handleCardCountChange = (count) => {
    setCardCount(count);
  };

  // Handle first input: start session and save snapshot if needed
  const handleScratchpadChange = async (e) => {
    const newText = e.target.value;
    setScratchpadText(newText);
    if (!contextSessionId && newText.length > 0) {
      try {
        const newSessionId = await window.sessionApi.createSession({
          metadata: {
            userAgent: navigator.userAgent,
            deviceType: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop'
          }
        });
        setSessionId(newSessionId);
        await window.sessionApi.addScratchpadSnapshot(newSessionId, newText);
      } catch (err) {
        console.error('Failed to create session and save initial scratchpad snapshot:', err);
      }
    } else if (contextSessionId && newText.length > 0) {
      // If session already exists, do nothing (snapshotting handled elsewhere)
    }
  };

  // Save button handler
  const handleSave = () => {
    let content = '';
    content += '--- Scratchpad ---\n';
    content += scratchpadText + '\n\n';
    content += '--- Chat History ---\n';
    messages.forEach((msg, idx) => {
      if (msg.role === 'user') {
        content += `User: ${msg.content}\n`;
      } else if (msg.role === 'assistant' && msg.nudge) {
        content += `Nudge: ${msg.content}\n`;
      } else if (msg.role === 'assistant') {
        content += `Assistant: ${msg.content}\n`;
      }
    });
    // Download as .txt
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nudge-session.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%" bg="#F6F8FA" position="relative">
      <Box display="flex" position="relative" zIndex={2}>
        <Flex align="center" justify="space-between" bg="white" px={8} py={2} position="relative" zIndex={2} width="100%">
          <Box fontWeight="bold" fontSize="lg" color="gray.800">
            Scratchpad
          </Box>
          <Button leftIcon={<DownloadIcon />} colorScheme="gray" variant="outline" size="sm" onClick={handleSave}>
            Save
          </Button>
        </Flex>
        {/* Accent bar at top */}
        <Box
          position="relative"
          top={0}
          left={0}
          right={0}
          height="4px"
          bg="#FFD8E4"
          borderTopLeftRadius="lg"
          borderTopRightRadius="lg"
        />
      </Box>
      <Box
        flex="1"
        minHeight={0}
        mx="auto"
        width="100%"
        bg="white"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        <Tabs
          variant="enclosed"
          flex="1"
          minHeight={0}
          display="flex"
          flexDirection="column"
          onChange={handleTabChange}
        >
          <TabList>
            <Tab>Scratchpad</Tab>
            <Tab>History</Tab>
          </TabList>

          <TabPanels flex="1" minHeight={0} display="flex" flexDirection="column">
            <TabPanel flex="1" minHeight={0} display="flex" flexDirection="column" p={0} position="relative">
              {/* Toggle Button */}
              <ToggleCardsButton show={showCards} count={cardCount} onClick={() => setShowCards((v) => !v)} />
              <VStack spacing={4} align="stretch" flex="1" minHeight={0} px={5} py={5}>
                <Textarea
                  placeholder="Start typing here..."
                  value={scratchpadText}
                  onChange={handleScratchpadChange}
                  size="lg"
                  resize="none"
                  flex="1"
                  minHeight={0}
                  maxH="100%"
                  bg="white"
                  overflowY="auto"
                />
              </VStack>
              {showCards && (
                <Box mt={2}>
                  <ExpandableCards sessionId={sessionId} onCardCountChange={handleCardCountChange} />
                </Box>
              )}
            </TabPanel>

            <TabPanel flex="1" p={0}>
              <CardHistory sessionId={sessionId} shouldRefresh={activeTab === 1} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default TextScratchpad;
