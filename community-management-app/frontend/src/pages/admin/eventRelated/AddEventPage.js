import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import { fetchLatestEventID } from "../../../redux/eventRelated/eventHandle";
// import Popup from "../../../components/Popup";

const AddEventPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [eventID, setEventID] = useState("");

  useEffect(() => {
    const fetchEventID = async () => {
      try {
        const resultAction = await dispatch(fetchLatestEventID());
        console.log("Result Action >>>", resultAction); // Log what the dispatch call returns
  
        if (resultAction.payload?.eventID) {
          setEventID(resultAction.payload.eventID); // Set the event ID if successful
        } else {
          console.error("Failed to fetch event ID:", resultAction.payload?.error);
        }
      } catch (error) {
        console.error("Error fetching event ID:", error);
      }
    };
  
    fetchEventID();
  }, [dispatch]);
  

  // const eventID = useSelector((state) => state.event.eventID);

  console.log("Event ID >>>>>>>>>>>>>>>>", eventID);

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error, tempDetails } = userState;

  // States for event creation
  // const [eventID, setEventID] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [capacity, setCapacity] = useState("");
  const [tags, setTags] = useState("");
  const [eventStatus, setEventStatus] = useState("upcoming");
  const [countdown, setCountdown] = useState("");

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [loader, setLoader] = useState(false);
  const adminID = currentUser._id;
  console.log("ADMIN USER ID >>>>", adminID);
  const address = "Event";

  // Event ID generator
  // useEffect(() => {
  //   const eventCount = 1; // Assuming this would be fetched dynamically
  //   setEventID(`CCI-${String(eventCount).padStart(3, "0")}`);
  // }, []);

  // Countdown calculation
  useEffect(() => {
    if (eventDate) {
      const currentDate = dayjs();
      const selectedEventDate = dayjs(eventDate);
      const diffInDays = selectedEventDate.diff(currentDate, "day");
      setCountdown(
        diffInDays >= 0 ? `${diffInDays} days left` : "Event has passed"
      );
    }
  }, [eventDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Event = {
      eventID,
      eventName,
      eventDate,
      eventDescription,
      location,
      eventType,
      organizer,
      speaker,
      capacity,
      tags: tags.split(",").map((tag) => tag.trim()), // Convert string to array
      eventStatus,
      countdown,
    };
    // setLoader(true);
    dispatch(addStuff(Event, address));
  };

  useEffect(() => {
    console.log(" START OF USE EFFECT STATUS >>>>>>>>>", status);
    if (status === "added") {
      console.log("STATUS >>>>>>>>>", status);
      setShowSuccessPopup(true);
      // ssssszssnavigate("/Admin/EventDetails");
      dispatch(underControl());
      // setLoader(true);
    } else if (status === "failed") {
      console.log("STATUS IF FAILED >>>>>>>>>", status);
      setErrorMessage(response.message || "Error creating event");
      setShowErrorPopup(true);
      // setLoader(false);
    } else if (status === "error") {
      setErrorMessage("Event Already Exist");
      setShowErrorPopup(true);
      // setLoader(false);
    }
  }, [status, navigate, error, response, dispatch, tempDetails]);

  const handleCloseSuccessPopup = (event, reason) => {
    if (reason === "clickaway") return;
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = (event, reason) => {
    if (reason === "clickaway") return;
    setShowErrorPopup(false);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ maxWidth: "800px", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Add Events
        </Typography>

        <Paper
          elevation={3}
          sx={{
            padding: "24px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Create Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Event ID (Auto-populated) */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Event ID"
                  value={eventID || "Loading..."} // Show eventID or Loading while it's undefined
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              {/* Event Name */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Event Name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Event Date */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Event Date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Event Type */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Event Type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Event Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Grid>

              {/* Location */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  variant="outlined"
                />
              </Grid>

              {/* Organizer */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Organizer"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  variant="outlined"
                />
              </Grid>

              {/* Speaker */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Speaker"
                  value={speaker}
                  onChange={(e) => setSpeaker(e.target.value)}
                  variant="outlined"
                />
              </Grid>

              {/* Capacity */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Capacity"
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  variant="outlined"
                />
              </Grid>

              {/* Tags */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Tags (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  variant="outlined"
                />
              </Grid>

              {/* Status */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Event Status"
                  value={eventStatus}
                  onChange={(e) => setEventStatus(e.target.value)}
                  select
                  variant="outlined"
                >
                  <MenuItem value="upcoming">Upcoming</MenuItem>
                  <MenuItem value="ongoing">Ongoing</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </TextField>
              </Grid>

              {/* Buttons */}
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Create Event
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* Success Popup (Snackbar) */}
        <Snackbar
          open={showSuccessPopup}
          autoHideDuration={2000}
          onClose={handleCloseSuccessPopup}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Change position to top center
        >
          <Alert
            onClose={handleCloseSuccessPopup}
            severity="success"
            sx={{ width: "100%", fontSize: "1.2rem", padding: "16px" }}
          >
            Event Created Successfully!
          </Alert>
        </Snackbar>

        {/* Error Popup (Snackbar) */}
        <Snackbar
          open={showErrorPopup}
          autoHideDuration={2000}
          onClose={handleCloseErrorPopup}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Change position to top center
        >
          <Alert
            onClose={handleCloseErrorPopup}
            severity="error"
            sx={{ width: "100%", fontSize: "1.2rem", padding: "16px" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AddEventPage;
