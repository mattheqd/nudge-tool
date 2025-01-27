import React, { useState } from "react";
import { Box, Button, Textarea, VStack } from "@chakra-ui/react";

const TextScratchpad = () => {
  const [text, setText] = useState("");

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      width="100%"
      mx="auto"
      height="90vh"
      display="flex"
      flexDirection="column"
      >
      <VStack spacing={4} align="stretch" flex="1">
          <Textarea
          placeholder="Start typing here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="lg"
          resize="none" /* Prevents resizing */
          flex="1" /* Allows the textarea to grow and fill the space */
          />
      </VStack>
      <Button
          colorScheme="blue"
          onClick={() => setText("")}
          isDisabled={!text.trim()}
          mt={4} /* Adds spacing above the button */
      >
          Clear
      </Button>
    </Box>
  );
};

export default TextScratchpad;
