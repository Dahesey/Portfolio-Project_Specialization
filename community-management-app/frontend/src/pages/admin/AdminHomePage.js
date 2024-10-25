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
  // const members = 136;
  const children = 50;
  const teens = 30; // You can replace this with your actual data

  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentFormattedDate, setCurrentFormattedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const resultAction = await dispatch(fetchMembersList());
        const membersData = resultAction.payload?.members;
        console.log("MEMBERS  >>>>>>>", resultAction);

        if (Array.isArray(membersData)) {
          setMembers(membersData.length); // Set members to the total number of fetched members
        } else {
          console.error(
            "Failed to fetch members:",
            resultAction.payload?.error || "Unknown error"
          );
        }
      } catch (error) {
        console.error(
          "Error fetching members:",
          error?.message || "Unknown error"
        );
      }
    };

    fetchMembers();
  }, [dispatch]);

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
        data: [children, 40, 10],
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
        data: [teens, 20, 10], // Example data for teens
        backgroundColor: ["#1f618d", "#2ecc71", "#FFCE56"],
        borderWidth: 0,
        cutout: "70%",
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  const newMembersByMonth = [5, 3, 5, 2, 4, 7, 8, 6, 9, 10, 12, 11];

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
                  // fontFamily: "'Bungee Tint", // Change the font family for a unique style
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
                <Typography color="green">Total Active: {members} </Typography>
              </Grid>
              <Grid item>
                <Typography color="orange">Total Inactive: 0 </Typography>
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
                  // fontFamily: "'Bungee Tint", // Change the font family for a unique style
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
                <Typography color="green">Total Active: 40</Typography>
              </Grid>
              <Grid item>
                <Typography color="orange">Total Inactive: 10</Typography>
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
                  // fontFamily: "'Bungee Tint", // Change the font family for a unique style
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
                <Typography color="green">Total Active: 20</Typography>
              </Grid>
              <Grid item>
                <Typography color="orange">Total Inactive: 10</Typography>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>

        {/* Attendance Overview can be added here if needed */}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" padding={"1rem"}>
          New Members This Month: {newMembersByMonth[selectedMonth]}
        </Typography>
        <InputLabel padding={"5rem"}>Select Month</InputLabel>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, index) => (
              <MenuItem key={index} value={index}>
                {new Date(0, index).toLocaleString("default", {
                  month: "long",
                })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
};

export default AdminHomePage;
