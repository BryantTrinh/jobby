import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Badge,
  Flex,
  Text,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function JobCard({ savedJobs, setSavedJobs }) {
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/states/');
        if (response.ok) {
          const data = await response.json();
          setStates(data);
        } else {
          console.error('Failed to fetch states');
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    }

    fetchStates();
  }, []);

  const handleDeleteJob = (index) => {
    setSavedJobs((prevJobs) => prevJobs.filter((_, i) => i !== index));
  };

  return (
  <Box width="700px" maxWidth="700px" mb="10px" mt="10">
    {savedJobs && savedJobs.length > 0 ? (
      savedJobs.map((job, index) => (
        <Box
          key={index}
          border="1px solid #E2E8F0"
          borderRadius="md"
          p={4}
          mb={4}
          backgroundColor="white"
          boxShadow="sm"
      >
  <Flex justifyContent="space-between" alignItems="center" mb={3}>
    <Text
      fontSize="xl"
      fontWeight="bold"
      color="blue.500"
      textDecoration="underline"
      cursor="pointer"
      onClick={() => navigate(`/jobby/job/${job.id}`)}
    >
      {job.job_title}
    </Text>

  <Flex flexDirection="column" alignItems="flex-end" ml={4}>
    <Text fontSize="md" fontWeight="bold">Date Applied:</Text>
    <Text>{job.applied ? job.applied : "Not applied yet"}</Text>
  </Flex>
</Flex>

  <Flex justifyContent="space-between" alignItems="center" mb={3}>
    <Flex flexDirection="column" alignItems="flex-start">
      <Text fontSize="md">Company: {job.company}</Text>
      {job.state?.name?.toLowerCase() !== 'remote' && (
        <>
          <Text fontSize="md">City: {job.city || 'N/A'}</Text>
          <Text fontSize="md">State: {job.state?.name || 'N/A'}</Text>
        </>
      )}

  {job.state?.name?.toLowerCase() === 'remote' && 
    <Text fontSize="md">Location: Remote</Text>}
</Flex>

  <Flex justifyContent="flex-end" alignItems="center">
    <Badge colorScheme="green" fontSize="md" textAlign="center" p={2}>
      <Flex flexDirection="column" alignItems="center">
        <Text mb={2}>
          {job.salary_start && job.salary_end
            ? `$${job.salary_start.toLocaleString()} - $${job.salary_end.toLocaleString()}`
            : job.salary_start
            ? `$${job.salary_start.toLocaleString()}`
            : job.salary_end
            ? `$${job.salary_end.toLocaleString()}`
            : "Salary not specified"}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          {job.payment_type === 'hourly' ? 'Hourly' : 'Yearly'}
        </Text>
      </Flex>
    </Badge>
  </Flex>
</Flex>

  <Flex justifyContent="flex-end">
    <IconButton
      aria-label="Delete job"
      icon={<DeleteIcon />}
      colorScheme="red"
      onClick={() => handleDeleteJob(index)}
    />
  </Flex>
</Box>
    ))
  ) : (
  <Text>No saved jobs available.</Text>
  )}
</Box>
  );  
}

export default JobCard;
