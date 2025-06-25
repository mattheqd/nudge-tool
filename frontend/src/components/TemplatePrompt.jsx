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
  Stack,
} from '@chakra-ui/react'


import { Radio, RadioGroup } from "./ui/radio";


const TemplatePrompt = ({ open, setOpen, buttonName, onPromptSelect }) => {

  const [prompts, setPrompts] = useState([]);


  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/prompts"); // Your route is /prompts
        if (!response.ok) {
          throw new Error(`Failed to fetch prompts: ${response.status}`);
        }
        const data = await response.json();
        const processedPrompts = data.map((item) => item.prompt);
        setPrompts(processedPrompts);
      } catch (error) {
        console.log("Error fetching prompts:");
      }
    };

    fetchPrompts();
  }, []); // Run only once on component mount

  const [selectedPrompt, setSelectedPrompt] = useState("");

  const handleRadioChange = (value) => {
    setSelectedPrompt(value.target.value); // Update state on radio selection
  };

  const handleSubmit = () => {
    onPromptSelect(selectedPrompt);
    setSelectedPrompt("");
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
            <RadioGroup onChange={handleRadioChange} colorScheme='green'>
              <Stack spacing={4} direction="column">
                {prompts.map((prompt, index) => (
                  <Radio key={index} value={prompt}>
                    {prompt}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
          <DrawerActionTrigger asChild>
            <Button onClick={handleSubmit}>Submit</Button>
          </DrawerActionTrigger>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default TemplatePrompt
