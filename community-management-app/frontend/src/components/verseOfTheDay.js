import React, { useState } from 'react';
import { Paper, Button, Box } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import styled from 'styled-components';

const VerseOfTheDay = () => {
  const [expanded, setExpanded] = useState(false);

  const verseText = "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.";
  const verseReference = "Jeremiah 29:11";

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledPaper elevation={3}>
      <Box mb={2}>
        <StyledTypography>Verse of the Day</StyledTypography>
      </Box>
      <VerseContent>
        {expanded ? (
          <p>{verseText} <br/><strong>{verseReference}</strong></p>
        ) : (
          <p>{verseText.slice(0, 50)}... <br/><strong>{verseReference}</strong></p>
        )}
      </VerseContent>
      <Button
        variant="contained"
        color="primary"
        endIcon={<Visibility />}
        onClick={toggleExpanded}
      >
        {expanded ? 'Show Less' : 'Read More'}
      </Button>
    </StyledPaper>
  );
};

export default VerseOfTheDay;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
  background-color: rgba(0, 121, 107, 0.9); /* Green Color */
  transition: transform 0.5s ease-in-out;

  &:hover {
    transform: scale(1.03); /* Slight zoom on hover */
  }
`;

const StyledTypography = styled.h2`
  color: white; /* Make the title stand out */
  font-size: 24px;
`;

const VerseContent = styled.div`
  margin-bottom: 20px;
  color: white;
  font-size: 18px;
  p {
    margin: 0;
  }
`;
