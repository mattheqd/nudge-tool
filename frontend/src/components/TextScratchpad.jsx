import React, { useState } from "react";
import { Box, Button, Textarea, VStack } from "@chakra-ui/react";
import ExpandableCards from "./ExpandableCards";

const TextScratchpad = () => {
  const [text, setText] = useState("");

  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%" bg="#F6F8FA" position="relative">
      <Box display="flex"  position="relative" zIndex={2}>
        <Box position="relative" display="inline-block">
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
            Scratchpad
          </Box>
        </Box>
      </Box>
      <Box
        flex="1"
        mx="auto"
        width="100%"
        bg="white"
        display="flex"
        flexDirection="column"
      >
        <VStack spacing={4} align="stretch" flex="1">
          <Textarea
            mx={5}
            my={5}
            placeholder="Start typing here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            size="lg"
            resize="none"
            flex="1"
            bg="white"
            variant="unstyled"
          />
        </VStack>
      
        <Box mt={2}>
          <ExpandableCards />
        </Box>
      </Box>
    </Box>
  );
};

export default TextScratchpad;
