import React from "react"; // Import React
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import GroupIcon from "@mui/icons-material/Group"; // Icon for Member Attendance
// import ChildCareIcon from "@mui/icons-material/ChildCare"; // Icon for Child Attendance



const MembershipPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        spacing={20} // Control space between cards; adjust as needed
        justifyContent="center"
        sx={{
          marginTop: "5px", // Top margin for the entire grid
        }}
      >
        <Grid item>
          <Paper
            sx={{
              width: "250px", // Increased width
              height: "200px", // Increased height
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#0097A7",
              color: "white",
              borderRadius: "20px",
              textAlign: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#00796B",
              },
            }}
            onClick={() => navigate("/FrontDesk/Membership/AddMember")}
          >
            <AddIcon fontSize="large" />
            <Typography variant="h6">ADD NEW MEMBER</Typography>
          </Paper>
        </Grid>

        <Grid item>
          <Paper
            sx={{
              width: "250px", // Increased width
              height: "200px", // Increased height
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#0097A7",
              color: "white",
              borderRadius: "20px",
              textAlign: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#00796B",
              },
            }}
            onClick={() => navigate("/FrontDesk/Membership/ViewMember")}
          >
            <AddIcon fontSize="large" />
            <Typography variant="h6">VIEW MEMBERS</Typography>
          </Paper>
        </Grid>

     
      </Grid>
    </>
  );
};

export default MembershipPage;
