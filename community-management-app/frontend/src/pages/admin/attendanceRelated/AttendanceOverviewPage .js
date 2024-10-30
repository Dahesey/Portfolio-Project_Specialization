import { Container, Divider, Grid, Button, Typography, Card, CardContent, Box } from "@mui/material";
// import { Link } from "react-router-dom"; // Assuming you'll be linking to other pages
import { useNavigate } from 'react-router-dom';

const AttendanceOverviewPage = () => {

  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // minHeight: '100vh', // Full viewport height for vertical centering
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Attendance Overview
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {/* Card for Monthly Attendance Overview */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ padding: '20px', borderRadius: '15px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" align="center">
                Monthly Attendance Overview
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                //   component={Link}
                  onClick={() => navigate('/Admin/monthly-attendance')}
                >
                  VIEW MONTHLY ATTENDANCE
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Service Attendance Overview */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ padding: '20px', borderRadius: '15px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" align="center">
                Event Attendance Overview
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="secondary"
                //   component={Link}
                  onClick={() => navigate('/Admin/attendance/Admin/service-attendance')}
                >
                  VIEW EVENT ATTENDANCE
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AttendanceOverviewPage;
