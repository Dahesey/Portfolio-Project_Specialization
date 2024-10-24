import React, { useState, useEffect } from 'react';
import { Paper, Box, CircularProgress, Button } from '@mui/material';
import styled from 'styled-components';

const VerseOfTheDay = () => {
  const [verse, setVerse] = useState('');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showMore, setShowMore] = useState(false); // Toggle state for showing more/less

  const fetchVerse = async () => {
    try {
      const response = await fetch('https://bible-api.com/john%203:16');
      const data = await response.json();

      if (data && data.text && data.reference) {
        setVerse(data.text); // Set verse text
        setReference(data.reference); // Set verse reference
      } else {
        throw new Error('Invalid data structure');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching verse:', error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse(); // Fetch verse on component mount
  }, []);

  const toggleShowMore = () => {
    setShowMore(prev => !prev); // Toggle between showing more and less
  };

  if (loading) {
    return (
      <StyledPaper elevation={3}>
        <CircularProgress /> {/* Show spinner while loading */}
      </StyledPaper>
    );
  }

  return (
    <StyledPaper elevation={3}>
      <Box mb={2}>
        <StyledTypography>Verse of the Day</StyledTypography>
      </Box>
      {error ? (
        <p>Sorry, we couldn't load the verse. Please try again later.</p>
      ) : (
        <VerseContent>
          {!showMore && (
            <>
              {/* Show only the verse reference and title */}
              <strong>{reference}</strong>
            </>
          )}
          {showMore && (
            <>
              <p>{verse}</p>
              <strong>{reference}</strong>
            </>
          )}
        </VerseContent>
      )}
      {/* Button toggles show more/less */}
      <StyledButton onClick={toggleShowMore} $variant="contained" $fullWidth={true}>
        {showMore ? 'Show Less' : 'Show More'}
      </StyledButton>
    </StyledPaper>
  );
};

export default VerseOfTheDay;

const StyledPaper = styled(Paper)`
  padding: 10px;
  margin-bottom: 30px;
  text-align: center;
  background-color: rgba(0, 121, 107, 0.9); /* Green Color */
  transition: transform 0.5s ease-in-out;
  width: 20px;
  &:hover {
    transform: scale(1.03); /* Slight zoom on hover */
  }
`;

const StyledTypography = styled.h2`
  color: black; /* Make the title stand out against the background */
  font-size: 24px;
`;

const VerseContent = styled.div`
  margin-bottom: 20px;
  color: black;
  font-size: 18px;
  p {
    margin: 0;
  }
`;

// Styled button using transient props ($variant and $fullWidth)
const StyledButton = styled(Button)`
  color: black;
  background-color: black;
  padding: 10px;
  margin-top: 20px;

  ${({ $variant }) => $variant && `variant: ${$variant};`}
  
`;
