import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgpic from "../../assets/community8.jpg";
import { LightBlueButton } from "../../components/buttonStyles";
import { registerUser } from "../../redux/userRelated/userHandle";
// import styled from "styled-components";

const defaultTheme = createTheme();

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );
  

  console.log("FROM START >>>>>>",status,  currentUser, response, error, currentRole )

  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

  const [loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [genderError, setGenderError] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [adminFirstNameError, setAdminFirstNameError] = useState(false);
  const [adminLastNameError, setAdminLastNameError] = useState(false);
  const [churchNameError, setChurchNameError] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const role = "Admin";

  const handleSubmit = (event) => {
    event.preventDefault();

    const adminFirstName = event.target.adminFirstName.value;
    const adminLastName = event.target.adminLastName.value;
    const churchName = event.target.churchName.value;
    const email = event.target.email.value;
    const contact = event.target.contact.value;
    const gender = event.target.gender.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (
      !adminFirstName ||
      !adminLastName ||
      !churchName ||
      !email ||
      !contact ||
      !password ||
      // !gender ||
      !confirmPassword
    ) {
      if (!adminFirstName) setAdminFirstNameError(true);
      if (!adminLastName) setAdminLastNameError(true);
      if (!churchName) setChurchNameError(true);
      if (!email) setEmailError(true);
      if (!contact) setContactError(true);
      // if (!gender) setGenderError(true);
      if (!password) setPasswordError(true);
      if (!confirmPassword) setConfirmPasswordError(true);

      return;
    }

    const fields = {
      name: `${adminFirstName} ${adminLastName}`, // Combine first and last name into a single 'name' field
      email,
      contact,
      gender,
      password,
      confirmPassword,
      churchName,
    };

    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "confirmPassword") setConfirmPasswordError(false);
    if (name === "contact") setContactError(false);
    if (name === "gender") setGenderError(false);
    if (name === "adminFirstName") setAdminFirstNameError(false);
    if (name === "adminLastName") setAdminLastNameError(false);
    if (name === "churchName") setChurchNameError(false);
  };




  useEffect(() => {

    console.log("FROM USE EFFECT >>>>>>", response )
    if (
      status === "success" ||
      (currentUser !== null && currentRole === "Admin")
    ) {
      setShowSuccessPopup(true); // Show the success popup
      setLoader(false);
      navigate("/Adminlogin");
      // navigate("/AdminDashboard");
    } else if (status === "failed") {
      setLoader(false);
      setShowErrorPopup(true);
  
      if (error && error.response && error.response.status === 400) {
        const errorMsg = error.response.data.message || "Email Already Exist"; // Backend should return a message
        setErrorMessage(errorMsg); // Set the error message from backend
      } else {
        setErrorMessage(response);
      }
    }
  }, [status, currentUser, currentRole, navigate, error, response]);



  


  const handleCloseSuccessPopup = (event, reason) => {
    if (reason === "clickaway") return;
    setShowSuccessPopup(false); // Close the popup
  };

  const handleCloseErrorPopup = (event, reason) => {
    if (reason === "clickaway") return;
    setShowErrorPopup(false); // Close the error popup
  };

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
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            background: "rgba(255, 255, 255, 0.8)",
            padding: "2rem",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#2f284b" }}>
              Admin Register
            </Typography>
            <Typography variant="h7" align="center">
              Create your own church management system by registering as an
              admin.
              <br />
              You will be able to add front desk and finance personnel and
              manage the system.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="adminFirstName"
                    label="Enter your first name"
                    name="adminFirstName"
                    autoComplete="name"
                    autoFocus
                    error={adminFirstNameError}
                    helperText={adminFirstNameError && "First Name is required"}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="adminLastName"
                    label="Enter your last name"
                    name="adminLastName"
                    autoComplete="name"
                    error={adminLastNameError}
                    helperText={adminLastNameError && "Last Name is required"}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Gender */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="gender"
                    label="Select your gender"
                    name="gender"
                    select
                    error={genderError}
                    helperText={genderError && "Gender selection is required"}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                </Grid>

                {/* Church Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="churchName"
                    label="Create your church name"
                    name="churchName"
                    autoComplete="off"
                    error={churchNameError}
                    helperText={churchNameError && "Church name is required"}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Enter your email"
                    name="email"
                    autoComplete="email"
                    error={emailError}
                    helperText={emailError && "Email is required"}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Contact */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="contact"
                    label="Enter your contact number"
                    name="contact"
                    autoComplete="tel"
                    error={contactError}
                    helperText={contactError && "Contact number is required"}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Password */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Create a password"
                    type={togglePassword ? "text" : "password"}
                    autoComplete="new-password"
                    error={passwordError}
                    helperText={passwordError && "Password is required"}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setTogglePassword(!togglePassword)}
                            edge="end"
                          >
                            {togglePassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm password"
                    type={toggleConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    error={confirmPasswordError}
                    helperText={
                      confirmPasswordError && "Confirm password is required"
                    }
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setToggleConfirmPassword(!toggleConfirmPassword)
                            }
                            edge="end"
                          >
                            {toggleConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Agreement Checkbox */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        required
                      />
                    }
                    label="I agree to all terms and conditions."
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <LightBlueButton
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 2, color: "#fff" }}
                  >
                    {loader ? <CircularProgress size={24} /> : "Register"}
                  </LightBlueButton>
                </Grid>
              </Grid>

              {/* Already registered? */}
              <Grid container justifyContent="center">
                <Grid item>
                  <Link
                    to="/AdminLogin"
                    style={{ color: "#3f51b5", textDecoration: "none" }}
                  >
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* Success Popup Snackbar */}
        <Snackbar
          open={showSuccessPopup}
          autoHideDuration={6000}
          onClose={handleCloseSuccessPopup}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Center the popup at the top
        >
          <Alert
            onClose={handleCloseSuccessPopup}
            severity="success"
            sx={{ width: "100%" }}
          >
            Admin registered successfully!
          </Alert>
        </Snackbar>

        {/* Error Popup Snackbar */}
        <Snackbar
          open={showErrorPopup}
          autoHideDuration={8000}
          onClose={handleCloseErrorPopup}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Center the popup at the top
        >
          <Alert
            onClose={handleCloseErrorPopup}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage} {/* Display the error message */}
          </Alert>
        </Snackbar>
      </Grid>
    </ThemeProvider>
  );
};

export default AdminRegisterPage;
