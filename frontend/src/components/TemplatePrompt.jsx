import React, { useEffect, useState} from 'react'
import { 
  Button,
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  CheckboxGroup,
  Stack,
} from '@chakra-ui/react'

import { Checkbox } from "./ui/checkbox"


const TemplatePrompt = ({ open, setOpen, buttonName }) => {


  const prompts = [
    "What is your goal today?",
    "How can we assist you?",
    "Do you need help with your project?",
    "Would you like some workout advice?",
    "Are you interested in learning more about the app?"
  ]

  const handleSelect = (prompt) => {
    setSelectedPrompt(prompt);
    alert(`Selected prompt: ${prompt}`);
  };

 return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button colorScheme="blue">
          {buttonName}
        </Button>
      </DrawerTrigger>
      <DrawerContent
        height="100vh" // Ensure the drawer covers the full height
        position="fixed" // Fix the position so it can cut into the navbar
        top={0} // Start from the top of the screen
        left={0} // Align to the left side
        right={0} // Align to the right side
        zIndex={9999} // Ensure the drawer is above the navbar
      >
        <DrawerHeader>
          <DrawerTitle>Select a Template Prompt</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
            <CheckboxGroup colorScheme='green'>
                <Stack spacing={4} direction="column">  {/* Ensure the direction is always 'column' */}
                    <Checkbox value='naruto'>Naruto</Checkbox>
                    <Checkbox value='sasuke'>Sasuke</Checkbox>
                    <Checkbox value='kakashi'>Kakashi</Checkbox>
                </Stack>
            </CheckboxGroup>
          
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
          <Button>Submit</Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default TemplatePrompt
