import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import styled from 'styled-components';
import BackgroundImage from '../assets/community8.jpg'; 
// import LOGO from "../assets/Logo2.png";
import {  useSelector } from 'react-redux';
// importing verseOfTheDay component
// import VerseOfTheDay from '../components/verseOfTheDay';



const ChooseUser = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentRole } = useSelector(state => state.user);

  const handleRoleSelect = (role) => {
    navigate(`/${role}login`);
  };

  
  useEffect(() => {
    if (currentRole === 'Admin') {
      navigate('/AdminDashboard');
    }
  }, [currentRole, navigate]);


  return (
    <StyledBackground>
      <StyledContainer>
        <Container>
        
        {/* <Logo src={LOGO} alt="Logo" /> */}
          <Grid container spacing={12} justifyContent="center"> {/* Increased spacing here */}
            <Grid item xs={12} sm={6} md={4}>
              <div onClick={() => handleRoleSelect('Admin')}>
                <StyledPaper elevation={3}>
                  <Box mb={2}>
                    <AccountCircle fontSize="large" />
                  </Box>
                  <StyledTypography>
                    Admin
                  </StyledTypography>
                  Login as administrator to access the dashboard and manage the system
                </StyledPaper>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div onClick={() => handleRoleSelect('Frontdesk')}>
                <StyledPaper elevation={3}>
                  <Box mb={2}>
                    <AccountCircle fontSize="large" />
                  </Box>
                  <StyledTypography>
                    Front Desk
                  </StyledTypography>
                  Login as front desk to check in members and manage attendance
                </StyledPaper>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div onClick={() => handleRoleSelect('Finance')}>
                <StyledPaper elevation={3}>
                  <Box mb={2}>
                    <AccountCircle fontSize="large" />
                  </Box>
                  <StyledTypography>
                    Finance
                  </StyledTypography>
                  Login as finance personnel to manage all financial aspects of the system
                </StyledPaper>
              </div>
            </Grid>
          </Grid>
        </Container>
      </StyledContainer>
    </StyledBackground>
  );
};

export default ChooseUser;

const StyledBackground = styled.div`
  background: url(${BackgroundImage}) no-repeat center center fixed;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 40px; /* Increased padding for more space */
  text-align: center;
  background-color: rgba(26, 82, 118, 0.9);      //Blue
  /* background-color: rgba(0, 121, 107, 0.9); Green Color */
  cursor: pointer;
  width: 100%;
  max-width: 500px; /* Increased max-width for a larger card */
  transition: transform 0.8s ease-in; /* Change to ease-in for smoother transition */

  &:hover {
    background-color: rgba(26, 82, 118, 0.9); 
    /* background-color: rgba(0, 121, 107, 0.9);   Green */
    color: black; /* Changed color for better contrast on hover */
    transform: scale(1.05); /* Zoom in effect */
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
  color: black; /* Changed to black for better contrast on the transparent background */
`;


// const Logo = styled.img`
//   position: absolute; 
//   top: 20px; 
//   left: 20px; 
//   width: 100px; 
//   height: auto; 
// `;
