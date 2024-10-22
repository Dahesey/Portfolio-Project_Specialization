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

const defaultTheme = createTheme();


const LoginPage = ({ role }) => {



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentRole } = useSelector((state) => state.user);


  
  const handleLoginRedirect = () => {
    const path = `/${role}Dashboard`; // Replace with your actual path
    navigate(path);
  };

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [frontdeskNameError, setFrontdeskNameError] = useState(false);

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
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;

      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }
      fields = { email, password };
    }

    setLoader(true);

    try {
      const response = await fetch('https://api.mock.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      });

      const data = await response.json();

      if (response.ok) {
        // Dispatch login success action with user data
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        // Optionally store token or user info in local storage
        localStorage.setItem('token', data.token);
      } else {
        // Show error message to the user
        console.error(data.message);
        alert(data.message || "Login failed!"); // Simple alert for demonstration
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert("Login failed due to network error. Please try again."); // Show network error
    } finally {
      setLoader(false);
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "frontdeskName") setFrontdeskNameError(false);
  };

  useEffect(() => {
    if (currentRole === "Admin") {
      navigate("/AdminDashboard");
    } else if (currentRole === "Frontdesk") {
      navigate("/Frontdesk/dashboard");
    }
  }, [currentRole, navigate]);

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
               onClick={handleLoginRedirect} // Navigate on click
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
