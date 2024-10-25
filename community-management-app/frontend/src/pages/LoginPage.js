import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgpic from "../assets/community8.jpg";
import { LightBlueButton } from "../components/buttonStyles";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser } from '../redux/userRelated/userHandle';

const defaultTheme = createTheme();


const LoginPage = ({ role }) => {



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

  
  const handleLoginRedirect = () => {
    const path = "/FrontDeskDashboard"; // Replace with your actual path
    navigate(path);
  };

  const [toggle, setToggle] = useState(false)
  // const [guestLoader, setGuestLoader] = useState(false)
  const [loader, setLoader] = useState(false)
  // const [showPopup, setShowPopup] = useState(false);
  // const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [frontdeskNameError, setFrontdeskNameError] = useState(false);
  const [financeUserNameError, setfinanceUserNameError] = useState(false);

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    let fields;

    if (role === "Frontdesk") {
      const frontdeskName = event.target.frontdeskName.value;
      const password = event.target.password.value;

      if (!frontdeskName || !password) {
        if (!frontdeskName) setFrontdeskNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      fields = { frontdeskName, password };
      dispatch(loginUser(fields, role))
    } else if ( role === "Admin") {
      const email = event.target.email.value;
      const password = event.target.password.value;

      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }
      fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role))
    } else if ( role === "Finance") {
      const financeUserName = event.target.financeUserName.value;
      const password = event.target.password.value;

      if (!financeUserName || !password) {
        if (!financeUserName) setfinanceUserNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      fields = { financeUserName, password };
      dispatch(loginUser(fields, role))
    }
  };



  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "frontdeskName") setFrontdeskNameError(false);
    if (name === "financeUserName") setfinanceUserNameError(false);
  };

  


  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
        if (currentRole === 'Admin') {
            navigate('/AdminDashboard');
        }
        else if (currentRole === 'FrontDesk') {
            navigate('/FrontDeskDashboard');
        } else if (currentRole === 'Finance') {
            navigate('/FinanceDashboard');
        }
    }
    else if (status === 'failed') {
        // setMessage(response)
        // setShowPopup(true)
        setLoader(false)
    }
    else if (status === 'error') {
        // setMessage("Network Error")
        // setShowPopup(true)
        setLoader(false)
        // setGuestLoader(false)
    }
  }, [status, currentRole, navigate, error, response, currentUser]);



  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundImage: `url(${bgpic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            height: "auto",
            padding: "2rem",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
              {role} Login
            </Typography>
            <Typography variant="subtitle1">
              Welcome back! Please enter your details
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2, width: "100%" }}
            >

              {role === "Frontdesk" ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="frontdeskName"
                  label="Enter your name"
                  name="frontdeskName"
                  autoComplete="name"
                  autoFocus
                  error={frontdeskNameError}
                  helperText={frontdeskNameError && "Name is required"}
                  onChange={handleInputChange}
                /> ) :

                role === "Finance" ? (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="financeUserName"
                    label="Enter your username"
                    name="financeUserName"
                    autoComplete="name"
                    autoFocus
                    error={financeUserNameError}
                    helperText={financeUserNameError && "UserName is required"}
                    onChange={handleInputChange}
                  /> 


              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Enter your email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={emailError}
                  helperText={emailError && "Email is required"}
                  onChange={handleInputChange}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError && "Password is required"}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <StyledLink href="#">Forgot password?</StyledLink>
              </Grid>
              <LightBlueButton
                //onClick={guestModeHandler}
                //onClick={handleLoginRedirect} // Navigate on click
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </LightBlueButton>
              {role === "Admin" && (
                <Grid container>
                  <Grid>Don't have an account?</Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <StyledLink to="/Adminregister">Sign up</StyledLink>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #1a5276;
`;
