import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Flex, Badge, Spinner } from '@chakra-ui/react';

function JobDetails() {
  const { jobid } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/jobs/${jobid}`);
        if (response.ok) {
          const data = await response.json();
          console.log("API Response Data:", data);
          if (!data.description || !data.requirements) {
            console.warn("Missing fields in API response:", {
              description: data.description,
              requirements: data.requirements,
            });
          }

          setJob(data);
        } else {
          console.error("API Error:", response.statusText);
          setError('Failed to fetch job details.');
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError('An error occurred while fetching job details.');
      } finally {
        setLoading(false);
      }
    }

    fetchJobDetails();
  }, [jobid]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <Box
      maxWidth="800px"
      mx="auto"
      p={6}
      border="1px solid #E2E8F0"
      borderRadius="md"
      boxShadow="md"
      mt={10}
      overflow="hidden"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {job.job_title || 'No title available'}
      </Text>
      <Badge colorScheme="green" fontSize="md">
        <Text textAlign="center">
          {job.salary_start && job.salary_end
            ? job.salary_start.toLocaleString().includes(",") || job.salary_end.toLocaleString().includes(",")
              ? "Salary:"
              : "Hourly:"
            : job.salary_start
            ? job.salary_start.toLocaleString().includes(",")
              ? "Salary:"
              : "Hourly:"
            : job.salary_end
            ? job.salary_end.toLocaleString().includes(",")
              ? "Salary:"
              : "Hourly:"
            : "Salary not specified"}
        </Text>
        {job.salary_start && job.salary_end
          ? `$${job.salary_start.toLocaleString()} - $${job.salary_end.toLocaleString()}`
          : job.salary_start
          ? `$${job.salary_start.toLocaleString()}`
          : job.salary_end
          ? `$${job.salary_end.toLocaleString()}`
          : ""}
      </Badge>
      <Text fontSize="lg" mb={2}>
        <strong>Company:</strong> {job.company || 'No company specified'}
      </Text>
      <Text fontSize="lg" mb={2}>
        <strong>Location:</strong> {job.city || 'N/A'}, {job.state?.name || 'N/A'}
      </Text>
      <Text fontSize="lg" mb={2}>
        <strong>Applied:</strong> {job.applied || 'Not applied yet'}
      </Text>
      <Box
        overflowY="scroll"
        mb={4}
        p={2}
        border="1px solid #CBD5E0"
        borderRadius="md"
        resize="vertical"
        minHeight="300px"
      >
        <Text fontSize="lg">
          <strong>Description:</strong> {job.job_description || 'No description available.'}
        </Text>
      </Box>
      <Box
        overflowY="scroll"
        mb={4}
        p={2}
        border="1px solid #CBD5E0"
        borderRadius="md"
        resize="vertical"
        minHeight="200px"
      >
        <Text fontSize="lg">
          <strong>Requirements:</strong> {job.job_requirements || 'No requirements listed.'}
        </Text>
      </Box>
      <Text fontSize="lg">
        <strong>Job URL:</strong>{' '}
        <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
          {job.url || 'No URL available'}
        </a>
      </Text>
    </Box>
  );
}

export default JobDetails;
