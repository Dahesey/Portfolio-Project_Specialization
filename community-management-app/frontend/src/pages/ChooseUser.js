import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Box,
  Container,
  Backdrop,
  Dialog,
  CircularProgress,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import styled from "styled-components";
import BackgroundImage from "../assets/community8.jpg";
import { useSelector } from "react-redux";
// import { loginUser } from "../redux/userRelated/userHandle";

const ChooseUser = ({ visitor }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const password = "baby";

  const { status, currentUser, currentRole } = useSelector(
    (state) => state.user
  );

  const [loader, setLoader] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");

  // const navigateHandler = (user) => {
  //   // Pass only the user type to the login page
  //   navigate(`/${user.toLowerCase()}login`, { state: { userType: user } });
  // };

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "normal") navigate("/Adminlogin");
    } else if (user === "Frontdesk") {
      if (visitor === "normal") {
        navigate("/Frontdesklogin");
      }
    } else if (user === "Finance") {
      if (visitor === "normal") {
        navigate("/Financelogin");
      }
    }
  };

  // useEffect(() => {
  //   if (currentRole === 'Admin') {
  //     navigate('/AdminDashboard');
  //   }
  // }, [currentRole, navigate]);

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "Frontdesk") {
        navigate("/Frontdesk/dashboard");
      } else if (currentRole === "Finance") {
        navigate("/Finance/dashboard");
      }
    } else if (status === "error") {
      setLoader(false);
      setMessage("Network Error");
      setShowDialog(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledBackground>
      <StyledContainer>
        <Container>
          {/* <Logo src={LOGO} alt="Logo" /> */}
          <Grid container spacing={12} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <div onClick={() => navigateHandler("Admin")}>
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
              <div onClick={() => navigateHandler("Frontdesk")}>
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
              <div onClick={() => navigateHandler("Finance")}>
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
