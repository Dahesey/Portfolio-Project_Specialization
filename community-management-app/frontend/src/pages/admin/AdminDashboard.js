import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';
import ShowFrontDesk from './frontdeskRelated/ShowFrontDesk';
import FrontDeskDetails from './frontdeskRelated/FrontDeskDetails';
import AddFrontDesk from './frontdeskRelated/AddFrontDesk';
import ShowFinance from './financeRelated/ShowFinance';
import AddFinance from './financeRelated/AddFinance';
import FinanceDetails from './financeRelated/FinanceDetails';
import AttendanceOverviewPage from './attendanceRelated/AttendanceOverviewPage ';
import ServiceAttendance from './attendanceRelated/ServiceAttendance';
import MonthlyAttendance from './attendanceRelated/MonthlyAttendance';
import ShowReports from './reportsRelated/ShowReports';


import AccountMenu from '../../components/AccountMenu';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);

    // Toggle the drawer open/close state
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Admin Dashboard 
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={open ? styles.drawerOpen : styles.drawerClosed}
                >
                    <Toolbar sx={styles.toolbar}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {/* Pass the open state to SideBar */}
                        <SideBar isSidebarExpanded={open} />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.mainContent}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/finance" element={<ShowFinance />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/frontdesk" element={<ShowFrontDesk />} />

                        <Route path="/Admin/manage-personnel" element={<FrontDeskDetails />} />
                        <Route path="/Admin/add-personnel" element={<AddFrontDesk />} />

                        <Route path="/Admin/add-finance-personnel" element={<AddFinance />} /> 
                        <Route path="/Admin/manage-finance-personnel" element={<FinanceDetails />} />


                        <Route path="/Admin/attendance" element={<AttendanceOverviewPage />} />

                        <Route path="/Admin/attendance/Admin/service-attendance" element={<ServiceAttendance />} />
                        <Route path="/Admin/monthly-attendance" element={<MonthlyAttendance />} />

                        <Route path="/Admin/report" element={<ShowReports />} />













                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default AdminDashboard;

const styles = {
    mainContent: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerOpen: {
        display: "flex",
    },
    drawerClosed: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}
