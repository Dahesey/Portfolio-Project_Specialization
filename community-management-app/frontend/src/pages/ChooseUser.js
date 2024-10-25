import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Box,
  Container,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import styled from 'styled-components';
import BackgroundImage from '../assets/community8.jpg'; 
//import LOGO from "../assets/logo.svg";
import {  useSelector } from 'react-redux';



const ChooseUser = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const password = "baby";

  const { currentRole } = useSelector(state => state.user);;

  const navigateHandler = (user) => {
    if (user === "Admin") {
      navigate('/Adminlogin');
    } else if (user === "Frontdesk") {
      navigate('/Frontdesklogin');
    } else if (user === "Finance") {
      navigate('/Financelogin');
    }
  };

  // useEffect(() => {
  //   if (currentRole === 'Admin') {
  //     navigate('/AdminDashboard');
  //   }
  // }, [currentRole, navigate]);

  useEffect(() => {
    if (currentRole === 'Admin') {
      navigate('/AdminDashboard');
    }
  }, [currentRole, navigate]);



  return (
    <StyledBackground>
      <StyledContainer>
        <Container>
        <Logo src={LOGO} alt="Logo" />
          <Grid container spacing={12} justifyContent="center"> {/* Increased spacing here */}
            <Grid item xs={12} sm={6} md={4}>
              <div onClick={() => handleRoleSelect('Admin')}>
                <StyledPaper elevation={3}>
                  <Box mb={2}>
                    <AccountCircle fontSize="large" />
                  </Box>
                  <StyledTypography>Admin</StyledTypography>
                  Login as administrator to access the dashboard and manage the
                  system
                </StyledPaper>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div onClick={() => handleRoleSelect('Frontdesk')}>
                <StyledPaper elevation={3}>
                  <Box mb={2}>
                    <AccountCircle fontSize="large" />
                  </Box>
                  <StyledTypography>Front Desk</StyledTypography>Login as
                  front desk to check in members and manage attendance
                </StyledPaper>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div onClick={() => handleRoleSelect('Finance')}>
                <StyledPaper elevation={3}>
                  <Box mb={2}>
                    <AccountCircle fontSize="large" />
                  </Box>
                  <StyledTypography>Finance</StyledTypography>
                  Login as finance personnel to manage all financial aspects of
                  the system
                </StyledPaper>
              </div>
            </Grid>
          </Grid>
        </Container>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
          Please Wait
        </Backdrop>
        <Dialog
          message={message}
          setShowDialog={setShowDialog}
          showDialog={showDialog}
        />
      </StyledContainer>
    </StyledBackground>
  );
};

export default ChooseUser;

// Styled components
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
  padding: 40px;
  text-align: center;
  background-color: rgba(26, 82, 118, 0.9);
  cursor: pointer;
  width: 100%;
  max-width: 500px;
  transition: transform 0.8s ease-in;

  &:hover {
    background-color: rgba(26, 82, 118, 0.9);
    color: black;
    transform: scale(1.05);
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
  color: black;
`;

// const Logo = styled.img`
//   position: absolute;
//   top: 20px;
//   left: 20px;
//   width: 100px;
//   height: auto;
// `;
