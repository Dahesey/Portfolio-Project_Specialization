import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Divider,
  } from "@mui/material";
  import styled from "styled-components";
  import { Doughnut } from "react-chartjs-2";
  import { useState, useEffect } from "react";
  
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
  
  const activeEvent = "Mid Week Service on Thurday, October 17 2024"; // Example of an active event
  
  const FrontDeskHomepage = () => {
    const members = 136;
    const children = 50;
    const teens = 30;
  
    const checkedInMembers = 100; // Example checked-in count
    // const checkedInChildren = 30; // Example checked-in count for children
    // const checkedInTeens = 20; // Example checked-in count for teens
  
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentFormattedDate, setCurrentFormattedDate] = useState("");
  
    const membersData = {
      datasets: [
        {
          data: [members, 100, 36],
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
          data: [teens, 20, 10],
          backgroundColor: ["#1f618d", "#2ecc71", "#FFCE56"],
          borderWidth: 0,
          cutout: "70%",
          rotation: -90,
          circumference: 180,
        },
      ],
    };
  
    const checkedInData = {
      labels: ['Total Members', 'Checked-In'],
      datasets: [
        {
          data: [members, checkedInMembers],
          backgroundColor: ['#1f618d', '#FF6347'], // Example colors for the chart
          borderWidth: 0,
          cutout: '70%',
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
          <Typography variant="h6">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </Typography>
        </Box>
  
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Current Event
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>
            {activeEvent}
          </Typography>
        </Box>
  
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Title align="center">Members</Title>
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
                  variant="h5"
                  sx={{
                    position: "absolute",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {members}
                </Typography>
                <Doughnut data={membersData} options={{}} />
              </Box>
              <Divider />
              <Grid container justifyContent="space-between" sx={{ p: 2 }}>
                <Grid item>
                  <Typography color="#1f618d">Today's Attendance: {members}</Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Title align="center">Children</Title>
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
                  variant="h5"
                  sx={{
                    position: "absolute",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {children}
                </Typography>
                <Doughnut data={childrenData} options={{}} />
              </Box>
              <Divider />
              <Grid container justifyContent="space-between" sx={{ p: 2 }}>
                <Grid item>
                  <Typography color="#1f618d">Today's Attendance: {children}</Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Title align="center">Teens</Title>
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
                  variant="h5"
                  sx={{
                    position: "absolute",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {teens}
                </Typography>
                <Doughnut data={teensData} options={{}} />
              </Box>
              <Divider />
              <Grid container justifyContent="space-between" sx={{ p: 2 }}>
                <Grid item>
                  <Typography color="#1f618d">Today's Attendance: {teens}</Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
  
          {/* New Chart for Checked In Members */}
          <Grid item xs={12}>
            <StyledPaper>
              <Title align="center">Checked-In Members</Title>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  width: "100%",
                  height: "300px",
                }}
              >
                <Doughnut data={checkedInData} options={{}} />
              </Box>
              <Divider />
              <Grid container justifyContent="space-between" sx={{ p: 2 }}>
                <Grid item>
                  <Typography color="#1f618d">
                    Total Checked-In: {checkedInMembers}
                  </Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    );
  };
  
  export default FrontDeskHomepage;
  