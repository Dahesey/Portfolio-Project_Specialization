import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, MenuItem, Snackbar, Alert, Paper } from "@mui/material";
import { fetchEventDetails } from "../../../redux/eventRelated/eventHandle"; // Import necessary actions
import { fetchMembersList, recordAttendance } from "../../../redux/memberRelated/memberHandle"; // Import necessary actions
import { useNavigate } from "react-router-dom";

const MemberAttendancePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [eventDetails, setEventDetails] = useState({});
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Assuming members are stored as an array in state.members
  const members = useSelector((state) => state.members || []); // Use an empty array as default

  const allMembers = result.data

  console.log ("ALL   MEMBERS  >>>>", allMembers)


  


  // console.log ("MEMBERS  >>>>")
  console.log ("MEMBERS  >>>>", members)
  const event = useSelector((state) => state.event || {}); // Use an empty object as default
  console.log ("EVENT   >>>>", event)

  useEffect(() => {
    dispatch(fetchMembersList()); // Fetch members for the dropdown
    
    dispatch(fetchEventDetails()); // Fetch event details to populate event data
  }, [dispatch]);

  useEffect(() => {
    // Check if the event has a countdown of 0
    if (event.countdown === 0) {
      setEventDetails({
        sessionId: event.id,
        serviceType: event.name,
        eventDate: event.date,
      });
      setAttendanceCount(event.attendanceCount);
    }
  }, [event]);

  const handleSelectChange = (event) => {
    setSelectedMemberId(event.target.value);
  };

  const handleRecordAttendance = () => {
    if (selectedMemberId) {
      dispatch(recordAttendance(selectedMemberId, eventDetails.eventDate))
        .then(() => {
          setShowSuccessPopup(true);
          setAttendanceCount((prevCount) => prevCount + 1);
        })
        .catch((error) => {
          setShowErrorPopup(true);
          setErrorMessage(error.message);
        });
    } else {
      setShowErrorPopup(true);
      setErrorMessage("Please select a member.");
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <Paper sx={{ padding: "20px", margin: "20px auto", maxWidth: "600px" }}>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Member Check-In
      </Typography>

      <TextField
        select
        label="Select Member"
        value={selectedMemberId}
        onChange={handleSelectChange}
        fullWidth
        sx={{ marginBottom: "16px" }}
      >
        {Array.isArray(members) && members.length > 0 ? (
          members.map((member) => (
            <MenuItem key={member.id} value={member.id}>
              {member.name} {/* Assuming member has a 'name' field */}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No members available</MenuItem>
        )}
      </TextField>

      <Typography variant="h6">Event Details</Typography>
      <Typography>Attendance Session ID: {eventDetails.sessionId}</Typography>
      <Typography>Service Type: {eventDetails.serviceType}</Typography>
      <Typography>Event Date: {eventDetails.eventDate}</Typography>

      <Button variant="contained" color="primary" onClick={handleRecordAttendance} fullWidth>
        Record Attendance
      </Button>

      <Typography variant="h6" sx={{ marginTop: "16px" }}>
        Current Attendance Count: {attendanceCount}
      </Typography>

      <Button variant="outlined" color="secondary" fullWidth sx={{ marginTop: "16px" }} onClick={() => navigate(-1)}>
        Back
      </Button>

      <Snackbar open={showSuccessPopup} autoHideDuration={3000} onClose={handleCloseSuccessPopup}>
        <Alert onClose={handleCloseSuccessPopup} severity="success">
          Attendance recorded successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={showErrorPopup} autoHideDuration={6000} onClose={handleCloseErrorPopup}>
        <Alert onClose={handleCloseErrorPopup} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default MemberAttendancePage;
