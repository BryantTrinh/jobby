import React, { useState } from 'react';
import {
  Heading,
  Text,
  Box,
  Flex,
  Stack,
  Input,
  Button,
  Image,
} from "@chakra-ui/react";
import logo from './assets/Logo.svg';
import JobScraper from './JobScraper';
import JobAccordion from './JobAccordion';
import './App.css';

function App() {
  return (
    <Flex
      width="100vw"
      height="100%"
      alignContent="center"
      justifyContent="center"
      p={4}
      direction="column"
    >
      {/* Website Logo */}
      <Stack align="center">
        <Image
          src={logo}
          alt="Website logo"
          boxSize="350px"
        />
      </Stack>

      <Stack fontFamily="Verdana" mb={10} align="center" mt={-100}>
        <h2>
          <Text fontSize='3xl' color='#008080'>Job Documentation & Assistance</Text>
          <Text fontSize='3xl' color='#008080' align="center">Powered by AI</Text>
        </h2>
      </Stack>

      {/* Save application field and save button */}
      <Stack fontFamily="Verdana" spacing={4} align="center" mb={20} width="100%">
        <Input
          placeholder="Save application via entering in URL"
          size="md"
          width="350px"
          textAlign="center"
        />
        <Button colorScheme='teal' size='md'>
          Save job application
        </Button>
      </Stack>
      
      {/* Job Scraper for testing */}
      <Stack fontFamily="Verdana" spacing={4} align="center" mb={20} width="100%">
      <JobScraper align="center" />
      </Stack>

      {/* Container for search field and accordion */}
      <Flex width="100%" justifyContent="center" alignItems="center"> 
        <Stack fontFamily="Verdana" spacing={4} align="center" width="300px" ml={100} mr={200}>
          <Text fontSize='3xl' align="center" color='#008080'>Application Filter</Text>
          <Input
            placeholder="Company name"
            size="md"
            textAlign="center"
          />
          <Button colorScheme='teal' size='md'>
            Search
          </Button>
        </Stack>

        <JobAccordion />
      </Flex>
    </Flex>
    

  );
}

export default App;
