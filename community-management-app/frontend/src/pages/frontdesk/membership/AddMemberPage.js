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
import { addMember } from "../../../redux/memberRelated/memberHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import { useNavigate } from "react-router-dom";

const AddMemberPage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  dispatch(underControl())
  const { status, response, error } = useSelector((state) => state.user);

  const [memberType, setMemberType] = useState("New Member");
  const [memberData, setMemberData] = useState({
    firstname: "",
    lastname: "",
    title: "",
    mobile: "",
    email: "",
    dob: null,
    address: "",
    gender: "",
    department: "", // For Existing Member
    occupation: "",
    contributionToWelfare: "No",
    memberSince: null,
    numberOfChildren: "",
    tithePayer: "No",
    reasonForVisit: "", // For Guest Member
  });

  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData({
      ...memberData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleDateChange = (name, value) => {
    setMemberData({
      ...memberData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = ["firstname", "lastname", "mobile", "email"];

    if (memberType === "New Member" || memberType === "Existing Member") {
      requiredFields.push("title", "dob", "address");
    }

    if (memberType === "Guest Member") {
      requiredFields.push("reasonForVisit");
    }

    requiredFields.forEach((field) => {
      if (!memberData[field]) {
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

    const fullName = `${memberData.firstname} ${memberData.lastname}`;
    const finalMemberData = {
      ...memberData,
      memberType: memberType, 
      name: fullName,
    };
    dispatch(addMember(finalMemberData));
  };

  // useEffect(() => {
  //   if (status === "success") {
  //     setShowSuccessPopup(true);
  //   } else if (status === "500") {
  //     setShowErrorPopup(true);
  //     const errorMsg =
  //       error?.response?.data?.message || response || "Member Already Exists";
  //     setErrorMessage(errorMsg);
  //   }


  console.log("AT START  >>>> ", status)
  
  useEffect(() => {
    console.log("AT RESPONSE WHEN USER IS CREATED   >>>> ", status)

    if (status === "success") {
      console.log("AT SUCCESS  >>>> ", status)
      setShowSuccessPopup(true);
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS" }); // Clears the status in Redux after a successful add
      }, 3000); // Matches autoHideDuration
    } else if (status === "400") { // assuming error status is set as "error"
      setShowErrorPopup(true);
      // setErrorMessage(error?.response?.data?.message || response || "Member Already Exists");
      setErrorMessage("Member Already Exist");
      console.log("RESPONSE WHEN STATUS IS 400 >>>>", response.data)
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS" }); // Clears the error status in Redux after showing popup
      }, 3000);
    }
  }, [status, error, response, dispatch]);

  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ padding: "20px", margin: "20px auto", maxWidth: "900px" }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Add Member
        </Typography>

        <form onSubmit={submitHandler}>
          <TextField
            select
            fullWidth
            label="Member Type"
            name="memberType"
            value={memberType}
            onChange={(e) => setMemberType(e.target.value)}
            sx={{ marginBottom: "16px" }}
            required
          >
            <MenuItem value="New Member">New Member</MenuItem>
            <MenuItem value="Existing Member">Existing Member</MenuItem>
            <MenuItem value="Guest Member">Guest Member</MenuItem>
          </TextField>

          {/* Fields common to all member types */}
          <TextField
            fullWidth
            label="First Name"
            name="firstname"
            value={memberData.firstname}
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
            value={memberData.lastname}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px" }}
            error={Boolean(errors.lastname)}
            helperText={errors.lastname}
            required
          />
          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            value={memberData.mobile}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px" }}
            error={Boolean(errors.mobile)}
            helperText={errors.mobile}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={memberData.email}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px" }}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required
          />



          {/* Fields for New and Existing Members */}
          {(memberType === "New Member" ||
            memberType === "Existing Member") && (
            <>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={memberData.title}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
                error={Boolean(errors.title)}
                helperText={errors.title}
                required
              />

<TextField
                fullWidth
                label="Address"
                name="address"
                value={memberData.address}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
                error={Boolean(errors.address)}
                helperText={errors.address}
                required
              />

<TextField
                fullWidth
                select // dropdown for gender
                label="Gender"
                name="gender"
                value={memberData.gender}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
              >
                {["Male", "Female"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <DatePicker
                label="Date of Birth"
                value={memberData.dob}
                onChange={(date) => handleDateChange("dob", date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ marginBottom: "16px" }}
                    error={Boolean(errors.dob)}
                    helperText={errors.dob}
                    required
                  />
                )}
              />
            </>
          )}

          {/* Additional field for Existing Member */}
          {memberType === "Existing Member" && (
            <>
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={memberData.department}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
              />

              <TextField
                fullWidth
                label="Tithe Payer"
                name="tithePayer"
                value={memberData.tithePayer}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
              />

              <TextField
                fullWidth
                label="Member Since"
                name="memberSince"
                type="date" // date input for consistency with date format
                InputLabelProps={{ shrink: true }} // keeps label position
                value={memberData.memberSince}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
              />

              <TextField
                fullWidth
                select
                label="Contribution to Welfare"
                name="contributionToWelfare"
                // type="number" // if it’s monetary, numeric input is useful
                value={memberData.contributionToWelfare}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
              >
                  {["Yes", "No"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                select // dropdown for relationship status
                label="Relationship Status"
                name="relationshipStatus"
                value={memberData.relationshipStatus}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
              >
                {["Single", "Married", "Divorced", "Widowed"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>

       
            </>
          )}

          {/* Additional field for Guest Member */}
          {memberType === "Guest Member" && (
            <TextField
              fullWidth
              label="Reason for Visit"
              name="reasonForVisit"
              value={memberData.reasonForVisit}
              onChange={handleInputChange}
              sx={{ marginBottom: "16px" }}
              error={Boolean(errors.reasonForVisit)}
              helperText={errors.reasonForVisit}
              required
            />
          )}

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
            Member added successfully!
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

export default AddMemberPage;
