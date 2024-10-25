import {
    Container,
    Grid,
    Paper,
    Typography,
    Box
  } from "@mui/material";
  import { Link } from "react-router-dom"; // Import Link for navigation
  import styled from "styled-components";
//   import { Doughnut } from "react-chartjs-2";
  import "chart.js/auto";
  import { useState, useEffect } from "react";
  
  const StyledPaper = styled(Paper)`
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center; /* Center text inside the card */
    cursor: pointer; /* Indicate the card is clickable */
  `;
  
  const Title = styled(Typography)`
    font-weight: bold;
    margin-bottom: 16px;
  `;
  
  const Card = styled(Box)`
    background-color: #009688; /* Change to desired card color */
    color: white; /* Text color */
    height: 150px; /* Set height for uniformity */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s; /* Add hover effect */
    &:hover {
      transform: scale(1.05); /* Scale effect on hover */
    }
  `;
  
  const FinanceeHomepage = () => {
    // const members = 136;
    // const children = 50;
    // const teens = 30;
  
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentFormattedDate, setCurrentFormattedDate] = useState("");
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const now = new Date();
        setCurrentTime(now);
        setCurrentFormattedDate(formatDate(now));
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    const formatDate = (date) => {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const day = date.getDate();
      const suffix =
        day % 10 === 1 && day !== 11
          ? "st"
          : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
      return `${date
        .toLocaleDateString("en-US", options)
        .replace(day, day + suffix)}`;
    };
  
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h6">{currentFormattedDate}</Typography>
          <Typography variant="h6">{currentTime.toLocaleTimeString()}</Typography>
        </Box>
  
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Link to="/welfare" style={{ textDecoration: "none" }}>
              <StyledPaper>
                <Card>
                  <Title>Welfare</Title>
                </Card>
              </StyledPaper>
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Link to="/offerings" style={{ textDecoration: "none" }}>
              <StyledPaper>
                <Card>
                  <Title>Offerings</Title>
                </Card>
              </StyledPaper>
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Link to="/pledges" style={{ textDecoration: "none" }}>
              <StyledPaper>
                <Card>
                  <Title>Pledges</Title>
                </Card>
              </StyledPaper>
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Link to="/tithes" style={{ textDecoration: "none" }}>
              <StyledPaper>
                <Card>
                  <Title>Tithes</Title>
                </Card>
              </StyledPaper>
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Link to="/project-offerings" style={{ textDecoration: "none" }}>
              <StyledPaper>
                <Card>
                  <Title>Project Offerings</Title>
                </Card>
              </StyledPaper>
            </Link>
          </Grid>
        </Grid>
  
        {/* Additional content can go here */}
      </Container>
    );
  };
  
  export default FinanceeHomepage;
  