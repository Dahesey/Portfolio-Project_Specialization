import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ChildrenAttendancePage = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState("");
  const [recordedChildren, setRecordedChildren] = useState([]);

  // Sample child data
  const children = [
    { id: "child1", name: "John Doe", seatNo: 1, temperature: "36.5°C" },
    { id: "child2", name: "Jane Doe", seatNo: 2, temperature: "36.7°C" },
    { id: "child3", name: "Alice Smith", seatNo: 3, temperature: "36.8°C" },
  ];

  const handleChildChange = (e) => {
    setSelectedChild(e.target.value);
  };

  const handleRecordAttendance = () => {
    const selectedChildData = children.find((child) => child.id === selectedChild);

    if (selectedChildData) {
      // Avoid adding duplicate children
      if (!recordedChildren.some((child) => child.id === selectedChildData.id)) {
        setRecordedChildren([...recordedChildren, selectedChildData]);
      }
    }
  };

  const handleEndSession = () => {
    // Logic to end the session
    console.log("Session Ended");
  };

  return (
    <Paper sx={{ padding: "20px", margin: "20px auto", maxWidth: "900px" }}>
      {/* Header */}
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Children Attendance
      </Typography>

      {/* Attendance Session Details */}
      <Typography variant="body1">
        <strong>Attendance Session ID:</strong> CCI-001
      </Typography>
      <Typography variant="body1">
        <strong>Attendance Service Type:</strong> Mid Week Service
      </Typography>
      <Typography variant="body1">
        <strong>Attendance Session Date:</strong> 17 Thursday, October 2024
      </Typography>

      {/* Select Child Section */}
      <Box sx={{ display: "flex", marginTop: "20px", marginBottom: "20px", gap: "10px" }}>
        <TextField
          fullWidth
          select
          label="Select Child (Type in name or ID of child)"
          value={selectedChild}
          onChange={handleChildChange}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          <option value="" disabled>
            Select a child
          </option>
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name}
            </option>
          ))}
        </TextField>

        <Button variant="contained" color="primary" onClick={handleRecordAttendance} sx={{ height: "56px" }}>
          Record Attendance
        </Button>
      </Box>

      {/* Attendance Table */}
      <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Member ID</strong></TableCell>
              <TableCell align="center"><strong>Name</strong></TableCell>
              <TableCell align="center"><strong>Seat No.</strong></TableCell>
              <TableCell align="center"><strong>Temperature</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordedChildren.length > 0 ? (
              recordedChildren.map((child, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{child.id}</TableCell>
                  <TableCell align="center">{child.name}</TableCell>
                  <TableCell align="center">{child.seatNo}</TableCell>
                  <TableCell align="center">{child.temperature}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No attendance recorded yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Buttons: Back, End Session */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="contained" color="error" onClick={handleEndSession}>
          End Session
        </Button>
      </Box>
    </Paper>
  );
};

export default ChildrenAttendancePage;
