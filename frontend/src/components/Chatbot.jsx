import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Textarea,
  Text,
  IconButton,
  Divider,
  Tooltip,
  useToast,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { FaArrowAltCircleRight, FaSync, FaRegCopy } from "react-icons/fa";
import thumbsUp from '../assets/thumbs-up.png';
import thumbsDown from '../assets/thumbs-down.png';
import spin from '../assets/spin.png';
import { sessionApi } from '../../api/sessionApi.js';
import { useSession } from '../context/SessionContext';

const Chatbot = () => {
  const { sessionId, setSessionId, scratchpadText, messages, setMessages } = useSession();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({}); // { messageIndex: 'positive' | 'negative' }
  const [nudgeMessageIndex, setNudgeMessageIndex] = useState(null);
  const [nudgeId, setNudgeId] = useState(null);
  const [sessionStats, setSessionStats] = useState(null);
  const toast = useToast();
  const lastSnapshotRef = React.useRef("");

  // Cleanup session when component unmounts
  useEffect(() => {
    return () => {
      if (sessionId) {
        sessionApi.endSession(sessionId).catch(error => {
          console.error('Failed to end session:', error);
        });
      }
    };
  }, [sessionId]);

  // Update session stats when messages change
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      sessionApi.getSessionStats(sessionId)
        .then(stats => setSessionStats(stats))
        .catch(error => console.error('Failed to get session stats:', error));
    }
  }, [sessionId, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() && !scratchpadText.trim()) return;
    
    // Create session if this is the first message
    let currentSessionId = sessionId;
    if (!currentSessionId) {
      try {
        currentSessionId = await sessionApi.createSession({
          metadata: {
            userAgent: navigator.userAgent,
            deviceType: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop'
          }
        });
        setSessionId(currentSessionId);
        console.log('Session created:', currentSessionId);
      } catch (error) {
        console.error('Failed to create session:', error);
        // Continue without session tracking if session creation fails
      }
    }
    
    setIsLoading(true);
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: updatedMessages,
          sessionId: currentSessionId 
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch response from the chatbot");
      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }

    // Save scratchpad snapshot if changed
    if (scratchpadText && scratchpadText !== lastSnapshotRef.current && currentSessionId) {
      try {
        await sessionApi.addScratchpadSnapshot(currentSessionId, scratchpadText);
        lastSnapshotRef.current = scratchpadText;
      } catch (err) {
        console.error('Failed to save scratchpad snapshot:', err);
      }
    }
  };

  const fetchRandomNudge = async () => {
    // Create session if this is the first interaction
    let currentSessionId = sessionId;
    if (!currentSessionId) {
      try {
        currentSessionId = await sessionApi.createSession({
          metadata: {
            userAgent: navigator.userAgent,
            deviceType: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop'
          }
        });
        setSessionId(currentSessionId);
        console.log('Session created for nudge:', currentSessionId);
      } catch (error) {
        console.error('Failed to create session for nudge:', error);
        // Continue without session tracking if session creation fails
      }
    }
    
    try {
      const url = currentSessionId 
        ? `http://localhost:5000/api/random?sessionId=${currentSessionId}`
        : "http://localhost:5000/api/random";
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch nudge");
      const data = await response.json();
      const nudgeMsg = { role: "assistant", content: data.text, nudge: true };
      setMessages((prev) => [...prev, nudgeMsg]);
    } catch (error) {
      console.error("Error fetching nudge:", error);
    }
  };

  const handleFeedback = async (messageIndex, type) => {
    if (!sessionId) {
      toast({
        title: "No active session",
        description: "Please send a message first to start tracking feedback",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    
    try {
      // Update feedback in session
      await sessionApi.updateFeedback(sessionId, messageIndex, type);
      
      // Update local feedback state
      setFeedback((prev) => ({ ...prev, [messageIndex]: type }));
      
      // Show success toast
      toast({
        title: "Feedback submitted!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Failed to submit feedback",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSpin = async (assistantIndex, isNudge) => {
    // Track spin interaction if session exists
    if (sessionId) {
      try {
        const action = isNudge ? 'new_nudge' : 'regenerate';
        await sessionApi.addSpinInteraction(sessionId, assistantIndex, action);
      } catch (error) {
        console.error('Error tracking spin interaction:', error);
        // Continue with the action even if tracking fails
      }
    }

    if (isNudge) {
      // Fetch a new random nudge
      try {
        const url = sessionId 
          ? `http://localhost:5000/api/random?sessionId=${sessionId}`
          : "http://localhost:5000/api/random";
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch nudge");
        const data = await response.json();
        const nudgeMsg = { role: "assistant", content: data.text, nudge: true };
        setMessages((prev) => [...prev, nudgeMsg]);
      } catch (error) {
        console.error("Error fetching nudge:", error);
      }
      return;
    }
    // Otherwise, re-answer the user's last question
    let userMessage = null;
    for (let i = assistantIndex - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        userMessage = messages[i];
        break;
      }
    }
    if (!userMessage) return;
    setIsLoading(true);
    const updatedMessages = [...messages, { role: "user", content: userMessage.content }];
    setMessages(updatedMessages);
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: updatedMessages,
          sessionId: sessionId 
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch response from the chatbot");
      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%" bg="#F6F8FA" position="relative">
      <Box display="flex"  position="relative" zIndex={2}>
        <Box position="relative" display="inline-block">
          <Box
            bg="white"
            px={8}
            py={2}

            fontWeight="bold"
            fontSize="lg"
            color="gray.800"
            position="relative"
            zIndex={2}
          >
            Chat
          </Box>
          {/* Accent bar at bottom */}
          <Box
            position="relative"
            left={0}
            right={0}
            bottom={0}
            height="4px"
            bg="#FFD8E4"
     
          />
        </Box>
      </Box>
      <Box
        flex="1"
        mx="auto"
  
        width="100%"
        bg="#F6F8FA"
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.200"
        display="flex"
        flexDirection="column"
        pt={8}
      >
        <VStack flex="1" overflowY="auto" spacing={4} px={6} py={4} align="stretch">
          {messages.map((message, index) => (
            <Box key={index}>
              <Box
                alignSelf={message.role === "user" ? "flex-end" : "flex-start"}
                bg={
                  message.role === "user"
                    ? "#7B1EA2E5"
                    : message.nudge
                      ? "rgba(255, 244, 128, 0.4)"
                      : "gray.100"
                }
                color={message.role === "user" ? "white" : "gray.800"}
                p={3}
                borderRadius="lg"
                maxWidth="80%"
                boxShadow={message.role === "assistant" ? "md" : undefined}
                border={message.role === "assistant" ? "1px solid #e2e8f0" : undefined}
                fontSize="md"
                fontWeight={message.role === "user" ? "medium" : "normal"}
                mb={1}
                position="relative"
                ml={message.role === "assistant" ? 0 : "auto"}
                mr={message.role === "user" ? 0 : "auto"}
              >
                {message.content}
                <Tooltip label="Copy" hasArrow>
                  <IconButton
                    icon={<FaRegCopy />}
                    aria-label="Copy message"
                    size="sm"
                    variant="ghost"
                    colorScheme="gray"
                    position="absolute"
                    color={message.role === "user" ? "white" :"gray.800"}
                    top={2}
                    right={2}
                    onClick={() => handleCopy(message.content)}
                  />
                </Tooltip>
              </Box>
              {message.role === "assistant" && (
                <HStack spacing={3} mt={2} ml={2} mr={"auto"}>
                  <Tooltip label="Like" hasArrow>
                    <Box 
                      as="span" 
                      cursor="pointer" 
                      onClick={() => handleFeedback(index, 'positive')}
                      opacity={feedback[index] === 'positive' ? 1 : 0.6}
                      _hover={{ opacity: 1 }}
                      transition="opacity 0.2s"
                    >
                      <img 
                        src={thumbsUp} 
                        alt="Like" 
                        width={18} 
                        height={18} 
                        style={{ 
                          display: 'inline-block',
                          filter: feedback[index] === 'positive' ? 'brightness(1.2)' : 'none'
                        }} 
                      />
                    </Box>
                  </Tooltip>
                  <Tooltip label="Dislike" hasArrow>
                    <Box 
                      as="span" 
                      cursor="pointer" 
                      onClick={() => handleFeedback(index, 'negative')}
                      opacity={feedback[index] === 'negative' ? 1 : 0.6}
                      _hover={{ opacity: 1 }}
                      transition="opacity 0.2s"
                    >
                      <img 
                        src={thumbsDown} 
                        alt="Dislike" 
                        width={18} 
                        height={18} 
                        style={{ 
                          display: 'inline-block',
                          filter: feedback[index] === 'negative' ? 'brightness(1.2)' : 'none'
                        }} 
                      />
                    </Box>
                  </Tooltip>
                  <Tooltip label="Spin" hasArrow>
                    <Box as="span" cursor="pointer" onClick={() => handleSpin(index, message.nudge)}>
                      <img src={spin} alt="Spin" width={18} height={18} style={{ display: 'inline-block' }} />
                    </Box>
                  </Tooltip>
                </HStack>
              )}
            </Box>
          ))}
        </VStack>
        {/* Input area */}
        <HStack px={6} pb={6} pt={0} spacing={3} bg="#F6F8FA">
          <Tooltip label="Spin for nudge" hasArrow>
            <IconButton
              icon={<img src={spin} alt="Spin" width={20} height={20} style={{ display: 'inline-block' }} />}
              aria-label="Spin for nudge"
              color="white"
              _hover={{ bg: "#7B1EA2E5" }}
              onClick={fetchRandomNudge}
              borderRadius="full"
              boxSize={10}
              minW={0}
              p={0}
            />
          </Tooltip>
          <Box flex="1" bg="white" px={4} py={2} display="flex" alignItems="center" boxShadow="sm">
            <Textarea
              placeholder="Message"
              flex="1"
              resize="none"
              rows={1}
              overflowY="auto"
              variant="unstyled"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              px={0}
              py={1}
              minH="40px"
              maxH="80px"
            />
            <IconButton
              icon={<FaArrowAltCircleRight size={24} />}
              aria-label="Send"
              bg="#7B1EA2E5"
              color="white"
              _hover={{ bg: "#7B1EA2E5" }}
              borderRadius="full"
              ml={2}
              onClick={sendMessage}
              isLoading={isLoading}
              minW={0}
              boxSize={10}
              p={0}
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default Chatbot;