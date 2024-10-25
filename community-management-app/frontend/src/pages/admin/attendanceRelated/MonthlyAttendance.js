import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MonthlyAttendance = () => {
  // Expanded dummy data with more events across different months
  const churchServices = [
    {
      eventId: "001",
      serviceName: "Sunday Morning Worship",
      serviceDate: "2024-01-05",
      totalMembersCheckedIn: 250,
      male: 100,
      female: 120,
      children: 20,
      teens: 10,
    },
    {
      eventId: "002",
      serviceName: "Midweek Bible Study",
      serviceDate: "2024-01-10",
      totalMembersCheckedIn: 150,
      male: 70,
      female: 60,
      children: 10,
      teens: 10,
    },
    {
      eventId: "003",
      serviceName: "Youth Service",
      serviceDate: "2024-01-15",
      totalMembersCheckedIn: 100,
      male: 40,
      female: 40,
      children: 0,
      teens: 20,
    },
    {
      eventId: "004",
      serviceName: "Sunday Morning Worship",
      serviceDate: "2024-02-05",
      totalMembersCheckedIn: 300,
      male: 130,
      female: 140,
      children: 20,
      teens: 10,
    },
    {
      eventId: "005",
      serviceName: "Midweek Bible Study",
      serviceDate: "2024-02-10",
      totalMembersCheckedIn: 160,
      male: 75,
      female: 65,
      children: 10,
      teens: 10,
    },
    {
      eventId: "006",
      serviceName: "Sunday Morning Worship",
      serviceDate: "2024-03-03",
      totalMembersCheckedIn: 270,
      male: 120,
      female: 130,
      children: 10,
      teens: 10,
    },
    {
      eventId: "007",
      serviceName: "Special Easter Service",
      serviceDate: "2024-04-10",
      totalMembersCheckedIn: 400,
      male: 150,
      female: 180,
      children: 40,
      teens: 30,
    },
    {
      eventId: "008",
      serviceName: "Youth Special Service",
      serviceDate: "2024-04-18",
      totalMembersCheckedIn: 200,
      male: 90,
      female: 80,
      children: 10,
      teens: 20,
    },
  ];

  // State to store the selected month
  const [selectedMonth, setSelectedMonth] = useState("");

  // Handle month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Function to filter events by the selected month
  const getEventsByMonth = (month) => {
    return churchServices.filter((service) => {
      const serviceDate = new Date(service.serviceDate);
      return serviceDate.getMonth() === month;
    });
  };

  // Convert month string to a number (0-based index)
  const monthToIndex = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  // Get the filtered events for the selected month
  const filteredEvents = selectedMonth
    ? getEventsByMonth(monthToIndex[selectedMonth])
    : [];

  // Aggregate the attendance data for the filtered events
  const totalAttendance = filteredEvents.reduce(
    (totals, event) => {
      totals.male += event.male;
      totals.female += event.female;
      totals.children += event.children;
      totals.teens += event.teens;
      return totals;
    },
    { male: 0, female: 0, children: 0, teens: 0 }
  );

  // Chart data for the filtered events by month
  const monthlyAttendanceChartData = {
    labels: ["Male", "Female", "Children", "Teens"],
    datasets: [
      {
        label: `Total Attendance for ${selectedMonth}`,
        data: [
          totalAttendance.male,
          totalAttendance.female,
          totalAttendance.children,
          totalAttendance.teens,
        ],
        backgroundColor: ["#3498db", "#e74c3c", "#2ecc71", "#f39c12"],
      },
    ],
  };

  // Chart options
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
  };

  // Navigate hook
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
   <StyledIconButton onClick={() => navigate(-1)}>
  <ArrowBackIcon sx={{ fontSize: 24 }} /> {/* Increased icon size */}
</StyledIconButton>


      <Typography variant="h4" align="center" gutterBottom>
        Monthly Attendance Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Month Selector */}
        <Grid item xs={12}>
          <StyledPaper>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="month-select-label">Select Month</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                onChange={handleMonthChange}
                label="Select Month"
              >
                {Object.keys(monthToIndex).map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </StyledPaper>
        </Grid>

        {/* Bar chart for selected month's attendance */}
        {selectedMonth && filteredEvents.length > 0 ? (
          <Grid item xs={12}>
            <StyledPaper>
              <Title align="center">
                Attendance Breakdown for {selectedMonth}
              </Title>
              <Box sx={{ width: "100%", height: 300 }}>
                <Bar data={monthlyAttendanceChartData} options={barOptions} />
              </Box>
            </StyledPaper>
          </Grid>
        ) : (
          selectedMonth && (
            <Grid item xs={12}>
              <StyledPaper>
                <Typography variant="h6" align="center">
                  No events recorded for {selectedMonth}.
                </Typography>
              </StyledPaper>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

// Styled Components
const StyledPaper = styled(Paper)`
  padding: 16px;
  background: #f5f5f5;
`;

const Title = styled(Typography)`
  margin-bottom: 16px;
  font-weight: bold;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 20px; /* Adjusted for better visibility */
  left: 20px; /* Moved to the visible area */
  background-color: #f0f4f8;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #3498db;
  width: 48px;
  height: 48px; /* Increased height to match width */

  &:hover {
    background-color: rgba(52, 152, 219, 0.1);
  }
`;


export default MonthlyAttendance;
