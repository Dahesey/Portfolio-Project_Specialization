import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { addChild } from "../../../redux/childRelated/childHandle"; // Adjust the import as needed
import { addChild } from "../../../redux/childRelated/childHandle";
import { useNavigate } from "react-router-dom";

const AddChildPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector((state) => state.user);

  const [childData, setChildData] = useState({
    firstname: "",
    lastname: "",
    dob: null,
    gender: "",
    allergies: "",
    specialNeeds: "",
    ageCategory: "", // Added to store the age category
    fathersName: "",
    mothersName: "",
    guardianName: "",
  });

  const [age, setAge] = useState(null); // State to store the calculated age
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChildData({
      ...childData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleDateChange = (name, value) => {
    setChildData({
      ...childData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
    calculateAge(value); // Calculate age when DOB changes
  };

  const calculateAge = (dob) => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      setAge(age); // Update the age state

      // Determine age category
      if (age >= 14 && age <= 21) {
        setChildData((prevData) => ({ ...prevData, ageCategory: "Teen" }));
      } else {
        setChildData((prevData) => ({ ...prevData, ageCategory: "Child" }));
      }
    } else {
      setAge(null); // Reset age if no DOB
    }
  };

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = ["firstname", "lastname", "dob", "gender"];

    requiredFields.forEach((field) => {
      if (!childData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!validateFields()) {
      setShowErrorPopup(true);
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const finalChildData = {
      ...childData,
    };
    dispatch(addChild(finalChildData));
  };

  useEffect(() => {
    if (status === "success") {
      setShowSuccessPopup(true);
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS" });
      }, 3000);
    } else if (status === "error") {
      setShowErrorPopup(true);
      setErrorMessage(error?.response?.data?.message || response || "An error occurred");
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS" });
      }, 3000);
    }
  }, [status, error, response, dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ padding: "20px", margin: "20px auto", maxWidth: "900px" }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Add Child
        </Typography>

        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="First Name"
            name="firstname"
            value={childData.firstname}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px" }}
            error={Boolean(errors.firstname)}
            helperText={errors.firstname}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastname"
            value={childData.lastname}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px" }}
            error={Boolean(errors.lastname)}
            helperText={errors.lastname}
            required
          />
          <TextField
            fullWidth
            label="Father's Name"
            name="fathersName"
            value={childData.fathersName}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            fullWidth
            label="Mother's Name"
            name="mothersName"
            value={childData.mothersName}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            fullWidth
            label="Guardian's Name (Optional)"
            name="guardianName"
            value={childData.guardianName}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px" }}
          />
          <DatePicker
            label="Date of Birth"
            value={childData.dob}
            onChange={(date) => handleDateChange("dob", date)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{ marginBottom: "8px" }}
                error={Boolean(errors.dob)}
                helperText={errors.dob}
                required
              />
            )}
          />
          {age !== null && (
            <Typography variant="body1" sx={{ marginBottom: "16px" }}>
              Age: {age} years
            </Typography>
          )}
          {childData.dob && (
            <TextField
              fullWidth
              select
              label="Age Category"
              name="ageCategory"
              value={childData.ageCategory}
              onChange={handleInputChange}
              sx={{ marginBottom: "16px" }}
              required
            >
              <MenuItem value="Child">Child</MenuItem>
              <MenuItem value="Teen">Teen</MenuItem>
            </TextField>
          )}

          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            value={childData.gender}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px" }}
          >
            {["Male", "Female"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Allergies"
            name="allergies"
            value={childData.allergies}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            fullWidth
            label="Special Needs"
            name="specialNeeds"
            value={childData.specialNeeds}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px" }}
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ marginTop: "16px" }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </form>

        {/* Success Popup */}
        <Snackbar
          open={showSuccessPopup}
          autoHideDuration={3000}
          onClose={() => setShowSuccessPopup(false)}
        >
          <Alert onClose={() => setShowSuccessPopup(false)} severity="success">
            Child added successfully!
          </Alert>
        </Snackbar>

        {/* Error Popup */}
        <Snackbar
          open={showErrorPopup}
          autoHideDuration={3000}
          onClose={() => setShowErrorPopup(false)}
        >
          <Alert onClose={() => setShowErrorPopup(false)} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </LocalizationProvider>
  );
};

export default AddChildPage;
