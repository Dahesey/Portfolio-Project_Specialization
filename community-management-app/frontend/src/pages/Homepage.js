import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import styled from 'styled-components';
//import LOGO from "../assets/logo.svg";
import community from "../assets/community8.jpg";  // Your background image
import { LoginButton } from '../components/buttonStyles';
// import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    return (
        <StyledContainer>
            <Overlay>
                {/* <Logo src={LOGO} alt="Logo" /> */}
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6}>
                        {/* <img src={community} alt="image" style={{ width: '100%', borderRadius: '8px' }} /> */}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StyledPaper>
                            <StyledTitle>
                                Welcome to CoDi
                                <br />
                                Church Management 
                                <br />
                                System
                            </StyledTitle>
                            <StyledText>
                                Effortlessly manage attendance and financial transactions for your community or organization. 
                                Our app centralizes data, providing valuable insights to streamline decision-making and optimize resource allocation. 
                                Track attendance, oversee donations, and make informed decisions with powerful, real-time insights.
                            </StyledText>
                            <StyledBox>
                                <StyledLink to="/choose">
                                    <LoginButton variant="contained" fullWidth>
                                        LOGIN 
                                    </LoginButton>
                                </StyledLink>
                            </StyledBox>
                        </StyledPaper>
                    </Grid>
                </Grid>
            </Overlay>
        </StyledContainer>
    );
};

export default Homepage;

// const Logo = styled.img`
//   position: absolute; 
//   top: 20px; 
//   left: 20px; 
//   width: 100px; 
//   height: auto; 
// `;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${community}); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.5);  */  // To make the bg dull
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; /* Added padding for content */
`;



const StyledPaper = styled.div`
  padding: 24px;
  /* background: "rgba(200, 200, 200, 0.8)"; */
  /* background: rgba(200, 200, 200, 0.8); */
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px; /* Rounded corners */
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  */
  margin-top: 20px; /* Space between the header and the paper */
  max-height: 80vh; /* Optional: Limit the height to prevent overflow */
  overflow: auto; /* Optional: Add scroll if content exceeds max-height */
`;






const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

// const StyledTitle = styled.h1`
//   font-size: 3.5rem;
//   color: #252525;
//   font-weight: bold;
//   padding-top: 10rem;
//   letter-spacing: normal;
//   line-height: normal;
// `;



const StyledTitle = styled.h1`
  font-size: 4rem;
  color: #1a5276;
  font-weight: bold;
  padding-top: 5rem;
  padding-bottom: 2rem;
  letter-spacing: 0.05em; /* Slightly increased letter spacing */
  line-height: 1.2; /* Adjusted line height for better readability */
  font-family: 'Montserrat', sans-serif; /* Changed to Montserrat for a modern look */
  text-align: center; /* Centered text */
  /* Removed hover transition */
`;


const StyledText = styled.p`
  font-size: 1.2rem;
  margin-top: 30px;
  margin-bottom: 10px;
  letter-spacing: 0.02em; /* Slightly increased letter spacing for a stylish look */
  line-height: 1.6; /* Adjusted line height for better readability */
  color: #555; /* Softer text color for a modern feel */
  font-family: 'Roboto', sans-serif; /* Added modern font */
  font-weight: 300; /* Set font weight to medium */
  text-transform: capitalize; /* Optional: Capitalizes the first letter of each word */
  text-shadow: 0.5px 0.5px 0 rgba(0, 0, 0, 0.1); /* Optional: Adds a subtle text shadow for depth */
  color: black;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
