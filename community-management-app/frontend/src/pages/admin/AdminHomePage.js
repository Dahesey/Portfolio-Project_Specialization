import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMembersList } from "../../redux/memberRelated/memberHandle";
import { fetchChildrenList } from "../../redux/childRelated/childHandle";
import { fetchEventsList } from "../../redux/eventRelated/eventHandle"; 

// Styled components
const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled(Typography)`
  font-weight: bold;
  margin-bottom: 16px;
`;


const AdminHomePage = () => {
  const dispatch = useDispatch();
  const [members, setMembers] = useState(0);
  const [children, setChildren] = useState(0);
  const [teens, setTeens] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentFormattedDate, setCurrentFormattedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [newMembersByMonth, setNewMembersByMonth] = useState(Array(12).fill(0)); // Array to hold member counts for each month
  const [activeEvent, setActiveEvent] = useState("No active event "); // Placeholder for the current event
  const [upcomingEvent, setUpcomingEvent] = useState("No upcoming event "); // Placeholder for the upcoming event

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const resultAction = await dispatch(fetchMembersList());
        const membersData = resultAction.payload?.members;

        if (Array.isArray(membersData)) {
          setMembers(membersData.length);

          // Initialize an array to hold the count of new members by month
          const newMembersCount = Array(12).fill(0);
          
          // Process members data to count new members per month
          membersData.forEach((member) => {
            const dateAdded = new Date(member.dateAdded);
            const month = dateAdded.getMonth();
            newMembersCount[month] += 1; // Increment count for the respective month
          });

          setNewMembersByMonth(newMembersCount); // Update the state with the calculated counts
        } else {
          console.error("Failed to fetch members:", resultAction.payload?.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching members:", error?.message || "Unknown error");
      }
    };

    const fetchChildren = async () => {
      try {
        const resultAction = await dispatch(fetchChildrenList());
        const childrenData = resultAction.payload?.children;

        if (Array.isArray(childrenData)) {
          const currentYear = new Date().getFullYear();
          const childCount = childrenData.filter(child => {
            const birthYear = new Date(child.dob).getFullYear();
            return currentYear - birthYear < 13; // Age less than 13 is considered a child
          }).length;

          const teenCount = childrenData.filter(child => {
            const birthYear = new Date(child.dob).getFullYear();
            return currentYear - birthYear >= 13 && currentYear - birthYear < 20; // Age 13 to 19 is considered a teen
          }).length;

          setChildren(childCount);
          setTeens(teenCount);
        } else {
          console.error("Failed to fetch children:", resultAction.payload?.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching children:", error?.message || "Unknown error");
      }
    };

    const fetchEvents = async () => {
      try {
        const resultAction = await dispatch(fetchEventsList());
        const eventsData = resultAction.payload?.events;

        if (Array.isArray(eventsData)) {
          determineEvents(eventsData);
        } else {
          console.error(
            "Failed to fetch events:",
            resultAction.payload?.error || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const determineEvents = (events) => {
      let closestEvent = null;
      let closestDaysLeft = Infinity;

      events.forEach(event => {
        const daysLeft = event.countdown ? parseInt(event.countdown.split(" ")[0]) : Infinity;

        if (daysLeft === 0) {
          setActiveEvent(event.eventName);
        } else if (daysLeft > 0 && daysLeft < closestDaysLeft) {
          closestDaysLeft = daysLeft;
          closestEvent = event.eventName;
        }
      });

      if (closestEvent) {
        setUpcomingEvent(closestEvent);
      }
    };


    fetchMembers();
    fetchChildren();
    fetchEvents();
  }, [dispatch]);

  // Doughnut chart data setup
  const membersData = {
    datasets: [
      {
        data: [members, members, 0],
        backgroundColor: ["#1f618d", "#2ecc71", "#FFCE56"],
        borderWidth: 0,
        cutout: "70%",
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  const childrenData = {
    datasets: [
      {
        data: [children, children, 0],
        backgroundColor: ["#1f618d", "#2ecc71", "#FFCE56"],
        borderWidth: 0,
        cutout: "70%",
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  const teensData = {
    datasets: [
      {
        data: [teens, teens, 0],
        backgroundColor: ["#1f618d", "#2ecc71", "#FFCE56"],
        borderWidth: 0,
        cutout: "70%",
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentFormattedDate(formatDate(now));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    return `${date
      .toLocaleDateString("en-US", options)
      .replace(day, day + suffix)}`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h6">{currentFormattedDate}</Typography>
        <Typography variant="h6">{currentTime.toLocaleTimeString()}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
  {/* Current Event Box */}
  <Box sx={{ flex: 1, mx: 2, padding: 2, border: '1px solid #ccc', borderRadius: 2, bgcolor: '#f5f5f5' }}>
    <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
      Current Event
    </Typography>
    <Typography
      variant="body1"
      sx={{ fontWeight: 'light', textAlign: 'center', fontSize: '1.25rem' }} 
    >
      {activeEvent || "No active event"}
    </Typography>
  </Box>

  {/* Upcoming Event Box */}
  <Box sx={{ flex: 1, mx: 2, padding: 2, border: '1px solid #ccc', borderRadius: 2, bgcolor: '#f5f5f5' }}>
    <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
      Upcoming Event
    </Typography>
    <Typography
      variant="body1"
      sx={{ fontWeight: 'light', textAlign: 'center', fontSize: '1.25rem' }} 
    >
      {upcomingEvent || "No upcoming event"}
    </Typography>
  </Box>
</Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Title align="center">Members Overview</Title>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: "100%",
                height: "200px",
              }}
            >
               <Typography
                variant="h4" 
                sx={{
                  paddingTop: "2rem",
                  position: "absolute",
                  fontSize: "2rem",
                  fontWeight: "900", 
                  color: "#333",
                  letterSpacing: "0.1rem", 
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", 
                }}
              >
                {members}
              </Typography>
              <Doughnut data={membersData} options={{}} />
            </Box>
            <Divider />
            <Grid container justifyContent="space-between" sx={{ p: 2 }}>
              <Grid item>
                <Typography color="#1f618d">
                  Total Registered: {members}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="green">Total Active: {members}</Typography>
              </Grid>
              <Grid item>
                <Typography color="orange">Total Inactive: 0</Typography>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Title align="center">Children Overview</Title>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: "100%",
                height: "200px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  paddingTop: "2rem",
                  position: "absolute",
                  fontSize: "2rem",
                  fontWeight: "900",
                  color: "#333",
                  letterSpacing: "0.1rem",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                {children}
              </Typography>
              <Doughnut data={childrenData} options={{}} />
            </Box>
            <Divider />
            <Grid container justifyContent="space-between" sx={{ p: 2 }}>
              <Grid item>
                <Typography color="#1f618d">
                  Total Registered: {children}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="green">Total Active: {children}</Typography>
              </Grid>
              <Grid item>
                <Typography color="orange">Total Inactive: 0</Typography>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Title align="center">Teens Overview</Title>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: "100%",
                height: "200px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  paddingTop: "2rem",
                  position: "absolute",
                  fontSize: "2rem",
                  fontWeight: "900",
                  color: "#333",
                  letterSpacing: "0.1rem",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                {teens}
              </Typography>
              <Doughnut data={teensData} options={{}} />
            </Box>
            <Divider />
            <Grid container justifyContent="space-between" sx={{ p: 2 }}>
              <Grid item>
                <Typography color="#1f618d">
                  Total Registered: {teens}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="green">Total Active: {teens}</Typography>
              </Grid>
              <Grid item>
                <Typography color="orange">Total Inactive: 0</Typography>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>

      

      <Grid item xs={12}>
          <StyledPaper>
            <Title align="center">New Members by Month</Title>
            <FormControl fullWidth>
              <InputLabel id="month-select-label">Select Month</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ pt: 3, textAlign: 'center' }}>
              <Typography variant="h5">
                New Members Added: {newMembersByMonth[selectedMonth]}
              </Typography>
            </Box>
          </StyledPaper>
        </Grid>
    </Container>
  );
};

export default AdminHomePage;
