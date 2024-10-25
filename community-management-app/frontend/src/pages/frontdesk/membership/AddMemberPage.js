import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, MenuItem, Paper, Snackbar, Alert } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addMember } from "../../../redux/memberRelated/memberHandle";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddMemberPage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

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
    department: "",
    occupation: "",
    contributionToWelfare: "",
    memberSince: null,
    numberOfChildren: "",
    tithePayer: "",
    branch: "",
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
    setErrors({ ...errors, [name]: "" }); // Clear error when user starts typing
  };

  const handleDateChange = (name, value) => {
    setMemberData({
      ...memberData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear error when date is picked
  };

  // Validation function
  const validateFields = () => {
    const newErrors = {};
    const requiredFields = ["firstname", "lastname", "mobile", "email"];

    if (memberType === "New Member" || memberType === "Existing Member") {
      requiredFields.push("title", "dob");
    }

    // if (memberType === "Existing Member") {
    //   requiredFields.push("memberId");
    // }

    if (memberType === "Guest Member") {
      requiredFields.push("reasonForVisit");
    }

    requiredFields.forEach((field) => {
      if (!memberData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);

    // Return false if there are any errors
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!validateFields()) {
      setShowErrorPopup(true);
      setErrorMessage("Please fill in all required fields.");
      return; // Prevent form submission
    }

    const fullName = `${memberData.firstname} ${memberData.lastname}`;
    const finalMemberData = {
      ...memberData,
      name: fullName,
    };
    dispatch(addMember(finalMemberData));
  };

  useEffect(() => {
    if (status === "success") {
      setShowSuccessPopup(true);
    } else if (status === "500") {
      setShowErrorPopup(true);
      if (error && error.response && error.response.status === 400) {
        const errorMsg = error.response.data.message || "Member Already Exists";
        setErrorMessage(errorMsg);
      } else {
        setErrorMessage(response);
      }
    }
  }, [status, error, response]);

  const handleCloseSuccessPopup = (event, reason) => {
    if (reason === "clickaway") return;
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = (event, reason) => {
    if (reason === "clickaway") return;
    setShowErrorPopup(false);
  };

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
            sx={{
              marginBottom: "16px",
              '& .MuiOutlinedInput-root': errors.firstname && { borderColor: 'red' },
            }}
            error={Boolean(errors.firstname)}
            helperText={errors.firstname}
            FormHelperTextProps={{
              sx: { textAlign: 'center', color: 'red' },
            }}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastname"
            value={memberData.lastname}
            onChange={handleInputChange}
            sx={{
              marginBottom: "16px",
              '& .MuiOutlinedInput-root': errors.lastname && { borderColor: 'red' },
            }}
            error={Boolean(errors.lastname)}
            helperText={errors.lastname}
            FormHelperTextProps={{
              sx: { textAlign: 'center', color: 'red' },
            }}
            required
          />
          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            value={memberData.mobile}
            onChange={handleInputChange}
            sx={{
              marginBottom: "16px",
              '& .MuiOutlinedInput-root': errors.mobile && { borderColor: 'red' },
            }}
            error={Boolean(errors.mobile)}
            helperText={errors.mobile}
            FormHelperTextProps={{
              sx: { textAlign: 'center', color: 'red' },
            }}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={memberData.email}
            onChange={handleInputChange}
            sx={{
              marginBottom: "16px",
              '& .MuiOutlinedInput-root': errors.email && { borderColor: 'red' },
            }}
            error={Boolean(errors.email)}
            helperText={errors.email}
            FormHelperTextProps={{
              sx: { textAlign: 'center', color: 'red' },
            }}
            required
          />

          {/* Fields for New Members and Existing Members */}
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={memberData.title}
            onChange={handleInputChange}
            sx={{
              marginBottom: "16px",
              '& .MuiOutlinedInput-root': errors.title && { borderColor: 'red' },
            }}
            error={Boolean(errors.title)}
            helperText={errors.title}
            FormHelperTextProps={{
              sx: { textAlign: 'center', color: 'red' },
            }}
            required={memberType === "New Member" || memberType === "Existing Member"}
          />
          <DatePicker
            label="Date of Birth"
            value={memberData.dob}
            onChange={(date) => handleDateChange("dob", date)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  marginBottom: "16px",
                  '& .MuiOutlinedInput-root': errors.dob && { borderColor: 'red' },
                }}
                error={Boolean(errors.dob)}
                helperText={errors.dob}
                FormHelperTextProps={{
                  sx: { textAlign: 'center', color: 'red' },
                }}
                required={memberType === "New Member" || memberType === "Existing Member"}
              />
            )}
          />

          {/* Additional field for Existing Member */}
          {/* <TextField
            fullWidth
            label="Member ID"
            name="memberId"
            value={memberData.memberId}
            onChange={handleInputChange}
            sx={{
              marginBottom: "16px",
              '& .MuiOutlinedInput-root': errors.memberId && { borderColor: 'red' },
            }}
            error={Boolean(errors.memberId)}
            helperText={errors.memberId}
            FormHelperTextProps={{
              sx: { textAlign: 'center', color: 'red' },
            }}
            required={memberType === "Existing Member"}
          /> */}

          {/* Additional field for Guest Member */}
          <TextField
            fullWidth
            label="Reason for Visit"
            name="reasonForVisit"
            value={memberData.reasonForVisit}
            onChange={handleInputChange}
            sx={{
              marginBottom: "16px",
              '& .MuiOutlinedInput-root': errors.reasonForVisit && { borderColor: 'red' },
            }}
            error={Boolean(errors.reasonForVisit)}
            helperText={errors.reasonForVisit}
            FormHelperTextProps={{
              sx: { textAlign: 'center', color: 'red' },
            }}
            required={memberType === "Guest Member"}
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>


          {/* Add Back button */}
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ marginTop: "16px" }}
            onClick={() => navigate(-1)} // Navigate back
          >
            Back
          </Button>
        </form>

        {/* Success Popup */}
        <Snackbar open={showSuccessPopup} autoHideDuration={3000} onClose={handleCloseSuccessPopup}>
          <Alert onClose={handleCloseSuccessPopup} severity="success">
            Member added successfully!
          </Alert>
        </Snackbar>

        {/* Error Popup */}
        <Snackbar open={showErrorPopup} autoHideDuration={6000} onClose={handleCloseErrorPopup}>
          <Alert onClose={handleCloseErrorPopup} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </LocalizationProvider>
  );
};

export default AddMemberPage;
